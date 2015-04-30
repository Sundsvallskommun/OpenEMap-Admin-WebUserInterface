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
* A controller to handle servers view.
*/

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
