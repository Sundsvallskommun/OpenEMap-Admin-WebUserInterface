Ext.define('AdmClient.view.Main', {
	extend : 'Ext.panel.Panel',
	requires: ['AdmClient.view.MapConfiguration'],
	alias : 'widget.main',

	title : 'RIGES Administration',
	layout : 'border',
	border : false,
	header : false,
	bodyPadding : 3,
	renderTo: 'contentitem',
	region : 'center',

	initComponent : function() {
		this.items = [ {
			xtype : 'tabpanel',
			tabPosition : 'left',
//			height : 800,
			region : 'center',
			items : [{
				layout : 'border',
				margin : 8,
				title : 'Map configuration',
				items : [ {
					xtype : 'mapConfiguration',
					region : 'center'
				} ]
			}]
		}, 
		{
			xtype : 'mainToolbar',
			region : 'north',
			style : {
				marginBottom : '20px'
			}
		} 
		],
		this.callParent(arguments);
	}
});