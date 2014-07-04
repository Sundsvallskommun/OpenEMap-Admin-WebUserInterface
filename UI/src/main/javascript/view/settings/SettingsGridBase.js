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

Ext.define('AdmClient.view.settings.SettingsGridBase', {
	extend : 'Ext.grid.Panel',
	requires : [ 'Ext.grid.*' ],
	alias : 'widget.settingsGridBase',

	tbar : [ {
		text : 'Save',
		itemId : 'saveSettings'
	},{
		text : '+',
		itemId : 'addSettingsRow'
	} ],

	initComponent : function() {

		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit : 1
		});

		Ext.applyIf(this, {
			plugins : [ this.cellEditing ],

			columns : [ 
			            
			{
				text : 'Name',
				dataIndex : 'name',
				editor : {
					allowBlank : false
				}
			}, {
				text : 'URL',
				dataIndex : 'url',
				editor : {
					allowBlank : false
				}
			}, {
				text : 'Username',
				dataIndex : 'username',
				editor : {
					allowBlank : false
				}
			}, {
				text : 'Password',
				dataIndex : 'password',
				editor : {
					allowBlank : false
				},
				renderer : function(value) {
					var a = new Array(value.length + 1);
					return a.join('*');
				}
			}, {
				text : 'Note',
				dataIndex : 'note',
				editor : {
					allowBlank : true
				}
			}, {
				xtype : 'actioncolumn',
				menudisabled : true,
				items : [ {
					icon : 'icons/minus-small.png',
					handler: function(grid, rowIndex, colIndex) {
						Ext.MessageBox.confirm('Delete?', 'Sure you want to unregister server? Layers from this server would not be feeded to configurations associated with this server.',
								function(opts){
									if (opts === 'yes'){
										var rec = grid.getStore().getAt(rowIndex);
										grid.getStore().remove(rec);
										grid.getStore().sync();
									}
								},
								this
						);
	                }
				} ]
			} ]
		});

		this.callParent(arguments);
	}
});