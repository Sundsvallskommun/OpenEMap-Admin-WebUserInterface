Ext.define('AdmClient.view.about.About',{
	extend : 'Ext.window.Window',
	alias : 'widget.admAbout',
	
	initComponent : function(){
		Ext.applyIf(this, {
			title : 'About',
			width : 600,
			height : 400,
			html : '<center>About</center>'
		});
		this.callParent(arguments);
	}
});