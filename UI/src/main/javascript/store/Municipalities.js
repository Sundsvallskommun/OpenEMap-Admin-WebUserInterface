/******************************************************************************
Copyright Härnösands kommun(C) 2014 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

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