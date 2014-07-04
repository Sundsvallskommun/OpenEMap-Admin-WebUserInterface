Ext.define('AdmClient.view.mapconfiguration.tools.details.MeasureLine', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.measureline',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'MeasureLine'
		} ];
		this.callParent(arguments);
	}
});