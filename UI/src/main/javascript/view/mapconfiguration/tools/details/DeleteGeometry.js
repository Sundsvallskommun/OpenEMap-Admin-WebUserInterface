Ext.define('AdmClient.view.mapconfiguration.tools.details.DeleteGeometry', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.deletegeometry',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'DeleteGeometry'
		} ];
		this.callParent(arguments);
	}
});