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
		layer.metadata = {};
		store.data.items.forEach(function(c){
			if (c.data.visible || c.data.alias){
				if (c.data.alias === "") return;
				if (!layer.metadata.attributes){
					layer.metadata.attributes = {};
				}
				layer.metadata.attributes[c.data.name] = {alias : c.data.alias};
			}
		});

		if (Object.keys(layer.metadata).length === 0){
			delete layer.metadata;
		}

		var store = this.getLayerDetails().panelGrid.store;
		AdmClient.app.config.layers = store.treeStore.getLayerConfiguration();

		this.getLayerDetails().close();
	}
});