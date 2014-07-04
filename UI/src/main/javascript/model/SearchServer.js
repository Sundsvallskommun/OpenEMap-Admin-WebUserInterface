Ext.define('AdmClient.model.SearchServer', {
	requires : ['AdmClient.model.SettingBase'],
	extend : 'AdmClient.model.SettingBase',

	proxy : {
		type : 'rest',
		url : appPath + '/searchserver/server',
		reader : {
			type : 'json'
		}
	}
});