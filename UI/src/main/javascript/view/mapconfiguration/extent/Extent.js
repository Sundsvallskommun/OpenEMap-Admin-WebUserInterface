Ext.define('AdmClient.view.mapconfiguration.map.Extent', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.extent',

	initComponent : function() {
		this.items = [ {
			title : 'Map extent',
			layout : 'fit',
			border : false,
			itemId : 'mapPanel',
			margin : 12,
			tbar : [ {
				xtype : 'button',
				itemId : 'pan',
				icon : 'icons/arrow-move.png',
				enableToggle : true,
				pressed : true

			}, {
				xtype : 'button',
				itemId : 'markExtent',
				icon : 'icons/figur-R.png',
				enableToggle : true
			} ]
		} ];
		this.callParent(arguments);
	}
});