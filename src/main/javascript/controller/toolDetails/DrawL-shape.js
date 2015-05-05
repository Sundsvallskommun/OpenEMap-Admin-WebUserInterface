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
* A controller to handle tooldetails for draw polygon tool.
*/

Ext.define('AdmClient.controller.toolDetails.DrawL-shape', {
	extend : 'AdmClient.controller.MapConfiguration',
	requires : [ 'AdmClient.view.mapconfiguration.tools.details.*', 'AdmClient.view.MapConfiguration'],
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	toolId: 'DrawL-shape',
	config : {id: 'DrawL-shape', type : 'DrawObject', itemId : 'DrawObjectL', tooltip : 'Rita L-format objekt', iconCls : 'action-draw-L', disable : false, obectConfig : {type : 'L'}, attributes: {state: 'GEOMETRY', metadata: {state: {hidden: false}}}},
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		var store = this.getToolsGrid().getSelectionModel().store;
		if (store.data.items[rowIndex].data.id === this.toolId) {
			this.getToolsGrid().getSelectionModel().store.checkTool(rowIndex, checked, this.config);
		}
	}
});
