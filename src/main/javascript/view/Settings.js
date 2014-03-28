Ext.define('AdmClient.view.Settings', {
	extend : 'Ext.panel.Panel',
	requires: ['AdmClient.view.settings.Layers', 'AdmClient.store.Servers', 'AdmClient.store.SearchServer'],
	alias : 'widget.settings',
	title : 'Settings',
	layout: 'fit',
	initComponent : function() {
		this.items = [ {
			xtype : 'tabpanel',
			items : [ {
				margin : 8,
				title : 'Servers',
				border : true,
				items : [ {
					xtype : 'gisServersGrid',
					margin : 8,
					store : new AdmClient.store.Servers(),
					itemId : 'srvGrid',
					title : 'GIS-Servers',
					border : true
				}, {
					xtype : 'settingsGridBase',
					margin : 8,
					store : new AdmClient.store.SearchServer(),
					itemId : 'searchGrid',
					title : 'Geosearch',
					border : true
				} ]
			},{
				xtype : 'layers'
			} ]

		} ];
		this.callParent(arguments);
	}
});