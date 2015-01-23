Ext.define('AdmClient.store.Servers', {
	extend : 'Ext.data.Store',
	requires : ['AdmClient.model.Server'],
	model : 'AdmClient.model.Server',
	storeId: 'servers',
	autoLoad : true
});