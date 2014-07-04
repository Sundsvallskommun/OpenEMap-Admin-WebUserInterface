Ext.define('AdmClient.model.Server', {
	requires : ['AdmClient.model.SettingBase'],
	extend : 'AdmClient.model.SettingBase',

	proxy : {
		type : 'rest',
		url : appPath + '/settings/servers',
		reader : {
			type : 'json'
		}
	}
});