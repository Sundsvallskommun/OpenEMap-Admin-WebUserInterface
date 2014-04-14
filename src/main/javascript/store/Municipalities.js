Ext.define('AdmClient.store.Municipalities', {
	extend : 'Ext.data.ArrayStore',

	fields : [ {
		name : 'Municipality',
		type : 'string'
	},{
		name : 'selected'
	} ],

	data : [ [ 'Nordanstig', false ],
	         [ 'Sundsvall', false ],
	         [ 'Timrå', false ],
	         [ 'Ånge', false ],
	         [ 'Härnösand', false ],
	         [ 'Kramfors', false ],
	         [ 'Sollefteå', false ],
	         [ 'Örnskoldsvik', false ],
	         [ 'Nordmaling', false ]
	]
});