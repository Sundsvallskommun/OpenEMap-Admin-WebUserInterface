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
* A model store for det grouped ToolStore.
* To add a tool, add it to the data section 
*/

Ext.define('AdmClient.store.ToolStore', {
	extend : 'Ext.data.ArrayStore',

	fields : [ {
		name : 'toolName',
		type : 'string'
	},{
		name : 'tool',
		type : 'string'
	}, {
		name : 'info',
		type : 'string'
	},{
		name : 'id',
		type : 'string'
	}, {  
		name : 'selected'
	} ],

	data : [ [ 'DrawGeometry', 'Point', 'Draw point', 'DrawPoint', false ],
	         [ 'DrawGeometry', 'Path', 'Draw line', 'DrawLine', false ],
	         [ 'DrawGeometry', 'Polygon', 'Draw polygon.', 'DrawPolygon', false ],
	         [ 'DrawGeometry', 'Text', 'Draw text.', 'DrawText', false ],
	         [ 'DrawObject', 'Rectangle', 'Draw rectangular object.', 'DrawRectangle', false ],
	         [ 'DrawObject', 'Octagon', 'Draw octagonal object.', 'DrawOctagon', false ],
	         [ 'DrawObject', 'L-shape', 'Draw L-shaped object.', 'DrawL-shape', false ],
	         [ 'DrawObject', 'D-shape', 'Draw D-shaped object.', 'DrawD-shape', false ],
			[ 'SelectGeometry', 'Select geometry', 'Tool for selecting geometry.', 'SelectGeometry', false ],
			[ 'ModifyGeometry', 'Modify geometry', 'Tool for modify geometry.', 'ModifyGeometry', false ],
			[ 'DeleteGeometry', 'Delete geometry', 'Tool for delete single geometry.', 'DeleteGeometry', false ],
			[ 'DeleteAllFeatures', 'Delete all geometries', 'Tool for delete all geometries on map.', 'DeleteAllFeatures', false ],
			[ 'FullExtent', 'Full extent', 'Zoom to full extent.', 'FullExtent', false ],
			[ 'ZoomSelector', 'Zoom to scale', 'Zoom to scale.', 'ZoomSelector', false ],
			[ 'Print', 'Print', 'Tool for printing.', 'Print', false ],
			[ 'Identify', 'Identify', 'Identify features.', 'Identify', false ],
			[ 'Popup', 'Popup', 'Tool to show popup window for features in popup layers.', 'Popup', false ],
			[ 'Permalink', 'Permalink', 'Dela karta.', 'Permalink', false ],
			[ 'DetailReport', 'Detail report', 'Tool for detail report.', 'DetailReport', false],
			[ 'MeasureArea', 'Measure area', 'Measure area in 2D.', 'MeasureArea', false ],
			[ 'MeasureLine', 'Measure line', 'Measure line in 2D.', 'MeasureLine', false ],
			[ 'DeleteMeasure', 'Delete measure', 'Tool for delete measure.', 'DeleteMeasure', false]
			//[ 'A', 'Detail report', 'Tool for detail report.', false]
	],
	
	checkTool: function(rowIndex, checked, tool) {
		var toolObject = this.data.items[rowIndex].data;

		if (checked){
			//find the right place in config object
			var configItems = AdmClient.app.config.tools.filter(function(t){
				return (t.id === toolObject.id);
			});
			if (configItems.length === 0){ // add tool to config object
				AdmClient.app.config.tools.push(tool);
			}
		} else {
			for (var i = 0; i < AdmClient.app.config.tools.length; i++){
				tool = AdmClient.app.config.tools[i];
				if (toolObject.id === tool.id) {
					AdmClient.app.config.tools.splice(i, 1);
				}
			}
		}
		this.commitChanges();
	}
});