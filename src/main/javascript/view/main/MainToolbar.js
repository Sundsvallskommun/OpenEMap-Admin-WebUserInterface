Ext.define('AdmClient.view.main.MainToolbar', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.mainToolbar',
	margin : 8,
	items : [ 
	'->',{
		xtype : 'button',
		text : 'About',
		pack : 'right',
		itemId : 'about'
	} ],

	initComponent : function() {
		this.callParent(arguments);
	}
});