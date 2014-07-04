Ext.define('AdmClient.view.mapconfiguration.tools.ToolsGrid', {
	extend : 'Ext.grid.Panel',
	requires : [ 'Ext.grid.*' ],
	alias : 'widget.toolsGrid',
	
	initComponent : function() {

		Ext.applyIf(this, {

			columns : [ {
				text : 'Verktyg',
				dataIndex : 'tool',
				width : 200
			}, {
				text : 'Info',
				dataIndex : 'info',
				width : 400
			}, {
				xtype : 'checkcolumn',
				dataIndex : 'selected'
			} ]
		});

		this.store = new AdmClient.store.ToolStore();

		this.callParent(arguments);
	}
});