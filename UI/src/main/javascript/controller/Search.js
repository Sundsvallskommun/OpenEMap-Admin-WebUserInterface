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