Ext.define('AdmClient.controller.toolDetails.FullExtent', {
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
			if (/FullExtent/.test(toolObject.toolName)){
				//find the right place in config object
				var configItems = AdmClient.app.config.tools.filter(function(t){
					return t.tool === 'FullExtent';
				});
				
				if (configItems.length === 0){ // add tool to config object
					var tool = {type: 'FullExtent'};
					AdmClient.app.config.tools.push(tool);
				}
			}
		}
		else{
			if (/FullExtent/.test(toolObject.toolName)){
				
				for (var i = 0; i < AdmClient.app.config.tools.length; i++){
					var tool = AdmClient.app.config.tools[i];
					if (/FullExtent/.test(tool.type)){
						AdmClient.app.config.tools.splice(i, 1);
					}
				}
			}
		}
		
		this.getToolsGrid().store.commitChanges();
	}
});