Ext.define('AdmClient.controller.Servers', {
	extend : 'Ext.app.Controller',
	init : function() {
		this.control({

			'#addSettingsRow' : {
				click : this.settingsGridAdd
			},
			'#saveSettings' : {
				click : this.save
			}
		});
	},

	serversGridEdit : function(editor, e) {
	},

	searchGridEdit : function(editor, e) {
	},

	settingsGridAdd : function(btn, e) {
		var query = 'button[id=' + btn.id + '] ^ grid'; // something like ('button[id=button-1049] ^ grid')
		var grids = Ext.ComponentQuery.query(query);
		if (grids && grids instanceof Array) {
			var grid = grids[0];
			grid.getStore().add({});
		}
	},
	
	save: function(btn, e){
		var grid = Ext.ComponentQuery.query('button[id=' + btn.getId() +'] ^ grid')[0];
		if (grid){
			var store = grid.getStore();
			store.sync({callback : function(){
				grid.getStore().load();
			}});
			grid.getStore().commitChanges();
			
		}
	}
});