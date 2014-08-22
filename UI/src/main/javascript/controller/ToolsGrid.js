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


/*
* A controller to handle main tools grid.
*/


Ext.define('AdmClient.controller.ToolsGrid', {
	extend : 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.tools.details.*', 'AdmClient.view.MapConfiguration'],
	refs : [{
		ref	: 'configurations',
		selector : '#configurations'
	},{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	},{
		ref : 'toolGeneral',
		selector : '#toolGeneral'
	}],
	init : function() {
		this.control({

			'#toolsGrid' : {
				render : this.gridRender
			},
			
			'#details' : {
				render : this.detailsRender
			}
		});

		this.application.on({
            configuration_change: this.markTools,
            scope: this
        });
	},

	views : [],
	
	gridRender : function(panel, opts) {
		this.markTools();
	},
	
	markTools : function(){
		var panel = this.getToolsGrid();
		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			panel.store.data.items[i].save();
		}
		
		
		// IMPORTANT
		// this needs to rewrite
		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			var toolName = panel.store.data.items[i];
			for (var j = 0; j < AdmClient.app.config.tools.length; j++){
				var configTool = AdmClient.app.config.tools[j];
				if (configTool.constructor === String){
					if (configTool === toolName.data.toolName){
						toolName.data.selected = true;
						toolName.save();
					}
				} else if (configTool.type === toolName.data.toolName){
					if (configTool.geometry && configTool.geometry === toolName.data.tool){
						toolName.data.selected = true;
					} else if(configTool.geometry && configTool.geometry !== toolName.data.tool){
						continue;
					} 
					else if(configTool.type && toolName.data.toolName){
						toolName.data.selected = true;
					}
					toolName.save();
				}
			}
		}
		panel.updateLayout();
	},
	
	toolsHasEmptyObject : function(){
		for (var i = 0; i < AdmClient.app.config.tools.length; i++){
			if (Object.keys(AdmClient.app.config.tools[i]).length > 0){
				return true;
			}
		}
		return false;
	},
	
	// function show details about a tool
	detailsRender : function() {
		var detailsPanel = arguments[0];
		detailsPanel.removeAll(false);
		var toolName = this.getToolsGrid().getSelectionModel().selected.items[0].data.toolName;
		var tool = 'AdmClient.view.mapconfiguration.tools.details.' + toolName;
		var toolPanel = Ext.create(tool);
		detailsPanel.add(toolPanel);
	}
	
});