Ext.define('AdmClient.view.settings.SearchServersGrid', {
	extend : 'AdmClient.view.settings.SettingsGridBase',
	alias : 'widget.SearchServersGrid',
	requires : ['Ext.grid.*'],
	
	initComponent : function(){
//		this.columns.add({
//			
//				text : 'ID',
//				dataIndex : 'serverId',
//				visible : false
//			
//		});
//		this.columns.doLayout();
		
		this.callParent(arguments);
	}
});