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

	data : [ [ 'DrawGeometry', 'Point', 'Action for add point.', false ],
	         [ 'DrawGeometry', 'Path', 'Action for draw line tool.', false ],
	         [ 'DrawGeometry', 'Polygon', 'Action for draw polygon tool.', false ],
			[ 'DeleteGeometry', 'Delete geometry', 'Tool for delete geometry.', false ],
			[ 'DeleteAllFeatures', 'Delete all geometry', 'Tool for delete all geometries on map.', false ],
			[ 'FullExtent', 'Full extent', 'Zoom to full extent.', false ],
			[ 'Identify', 'Identify', 'Identify features.', false ],
			[ 'MeasureArea', 'Measure area', 'Measure area in 2D.', false ],
			[ 'MeasureLine', 'Measure line', 'Measure line in 2D.', false ],
			[ 'DeleteMeasure', 'Delete measure', 'Tool for delete measure.', false],
			[ 'Print', 'Print', 'Tool for printing.', false ],
			[ 'ModifyGeometry', 'Modify geometry', 'Tool for modify geometry.', false ],
			[ 'DetailReport', 'Detail report', 'Tool for detail report.', false]
	]
	
});