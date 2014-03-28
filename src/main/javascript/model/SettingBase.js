Ext.define('AdmClient.model.SettingBase', {
	extend : 'Ext.data.Model',
	fields : [  {
		name : 'name',
		type : 'string'
	}, {
		name : 'url',
		type : 'string'
	}, {
		name : 'username',
		type : 'string'
	}, {
		name : 'password',
		type : 'string'
	}, {
		name : 'note',
		type : 'string'
	},{
		name : 'ID',
		type : 'integer'
	}]
});