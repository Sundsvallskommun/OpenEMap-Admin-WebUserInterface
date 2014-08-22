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
* A controller to handle main search view.
*/


Ext.define('AdmClient.controller.Search', {
	extend : 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.search.SearchPanel', 'AdmClient.view.MapConfiguration'],
	refs : [{
			ref	: 'configurations',
			selector : '#configurations'
		},{
			ref : 'searchGrid',
			selector : '#searchGridConfig'
	}],
	
	init : function() {
		this.control({
			'#searchGridConfig' :{
				render : this.markGrid

			},
			'#searchGridConfig checkcolumn' : {
				checkchange : this.municipalityChanged
			}
		});

		this.application.on({
            configuration_change: this.configurationChanged,
            scope: this
        });
	},

	markGrid : function(){

		var panel = this.getSearchGrid();
		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			panel.store.data.items[i].save();
		}

		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			var municipality = panel.store.data.items[i];
			if (AdmClient.app.config.search){
				for (var j = 0; j < AdmClient.app.config.search.searchAddresses.options.municipalities.length; j++){
					var searchMunicipality = AdmClient.app.config.search.searchAddresses.options.municipalities[j];
					if (searchMunicipality.constructor === String){
						if (searchMunicipality === municipality.data.Municipality){
							municipality.data.selected = true;
							municipality.save();
						}
					}
				}
			}
		}
		panel.updateLayout();

	},
	
	configurationChanged : function(){
		this.markGrid();
	},
	
	municipalityChanged : function(chkBox, rowIndex, checked, eOpts){

		var store = this.getSearchGrid().getStore();
		store.sync();
		
		AdmClient.app.config.search = AdmClient.app.config.search || {};
		AdmClient.app.config.search.searchEstates = {};
		AdmClient.app.config.search.searchEstates.options = {};
		AdmClient.app.config.search.searchEstates.options.municipalities = [];

		AdmClient.app.config.search.searchAddresses = {};
		AdmClient.app.config.search.searchAddresses.options = {};
		AdmClient.app.config.search.searchAddresses.options.municipalities = [];
		
		AdmClient.app.config.search.searchPlacenames = {};
		AdmClient.app.config.search.searchPlacenames.options = {};
		AdmClient.app.config.search.searchPlacenames.options.municipalities = [];

		
		var municipalities = store.data.items.forEach(function(m){
			if (m.data.selected){
				AdmClient.app.config.search.searchEstates.options.municipalities.push(m.data.Municipality);
				AdmClient.app.config.search.searchAddresses.options.municipalities.push(m.data.Municipality);
				AdmClient.app.config.search.searchPlacenames.options.municipalities.push(m.data.municipalityCode);
			}
		});
	}
});