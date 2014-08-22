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

/**
 * Layer panel
 */
Ext.define('AdmClient.view.mapconfiguration.layer.LayerPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.layerPanel',

	requires: [
		'Ext.panel.Panel',
		'Ext.tree.Panel',
		'GeoExt.data.WmsCapabilitiesLayerStore',
		'GeoExt.tree.Column',
		'Ext.tree.plugin.TreeViewDragDrop',
		'AdmClient.view.mapconfiguration.layer.LayerDetails'
	],

	layout : {
        type : 'hbox',
        align : 'stretch'
    },

	initComponent : function() {

		this.items = [
			{
				xtype: 'panel',
				flex: 1,
				padding: 5,
				autoScroll: true,
				items: [
					{
						xtype : 'textfield',
						itemId: 'layerServiceSelector',
						fieldLabel : 'WMS server',
						height : 30,
		            	width: 500,
						enableKeyEvents : true,
						value: typeof defaultWMSServer !== 'undefined' ? defaultWMSServer : ''
					},
					{
			            xtype : 'treepanel',
			            itemId: 'mapConfigWMSLayerTree',
			            minHeight : 300,
			            hideHeaders : true,
			            viewConfig: {
					         plugins: {
					            ptype: 'treeviewdragdrop',
					            enableDrop: false
					        },
					        copy: true
					    },
			            store : Ext.create('AdmClient.store.WmsCapabilitiesLayerTree'),
			            displayField: 'name'
			        }
				]
			},
			{			
				xtype: 'treepanel',
				id: 'mapConfigLayerTree',
				padding: '33 5 5 5',
				flex: 1,
				viewConfig: {
			        plugins: {
		                ptype: 'treeviewdragdrop'
		            }
			    },
			    store: Ext.create('AdmClient.store.GroupedLayerTree', {
		            root: {
		                name: 'Lager',
		                expanded: true
		            }
		        }),
		        displayField: 'name',
		        hideHeaders: false,
		        tbar : [{
		        	text : 'Nytt grupplager',
		        	itemId : 'newGroupLayer',
		        	icon : '/openemap-admin/font-awesome/black/png/16/plus.png'
		    	}],
		        columns: [
		            {
		                xtype: 'treecolumn',
		                flex: 1,
		                dataIndex: 'name',
		                text : 'Lagernamn'
		            },
		            {
		                xtype: 'actioncolumn',
		                width: 70,
		                text: '&Auml;ndra <br /> lagernamn',
		                align: 'center',
		                icon: '/openemap-admin/font-awesome/black/png/16/pencil.png',
		                tooltip: '&Auml;ndra namn',
		                handler: function(grid, rowIndex, colIndex) {
		                	var node = grid.getStore().getAt(rowIndex);
		                	Ext.Msg.prompt('Name', 'Nytt lagernamn:', function(btn, text){
    							if (btn == 'ok'){
        							node.set('name', text.trim());
        							node.store.save();
    							}
							});
						}
		            },
		            {
		                xtype: 'checkcolumn',
		                tooltip: 'Baslager',
		                text: 'Baslager',
		                width: 70,
		               	dataIndex: 'isBaseLayer'
		            },
		            {
		                xtype: 'checkcolumn',
		                width: 70,
		                tooltip: 'Synlig',
		                text: 'Synlig',
		                dataIndex: 'visibility'
		            },
		            {
		                xtype: 'checkcolumn',
		                width: 70,
		                tooltip: 'S&ouml;kbar',
		                text: 'S&ouml;kbar',
		                dataIndex: 'searchable'
		            },
		            {
		                xtype: 'actioncolumn',
		                width: 70,
		                text: 'Ta bort',
		                align: 'center',
		                icon: '/openemap-admin/font-awesome/black/png/16/times.png',
		                tooltip: 'Ta bort',
		                handler: function(grid, rowIndex, colIndex) {
		                	var node = grid.getStore().getAt(rowIndex);
		                	// Remove childs
		                	for (var i = 0; i < node.childNodes.length; i++) {
		                		node.removeChild(node.childNodes[i]);
		                	};
						    node.remove();
						}
		            },{
		            	xtype: 'actioncolumn',
		            	with: 70,
		            	tooltip: 'Alias kolumner, sökbart etc',
		            	align: 'center',
		            	text: 'Inst&auml;llningar',
		            	icon: '/openemap-admin/font-awesome/black/png/16/table.png',
		            	handler : function(grid, rowIdex, colIndex){
		            		var selectedLayer = null;
		            		if (grid.getStore().data.items[rowIdex].childNodes.length === 0){
		            				selectedLayer = grid.getStore().data.items[rowIdex].data;
		            		}
		            		Ext.create('AdmClient.view.mapconfiguration.layer.LayerDetails',{
		            			selectedLayer : selectedLayer, grid: grid
		            		}).show();
		            	}
		            }
	        	]
			}
		];
		this.callParent(arguments);
	}
});
