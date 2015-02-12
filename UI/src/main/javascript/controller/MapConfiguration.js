/*
Copyright Härnösands kommun(C) 2014 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    All rights reserved. This program and the accompanying materials
    are made available under the terms of the GNU Affero General Public License
    which accompanies this distribution, and is available at
    http://www.gnu.org/licenses/agpl-3.0.html
 */


/**
* A controller to handle main MapConfiguration view.
*/

Ext.define('AdmClient.controller.MapConfiguration', {
	extend : 'Ext.app.Controller',
	requires: ['OpenEMap.Client',
	           'AdmClient.view.MapConfiguration',
	           'AdmClient.view.mapconfiguration.layer.LayerPanel'],
	refs : [{
		ref	: 'configurations',
		selector : '#configurations'
	},{
		ref : 'attribution',
		selector : '#attribution'
	},{
		ref : 'configurationTextfield',
		selector : '#configurationTextfield'
	},{
		ref : 'toolsTab',
		selector : '#tools'
	},{
		ref : 'mapPanel',
		selector : '#mapPanel'
	},{
		ref : 'searchGrid',
		selector : '#searchGridConfig'
	},{
		ref : 'layerTab',
		selector : '#layerTab'
	},{
		ref : 'previewMap',
		selector : '#previewMap'
	},{
		ref : 'configurationPreview',
		selector: '#configurationPreviewPanel'
	}, {
		ref : 'autoClearDrawLayer',
		selector : '#autoClearDrawLayer'
	},{
		ref : 'configurationPreviewPanel',
		selector : '#configurationPreviewPanel'
	}
	],
	
	init : function() {
		this.control({
			'#pan' : {
				click : this.panMap
			},
			'#markExtent' : {
				click : this.markExtent
			},
			'#mapPanel' : {
				render : this.mapPanelRender
			},
			'#saveConfiguration' : {
				click : this.saveConfiguration
			},
			'#configurations' : {
				keyup : this.setConfigurationName,
				render : this.renderConfiguration,
				select : this.selectConfiguration
			},
			'#configurationPreviewPanel' : {
				hide : this.configurationPreviewPanelHide,
				expand : this.configurationPreviewPanelShow,
				beforeshow : this.configurationPreviewPanelBeforeShow
			},
			'#attribution' : {
				keyup : this.setAttribution
			},
			'#autoClearDrawLayer' : {
				change : this.autoClearDrawLayerChanged
			}
		});

		this.application.on({
			configuration_change: this.changeConfiguration,
			scope: this
		});
	},

	panMap : function(btn) {
		var markExtentButton = Ext.ComponentQuery.query('#markExtent')[0];
		markExtentButton.toggle();

		var drawRectangleTool = this.mapClient.map.controls.filter(function(t) {
			return t instanceof OpenLayers.Control.DrawFeature;
		})[0];
		
		if (drawRectangleTool && drawRectangleTool.active) {
			drawRectangleTool.deactivate();
		}
	},

	markExtent : function(btn) {
		var panButton = Ext.ComponentQuery.query('#pan')[0];
		panButton.toggle();

		var drawRectangleTool = this.mapClient.map.controls.filter(function(t) {
			return t instanceof OpenLayers.Control.DrawFeature;
		})[0];
		
		if (drawRectangleTool) {
			drawRectangleTool.activate();
		}
	},
	
	mapClient : null,
	mapPanelRender : function(panel) {
		this.mapClient = Ext.create('OpenEMap.Client');
		
		Ext.Ajax.request({
			scope : this,
			url : 'admin.json',
			success : function(response) {
				var config = Ext.decode(response.responseText);
				
				AdmClient.app.config = Ext.applyIf(AdmClient.app.config, config);
				var gui = {
					map : {},
					zoomTools : {}
				};
				if (this.mapClient){
					this.mapClient.destroy();
				}
				this.mapClient.configure(Ext.clone(config), {
					gui : gui
				});

				panel.add(this.mapClient.gui.container);
				panel.doLayout();

				var drawRectangelTool = new OpenLayers.Control.DrawFeature(
						this.mapClient.mapPanel.drawLayer,
						OpenLayers.Handler.RegularPolygon, {
							handlerOptions : {
								sides : 4,
								irregular : true
							}
						});
				this.mapClient.map.addControl(drawRectangelTool);
				
				this.mapClient.drawLayer.events.register('featureadded', null, function(){
					AdmClient.app.config.extent = arguments[0].feature.geometry.getBounds().toArray();
				});
			}
		});
	},
	
	saveConfiguration : function(){
		var self = this;
		if (AdmClient.app.config.name === 'Default'){
			Ext.MessageBox.alert('"Default" is an invalid configuration name.', 'You are trying to write to a write protected template. Choose another template name');
			return;
		}
		
		AdmClient.app.config.isPublic = true;
		var url = appPath + '/adminconfigs/config';
		url += AdmClient.app.config.configId === undefined ? '' : ('/' + AdmClient.app.config.configId);
		var method = AdmClient.app.config.configId === undefined ? 'POST' : 'PUT';
		Ext.Ajax.request({
			url : url,
			method : method,
			jsonData : AdmClient.app.config,
			success : function(evt){
				Ext.MessageBox.alert('Save', 'Configuration saved');
				self.renderConfiguration();
			},
			failure : function(evt){
				Ext.MessageBox.alert('Error', 'Error saving: ' + evt.message);
			}
			
		});
	},
	
	setConfigurationName : function(combo, e, eOpts){
		AdmClient.app.config.name = combo.getValue();
		AdmClient.app.config.configId = undefined;
		this.getConfigId().setValue(AdmClient.app.config.configId || '');
		this.setConfigText();
	},
	
	
	renderConfiguration : function(){
		var self = this;
		Ext.Ajax.request({
			url : appPath + '/configs',
			method : 'GET',
			success : function(evt){
				var configs = JSON.parse(evt.responseText);
				var configurations = Ext.create('Ext.data.Store',{
					fields : ['name', 'configId'],
					data :  configs
				});
				var combo = self.getConfigurations();
				combo.store = configurations;
				combo.queryMode = 'local';
				combo.displayField = 'name';
				combo.valueField = 'configId';
			},
			error : function(evt){
				Ext.MessageBox.alert('Erro', 'Error getting configurations: ' + evt.message);
			}
		});
	},

	selectConfiguration : function(combo, records){
		if(records.length > 0) {
			this.loadConfiguration(	records[0].get('configId'));
		}
	},

	changeConfiguration: function(config) {
		AdmClient.app.config = Ext.apply(AdmClient.app.config,config);
		this.getAttribution().setValue(AdmClient.app.config.attribution);
		this.getToolsTab().setDisabled(false);
		this.getMapPanel().setDisabled(false);
		this.getSearchGrid().setDisabled(false);
		this.getPreviewMap().setDisabled(false);
		if (this.getPreviewMap().isVisible()) {
    		AdmClient.app.getPreviewMapController().previewRender(this.getPreviewMap());
		}
		this.getLayerTab().setDisabled(false);
		this.getConfigurationPreview().setDisabled(false);
		this.getAutoClearDrawLayer().setValue(AdmClient.app.config.autoClearDrawLayer || false); 
		
		if (AdmClient.app.config.extent){
			var bounds = OpenLayers.Bounds.fromArray(AdmClient.app.config.extent);
			this.mapClient.map.zoomToExtent(bounds);
		}
		var configTitle = 'Config - ' + AdmClient.app.config.name + ' (' + AdmClient.app.config.configId.toString() + ')';
		//this.getConfigurationPreviewPanel().setTitle(configTitle);
	},

	loadConfiguration: function(id) {
		Ext.Ajax.request({
			url : appPath + '/configs/config/' + id,
			method : 'GET',
			success : function(evt){
				var config = JSON.parse(evt.responseText);
				this.application.fireEvent('configuration_change', config);
			},
			error : function(evt){
				Ext.MessageBox.alert('Erro', 'Error getting configuration: ' + id + ', ' + evt.message);
			},
			scope: this
		});
	},
	

	
	configurationPreviewPanelShow : function(panel, eOpts){
		 this.setConfigText();
	},
	
	setConfigText : function(){
		var conf = JSON.stringify(AdmClient.app.config, null, ' ');
		var configTextArea = this.getConfigurationTextfield();
		configTextArea.setValue(conf);
	},
	
	setAttribution : function(){
		AdmClient.app.config.attribution = this.getAttribution().getValue();
		this.setConfigText();
	},
	
	autoClearDrawLayerChanged : function(box, newValue, oldValue, eOpts){
		AdmClient.app.config.autoClearDrawLayer = newValue;
	}
});
