Ext.define('AdmClient.store.SearchServer', {
	extend : 'Ext.data.Store',
	requires : ['AdmClient.model.SearchServer'],
	model : 'AdmClient.model.SearchServer',
	autoLoad : true
});