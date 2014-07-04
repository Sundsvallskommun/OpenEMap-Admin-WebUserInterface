Ext.define('AdmClient.view.mapconfiguration.tools.details.ModifyGeometry', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.modifygeometry',
	initComponent : function() {
		this.items = [ {
			xtype : 'button',
			text : 'ModifyGeometry'
		} ];
		this.callParent(arguments);
	}
});