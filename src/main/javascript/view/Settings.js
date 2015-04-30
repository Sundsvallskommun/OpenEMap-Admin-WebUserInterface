/*
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
    All rights reserved. This program and the accompanying materials
    are made available under the terms of the GNU Affero General Public License
    which accompanies this distribution, and is available at
    http://www.gnu.org/licenses/agpl-3.0.html
 */



/**
* Main settings view for the application
*/
Ext.define('AdmClient.view.Settings', {
	extend : 'Ext.panel.Panel',
	requires: ['AdmClient.view.settings.Layers', 'AdmClient.store.Servers', 'AdmClient.store.SearchServer'],
	alias : 'widget.settings',
	title : 'Settings',
	layout: 'fit',
	initComponent : function() {
		this.items = [ {
			xtype : 'tabpanel',
			items : [ {
				margin : 8,
				title : 'Servers',
				border : true,
				items : [ {
					xtype : 'gisServersGrid',
					margin : 8,
					store : new AdmClient.store.Servers(),
					itemId : 'srvGrid',
					title : 'GIS-Servers',
					border : true
				}, {
					xtype : 'settingsGridBase',
					margin : 8,
					store : new AdmClient.store.SearchServer(),
					itemId : 'searchGrid',
					title : 'Geosearch',
					border : true
				} ]
			},{
				xtype : 'layers'
			} ]

		} ];
		this.callParent(arguments);
	}
});
