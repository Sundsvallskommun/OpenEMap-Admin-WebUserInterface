Ext.define('AdmClient.view.mapconfiguration.map.PreviewMap', {
	extend : 'Ext.panel.Panel',
	requires : [ 'AdmClient.view.MapConfiguration','GeoExt.panel.Map' ],
	alias : 'widget.previewMap',

	initComponent : function() {
		this.items = [ {
			border : false,
			itemId : 'previewMapPanel',
			margin : 12
		} ];
		this.callParent(arguments);
	}
});