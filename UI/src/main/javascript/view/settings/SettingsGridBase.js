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