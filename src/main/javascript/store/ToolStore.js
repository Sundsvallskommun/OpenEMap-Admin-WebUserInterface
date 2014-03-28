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
			//[ 'DrawObject', 'Draw object', 'Tool for draw object i e, square, L-shape, hexagon-shape etc.', false ],
			[ 'FullExtent', 'Full extent', 'Zoom to full extent.', false ],
			[ 'Identify', 'Identify', 'Identify features.', false ],
			[ 'MeasureArea', 'Measure area', 'Measure area in 2D.', false ],
			[ 'MeasureLine', 'Measure line', 'Measure line in 2D.', false ],
			[ 'Print', 'Print', 'Tool for printing.', false ],
			[ 'ModifyGeometry', 'Modify geometry', 'Tool for modify geometry.', false ],
			[ 'DetailReport', 'Detail report', 'Tool for detail report.', false]
	]
	
});