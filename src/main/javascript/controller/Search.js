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
			'#searchGridConfig checkcolumn' : {
				checkchange : this.municipalityChanged
			},
			
			'#configurations' :{
				select : this.selectConfiguration
			},
			
			'#configurations' :{
				select : this.selectConfiguration
			}
		});
	},
	
	selectConfiguration : function(){
		this.markMunicipalities();
	},
	
	markMunicipalities : function(){
		var panel = this.getSearchGrid();
		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			panel.store.data.items[i].save();
		}
		
		AdmClient.app.config.municipalities = [];
		AdmClient.app.config.municipalities.push("Sundsvall");
		AdmClient.app.config.municipalities.push("Kramfors");
		AdmClient.app.config.municipalities.push("Örnskoldsvik");
		
		AdmClient.app.config.municipalities.forEach(function(m){
			for (var i = 0; i < panel.store.data.items.length; i++){
				if (m === panel.store.data.items[i].data.Municipality){
					panel.store.data.items[i].data.selected = true;
					panel.store.data.items[i].save();
				}
			}
		});
		panel.updateLayout();
	},
	
	municipalityChanged : function(chkBox, rowIndex, checked, eOpts){

		var municipalityName = 'sundsvall';
		
		var store = this.getSearchGrid().getStore();
		store.sync();
		
		AdmClient.app.config.options = AdmClient.app.config.options || {};
		AdmClient.app.config.options.municipalities = [];
		
		var municipalities = store.data.items.forEach(function(m){
			if (m.data.selected){
				AdmClient.app.config.options.municipalities.push(m.data.Municipality);
			}
		});
		
	}
});