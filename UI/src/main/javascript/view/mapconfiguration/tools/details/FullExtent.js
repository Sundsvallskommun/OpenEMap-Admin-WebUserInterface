Ext.define('AdmClient.view.mapconfiguration.tools.details.FullExtent', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.fullextent',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'FullExtent'
		} ];
		this.callParent(arguments);
	}
});