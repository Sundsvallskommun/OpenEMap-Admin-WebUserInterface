Ext.define('AdmClient.view.mapconfiguration.tools.details.MeasureArea', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.measurearea',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'MeasureArea'
		} ];
		this.callParent(arguments);
	}
});