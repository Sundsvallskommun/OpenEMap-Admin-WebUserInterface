Ext.define('AdmClient.controller.LayerDetails', {
	extend: 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.layer.LayerDetails'],
	refs : [{
		ref : 'saveLayerDetail',
		selector : '#saveLayerDetail'
	},{
		ref: 'layerDetailsGrid',
		selector: '#layerDetailsGrid'
	},{
		ref: 'layerDetails',
		selector: 'layerDetails'
	}],

	init : function() {
		this.control({
			'#saveLayerDetail' : {
				click : this.save
			}
		});
	},

	save : function(btn, e, eOpts){
		var store = this.getLayerDetailsGrid().getStore();
		var layer = this.getLayerDetails().layer;
		store.data.items.forEach(function(c){
			if (c.data.visible || c.data.alias){
				if (!layer.metadata){
					layer.metadata = {};
				}
				layer.metadata.attributes = {};
				layer.metadata.attributes[c.data.name] = {alias : c.data.alias};
			}
		});

		var store = this.getLayerDetails().panelGrid.store;
		AdmClient.app.config.layers = store.treeStore.getLayerConfiguration();
	}
});