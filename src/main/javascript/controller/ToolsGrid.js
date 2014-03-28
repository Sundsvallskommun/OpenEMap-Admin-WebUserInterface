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
			'#toolsGrid checkcolumn' : {
				checkchange : this.toolSelected
			},

			'#toolsGrid' : {
				render : this.gridRender,
				select : this.gridRowSelected
			},
			
			'#details' : {
				render : this.detailsRender
			},
			
			'#configurations' :{
				select : this.selectConfiguration
			}

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
		// this I need to rewrite
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
//		panel.doLayout();
	},
	
	toolsHasEmptyObject : function(){
		for (var i = 0; i < AdmClient.app.config.tools.length; i++){
			if (Object.keys(AdmClient.app.config.tools[i]).length > 0){
				return true;
			}
		}
		return false;
	},
	
	

	// if the user checks the item, lets add the tool to a collection of tools in config
	// if the user uncheckes the item, lets remove the tool from the tools collection in config
	toolSelected : function(chkBox, rowIndex, checked, eOpts) {
		
//			var currentToolName = this.getToolsGrid().getSelectionModel().store.data.items[rowIndex].data.toolName;
//			
//			if (checked){
//				if(!AdmClient.app.config.tools){
//					AdmClient.app.config.tools = [];
//				}
//				AdmClient.app.config.tools.push({type : currentToolName});
//			}
//			if (!checked){
//				if (AdmClient.app.config.tools){
//					AdmClient.app.config.tools.forEach(function(i){
//						if (i.type && i.type === currentToolName){
//							Ext.Array.remove(AdmClient.app.config.tools, i);
//							delete i;
//						}
//					});
//					if (AdmClient.app.config.tools.length === 0)
//						delete AdmClient.app.config.tools;
//				}
//			}
//			this.getToolsGrid().store.commitChanges();
	},

	// if the user marks a row, lets show some info about the tool,
	// detailsrender function show details about a tool
	gridRowSelected : function(toolsGrid, record, index, eOpts) {

//		this.getToolGeneral().removeAll(false);
//		var view = this.views[record.get('tool')] || 
//			new AdmClient.view.mapconfiguration.tools.details.General(record.get('tool'), record.get('toolName'));
//		this.views[record.get('tool')] = view;
//		this.getToolGeneral().add(view);

	},
	
	// function show details about a tool
	detailsRender : function() {
		var detailsPanel = arguments[0];
		detailsPanel.removeAll(false);
		var toolName = this.getToolsGrid().getSelectionModel().selected.items[0].data.toolName;
		var tool = 'AdmClient.view.mapconfiguration.tools.details.' + toolName;
		var toolPanel = Ext.create(tool);
		detailsPanel.add(toolPanel);
	},
	
	selectConfiguration : function(combo, records){
		var selectedConfig = records[0].raw;
		this.markTools();
	}
	

});