/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

Ext.application({
	requires: ['Ext.container.Container',
	           'AdmClient.controller.Main',
	           'AdmClient.controller.MainToolbar',
	           'AdmClient.controller.MapConfiguration',
	           'AdmClient.controller.Servers',
	           'AdmClient.controller.ToolsGrid',
	           'AdmClient.controller.Layers',
	           'AdmClient.controller.Search',
	           'AdmClient.controller.PreviewMap',
	           'AdmClient.controller.ConfigLayers',
	           'AdmClient.controller.toolDetails.DrawPoint',
	           'AdmClient.controller.toolDetails.DrawPath',
	           'AdmClient.controller.toolDetails.DrawPolygon',
	           'AdmClient.controller.toolDetails.FullExtent',
	           'AdmClient.controller.toolDetails.Print',
	           'AdmClient.controller.toolDetails.Identify',
	           'AdmClient.controller.toolDetails.DetailReport',
	           'AdmClient.controller.toolDetails.MeasureLine',
	           'AdmClient.controller.toolDetails.MeasureArea',
	           'AdmClient.controller.toolDetails.DeleteGeometry',
             'AdmClient.controller.toolDetails.DeleteAllFeatures',
	           'AdmClient.controller.toolDetails.ModifyGeometry',
	           'AdmClient.controller.toolDetails.SelectGeometry',
             'AdmClient.controller.toolDetails.DeleteMeasure',
             'AdmClient.controller.LayerDetails',
	           
	           'AdmClient.store.Servers',
	           'AdmClient.store.ToolStore',
	           'AdmClient.store.Layers',
	           'AdmClient.store.SearchServer',
	           'AdmClient.store.Municipalities',
             'AdmClient.store.LayerDetails',
             'AdmClient.store.GroupedLayerTree',
	           
             'AdmClient.view.main.MainToolbar',
             'AdmClient.view.Main',
             'AdmClient.view.mapconfiguration.tools.ToolsGrid',
             'AdmClient.view.mapconfiguration.tools.details.General',
             'AdmClient.view.mapconfiguration.tools.details.DrawGeometry',
             'AdmClient.view.mapconfiguration.tools.details.DeleteGeometry',
             'AdmClient.view.mapconfiguration.tools.details.DrawObject',
             'AdmClient.view.mapconfiguration.tools.details.FullExtent',
             'AdmClient.view.mapconfiguration.tools.details.Identify',
             'AdmClient.view.mapconfiguration.tools.details.MeasureArea',
             'AdmClient.view.mapconfiguration.tools.details.MeasureLine',
             'AdmClient.view.mapconfiguration.tools.details.Print',
             'AdmClient.view.mapconfiguration.tools.details.ModifyGeometry',
             'AdmClient.view.mapconfiguration.map.PreviewMap',
             'AdmClient.view.mapconfiguration.layer.LayerDetails',
               
             'AdmClient.view.mapconfiguration.search.SearchPanel',
               
               'AdmClient.view.MapConfiguration',
               'AdmClient.view.Settings',
               'AdmClient.view.settings.SettingsGridBase',
               'AdmClient.view.settings.GisServersGrid',
               'AdmClient.view.settings.SearchServersGrid',
               'AdmClient.view.settings.Layers',
               'AdmClient.view.about.About',

               'AdmClient.model.Server',
               'AdmClient.model.SettingBase',
               'AdmClient.model.SearchServer',
               'AdmClient.model.Layer',
               'AdmClient.model.Config'
               ],
    name: 'AdmClient',
    appFolder: 'src/main/javascript',
    controllers: ['Main', 
                  'Layers', 
                  'MainToolbar', 
                  'Servers', 
                  'MapConfiguration', 
                  'ToolsGrid', 
                  'Layers', 
                  'Search', 
                  'PreviewMap', 
                  'ConfigLayers',
                  'LayerDetails',
                  'toolDetails.DrawPoint', 
                  'toolDetails.DrawPath',
                  'toolDetails.DrawPolygon',
                  'toolDetails.FullExtent',
                  'toolDetails.Print',
                  'toolDetails.Identify',
                  'toolDetails.MeasureLine',
                  'toolDetails.MeasureArea',
                  'toolDetails.DeleteGeometry',
                  'toolDetails.ModifyGeometry',
                  'toolDetails.SelectGeometry',
                  'toolDetails.DetailReport',
                  'toolDetails.DeleteAllFeatures',
                  'toolDetails.DeleteMeasure'
                ],
    models : ['SettingBase','Server', 'SearchServer', 'Layer', 'Config'],
    launch: function() {
    	this.config = Ext.create('AdmClient.model.Config');
      this.admClient =  Ext.create('Ext.container.Container', {
        	layout: 'border',
          renderTo: 'contentitem',
        	height : 800,
        	items : [{xtype: 'main'}]
        });
    }
});
