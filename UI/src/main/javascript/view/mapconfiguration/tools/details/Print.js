Ext.define('AdmClient.view.mapconfiguration.tools.details.Print', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.print',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'Print'
		} ];
		this.callParent(arguments);
	}
});