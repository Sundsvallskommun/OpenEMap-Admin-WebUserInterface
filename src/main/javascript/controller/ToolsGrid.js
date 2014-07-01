Ext.define('AdmClient.controller.ToolsGrid', {
	extend : 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.tools.details.*', 'AdmClient.view.MapConfiguration'],
	refs : [{
		ref	: 'configurations',
		selector : '#configurations'
	},{
		ref : 'toolsGrid',
		selector : '#toolsGrid'
	},{
		ref : 'toolGeneral',
		selector : '#toolGeneral'
	}],
	init : function() {
		this.control({

			'#toolsGrid' : {
				render : this.gridRender
			},
			
			'#details' : {
				render : this.detailsRender
			}
		});

		this.application.on({
            configuration_change: this.markTools,
            scope: this
        });
	},

	views : [],
	
	gridRender : function(panel, opts) {
		this.markTools();
	},
	
	markTools : function(){
		var panel = this.getToolsGrid();
		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			panel.store.data.items[i].save();
		}
		
		
		// IMPORTANT
		// this needs to rewrite
		for (var i = 0; i < panel.store.data.items.length; i++){
			panel.store.data.items[i].data.selected = false;
			var toolName = panel.store.data.items[i];
			for (var j = 0; j < AdmClient.app.config.tools.length; j++){
				var configTool = AdmClient.app.config.tools[j];
				if (configTool.constructor === String){
					if (configTool === toolName.data.toolName){
						toolName.data.selected = true;
						toolName.save();
					}
				} else if (configTool.type === toolName.data.toolName){
					if (configTool.geometry && configTool.geometry === toolName.data.tool){
						toolName.data.selected = true;
					} else if(configTool.geometry && configTool.geometry !== toolName.data.tool){
						continue;
					} 
					else if(configTool.type && toolName.data.toolName){
						toolName.data.selected = true;
					}
					toolName.save();
				}
			}
		}
		panel.updateLayout();
	},
	
	toolsHasEmptyObject : function(){
		for (var i = 0; i < AdmClient.app.config.tools.length; i++){
			if (Object.keys(AdmClient.app.config.tools[i]).length > 0){
				return true;
			}
		}
		return false;
	},
	
	// function show details about a tool
	detailsRender : function() {
		var detailsPanel = arguments[0];
		detailsPanel.removeAll(false);
		var toolName = this.getToolsGrid().getSelectionModel().selected.items[0].data.toolName;
		var tool = 'AdmClient.view.mapconfiguration.tools.details.' + toolName;
		var toolPanel = Ext.create(tool);
		detailsPanel.add(toolPanel);
	}
	
});