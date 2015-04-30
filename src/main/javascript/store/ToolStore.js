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
		name : 'selected'
	} ],

	data : [ [ 'DrawGeometry', 'Point', 'Draw point', false ],
	         [ 'DrawGeometry', 'Path', 'Draw line', false ],
	         [ 'DrawGeometry', 'Polygon', 'Draw polygon.', false ],
	         [ 'DrawGeometry', 'Text', 'Draw text.', false ],
	         [ 'DrawObject', 'Rectangle', 'Draw rectangular object.', false ],
	         [ 'DrawObject', 'Octagon', 'Draw octagonal object.', false ],
	         [ 'DrawObject', 'L-shape', 'Draw L-shaped object.', false ],
	         [ 'DrawObject', 'D-shape', 'Draw D-shaped object.', false ],
			[ 'SelectGeometry', 'Select geometry', 'Tool for selecting geometry.', false ],
			[ 'ModifyGeometry', 'Modify geometry', 'Tool for modify geometry.', false ],
			[ 'DeleteGeometry', 'Delete geometry', 'Tool for delete single geometry.', false ],
			[ 'DeleteAllFeatures', 'Delete all geometries', 'Tool for delete all geometries on map.', false ],
			[ 'FullExtent', 'Full extent', 'Zoom to full extent.', false ],
			[ 'ZoomSelector', 'Zoom to scale', 'Zoom to scale.', false ],
			[ 'Print', 'Print', 'Tool for printing.', false ],
			[ 'Identify', 'Identify', 'Identify features.', false ],
			[ 'Popup', 'Popup', 'Tool to show popup window for features in popup layers.', false ],
			[ 'DetailReport', 'Detail report', 'Tool for detail report.', false],
			[ 'MeasureArea', 'Measure area', 'Measure area in 2D.', false ],
			[ 'MeasureLine', 'Measure line', 'Measure line in 2D.', false ],
			[ 'DeleteMeasure', 'Delete measure', 'Tool for delete measure.', false]
			//[ 'A', 'Detail report', 'Tool for detail report.', false]
	]
	
});