Ext.define('AdmClient.view.mapconfiguration.tools.details.DrawGeometry', {
	extend : 'Ext.panel.Panel',

	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'draw geometry'
		} ];
		this.callParent(arguments);
	}
});