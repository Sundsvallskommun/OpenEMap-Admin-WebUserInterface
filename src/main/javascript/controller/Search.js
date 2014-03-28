Ext.define('AdmClient.controller.Search', {
	extend : 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.search.SearchPanel', 'AdmClient.view.MapConfiguration'],
	refs : [{
		ref : 'searchLM',
		selector : '#searchLM'
	}],
	init : function() {
		this.control({
			'#searchLM' : {
				change : this.searchSelected
			},
			
			'#configurations' :{
				select : this.selectConfiguration
			}
		});
	},
	
	searchSelected : function(chkBox, newValue, oldValue, eOpts) {
		if (!AdmClient.app.config.gui){
			AdmClient.app.config.gui = {};
		}
		if (newValue)
			AdmClient.app.config.gui.searchFastighet = {};
		else{
			if (AdmClient.app.config.gui.searchFastighet){
				delete AdmClient.app.config.gui.searchFastighet;
			}
		}	
	},
	
	selectConfiguration : function(){
		if (AdmClient.app.config.gui && AdmClient.app.config.gui.searchFastighet){
			this.getSearchLM().setValue(1);
		}
		else{
			this.getSearchLM().setValue(0);
		}
	}
});