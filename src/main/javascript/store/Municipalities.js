Ext.define('AdmClient.store.Municipalities', {
	extend : 'Ext.data.ArrayStore',

	fields : [ {
		name : 'Municipality',
		type : 'string'
	},{
		name : 'municipalityCode',
		type : 'string'
	},{
		name : 'selected'
	} ],

	data : [ [ 'Nordanstig', '2132', false ],
	         [ 'Sundsvall', '2281', false ],
	         [ 'Timrå', '2262', false ],
	         [ 'Ånge', '2260', false ],
	         [ 'Härnösand', '2280', false ],
	         [ 'Kramfors', '2282', false ],
	         [ 'Sollefteå', '2283', false ],
	         [ 'Örnskoldsvik', '2284', false ],
	         [ 'Nordmaling', '2401', false ]
	]
});