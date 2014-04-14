Ext.define('AdmClient.view.mapconfiguration.search.SearchPanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.searchPanel',

	initComponent : function() {
		
		Ext.applyIf(this, {

			columns : [ {
				text : 'Municipality',
				dataIndex : 'Municipality',
				width : 200
			}, {
				xtype : 'checkcolumn',
				dataIndex : 'selected'
			} ]
		});

		this.store = new AdmClient.store.Municipalities();
		this.callParent(arguments);
	}
});