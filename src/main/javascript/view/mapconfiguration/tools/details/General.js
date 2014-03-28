Ext.define('AdmClient.view.mapconfiguration.tools.details.General', {
	extend : 'Ext.tab.Panel',
	requires : [ 'AdmClient.view.mapconfiguration.tools.details.Print' ],
	style : {
		marginTop : '20px'
	},

	toolName : null,

	constructor : function() {
		this.tool = arguments[0] || '';
		this.toolName = arguments[1] || '';
		this.callParent(arguments);
	},

	initComponent : function() {
		this.items = [ {

			title : 'Settings for tool ' + this.toolName,

			items : [ {
				title : 'General settings',
				xtype : 'fieldset',
				items : [ {
					xtype : 'textfield',
					fieldLabel : 'Tooltip'
				}, {
					xtype : 'textfield',
					fieldLabel : 'Min scale',
					maskRe : /[0-9]/
				} ]
			}, {
				xtype : 'fieldset',
				title : 'Details settings',
				itemId : 'details'
			} ]
		} ];
		this.callParent(arguments);
	}
});