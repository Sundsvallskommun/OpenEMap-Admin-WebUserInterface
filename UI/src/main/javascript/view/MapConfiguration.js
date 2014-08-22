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
* The mapconfiguration view.
*/

Ext.define('AdmClient.view.MapConfiguration', {
	extend : 'Ext.panel.Panel',
	requires : [ 'GeoExt.panel.Map' ],
	alias : 'widget.mapConfiguration',
	layout : 'border',
	border : false,

	initComponent : function() {
		this.items = [ {
			border : false,
			bodyPadding : 10,
			region : 'north',
			tbar : [ {
				xtype : 'combo',
				itemId : 'configurations',
				displayField: 'name',
				enableKeyEvents : true
			}, {
				text : 'Spara',
				itemId : 'saveConfiguration'
			} ]
		}, {
			xtype : 'tabpanel',
			region : 'center',
			items : [ {
				title : 'Map extent',
				layout : 'fit',
				border : false,
				itemId : 'mapPanel',
				disabled : true,
				tbar : [ {
					xtype : 'button',
					text : 'Pan',
					itemId : 'pan',
					icon : 'icons/arrow-move.png',
					enableToggle : true,
					pressed : true

				}, {
					xtype : 'button',
					itemId : 'markExtent',
					text : 'Mark extent',
					icon : 'icons/figur-R.png',
					enableToggle : true
				},('->'),{
					xtype : 'textfield',
					disabled : true,
					itemId : 'configId'
				},{
					xtype: 'checkbox',
					fieldLabel : 'Autoclear draw layer',
					itemId : 'autoClearDrawLayer'
						},{
					xtype : 'textfield',
					itemId : 'attribution',
					enableKeyEvents : true,
					fieldLabel : 'Attribution'
				} ],
				margin : 12
			}, {
				title : 'Tools',
				layout : 'border',
				border : false,
				itemId : 'tools',
				disabled : true,
				margin : 12,
				items : [ {
					xtype : 'toolsGrid',
					itemId : 'toolsGrid',
					region : 'north'
				}, {
					xtype : 'panel',
					region : 'center',
					itemId : 'toolGeneral'
				} ]
			}, {
				title : 'Search',
				xtype : 'searchPanel',
				itemId : 'searchGridConfig',
				layout : 'fit',
				disabled : true
			}, {
				title : 'Layers',
				xtype : 'layerPanel',
				itemId: 'layerTab',
				disabled : true
			}, {
				title: 'Preview',
				itemId: 'previewMap',
				layout: 'fit',
				disabled : true,
				hidden: true
			}]
		}, {
			title : 'Config',
			itemId : 'configurationPreviewPanel',
			layout : 'fit',
			disabled : true,
			collapsible : true,
			collapsed : true,
			height : 600,
			region : 'south',
			items : [{xtype : 'textarea', itemId : 'configurationTextfield'}],
			bbar : ['->', {
				xtype : 'button',
				text : 'Export'
			}]
		} ];

		this.callParent(arguments);

	}
});