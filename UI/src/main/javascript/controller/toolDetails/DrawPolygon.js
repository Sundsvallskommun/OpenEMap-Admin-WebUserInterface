Ext.define('AdmClient.controller.toolDetails.DrawPolygon', {
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
		if (checked){
			if (/Polygon/.test(toolObject.tool)){
				//find the right place in config object
				var configItems = AdmClient.app.config.tools.filter(function(t){
					return t.tool === 'Polygon';
				});
				
				if (configItems.length === 0){ // add tool to config object
					var tool = {type: 'DrawGeometry', iconCls : 'action-drawpolygon', geometry : 'Polygon'};
					AdmClient.app.config.tools.push(tool);
				}
			}
		}
		else{
			if (/Polygon/.test(toolObject.tool)){
				
				for (var i = 0; i < AdmClient.app.config.tools.length; i++){
					var tool = AdmClient.app.config.tools[i];
					if (/Polygon/.test(tool.geometry)){
						AdmClient.app.config.tools.splice(i, 1);
					}
				}
			}
		}
		
		this.getToolsGrid().store.commitChanges();
	}
	
});