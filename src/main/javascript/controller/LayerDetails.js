Ext.define('AdmClient.controller.LayerDetails', {
	extend: 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.layer.LayerDetails'],
	refs : [{
		ref : 'saveLayerDetail',
		selector : '#saveLayerDetail'
	},{
		ref: 'layerDetails',
		selector: '#layerDetailsGrid'
	}],

	init : function() {
		this.control({
			'#layerDetailsGrid' : {
				render : this.layerDetailsGridRender
			}
		});
	},

	layerDetailsGridRender : function(){
		console.log(arguments);
	}
});