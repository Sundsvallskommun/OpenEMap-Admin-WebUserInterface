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


/*
* A controller to handle preview map - obselete
*/


Ext.define('AdmClient.controller.PreviewMap', {
	extend : 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.map.PreviewMap', 'OpenEMap.Client' ],

	init : function() {
		this.control({
			'#previewMap' : {
				show : this.previewRender
			}
		});
	},

	previewRender : function(panel) {
		
		
		if (this.mapPanel){
			this.mapPanel.removeAll();
			delete this.mapPanel;
			panel.doLayout();
		}
		
		this.mapPanel = panel;
		
		var mapClient = Ext.create('OpenEMap.Client');

		var gui = {
				map : {},
//    			toolbar: {}, // at the moment this don't work
    			zoomTools: {},
    			layers: {},
    			baseLayers: {},
    			objectconfig : {}
		};
		
		mapClient.destroy();
		var config = Ext.clone(AdmClient.app.config);
		
		mapClient.configure(config, {
			gui : gui
		});

		panel.add(mapClient.gui.container);
		panel.doLayout();
	}
	
	
});