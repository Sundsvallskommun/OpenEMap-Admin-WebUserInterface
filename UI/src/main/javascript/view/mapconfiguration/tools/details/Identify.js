Ext.define('AdmClient.view.mapconfiguration.tools.details.Identify', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.identify',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'Identify'
		} ];
		this.callParent(arguments);
	}
});