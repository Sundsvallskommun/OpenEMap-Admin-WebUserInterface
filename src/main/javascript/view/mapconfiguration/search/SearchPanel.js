Ext.define('AdmClient.view.mapconfiguration.search.SearchPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.searchPanel',

	initComponent : function() {

		this.items = [{
			xtype: 'checkbox',
			width : 500,
			itemId: 'searchLM',
            fieldLabel: 'S&ouml;k mot lantm&auml;teri (address, ort, fastighet)'
		}];
		this.callParent(arguments);
	}
});