Ext.define('AdmClient.controller.toolDetails.DrawPath', {
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
			if (/Path/.test(toolObject.tool)){
				//find the right place in config object
				var configItems = AdmClient.app.config.tools.filter(function(t){
					return t.tool === 'Path';
				});
				
				if (configItems.length === 0){ // add tool to config object
					var tool = {type: 'DrawGeometry', iconCls : 'action-drawline', geometry : 'Path'};
					AdmClient.app.config.tools.push(tool);
				}
			}
		}
		else{
			if (/Path/.test(toolObject.tool)){
				
				for (var i = 0; i < AdmClient.app.config.tools.length; i++){
					var tool = AdmClient.app.config.tools[i];
					if (/Path/.test(tool.geometry)){
						AdmClient.app.config.tools.splice(i, 1);
					}
				}
			}
		}
		
		this.getToolsGrid().store.commitChanges();
	}
});