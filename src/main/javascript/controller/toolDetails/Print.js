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
* A controller to handle tooldetails for print tool.
*/


Ext.define('AdmClient.controller.toolDetails.Print', {
	extend : 'AdmClient.controller.MapConfiguration',
	requires : [ 'AdmClient.view.mapconfiguration.tools.details.*', 'AdmClient.view.MapConfiguration'],
	refs : [{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	}],
	init : function() {
		this.control({
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			}
		});
	},
	
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		
		var toolObject = this.getToolsGrid().getSelectionModel().store.data.items[rowIndex].data;
		var tool = null;
		if (/Print/.test(toolObject.toolName)){
			if (checked){
				//find the right place in config object
				var configItems = AdmClient.app.config.tools.filter(function(t){
					return (t === 'Print' || t.tool === 'Print');
				});
				
				if (configItems.length === 0){ // add tool to config object
					tool = {type: 'Print'};
					AdmClient.app.config.tools.push(tool);
				}
			} else {
				for (var i = 0; i < AdmClient.app.config.tools.length; i++){
					tool = AdmClient.app.config.tools[i];
					if ((/Print/.test(tool.type)) || (/Print/.test(tool))) {
						AdmClient.app.config.tools.splice(i, 1);
					}
				}
			}
			this.getToolsGrid().store.commitChanges();
		}
	}
});