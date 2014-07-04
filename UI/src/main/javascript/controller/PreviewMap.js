Ext.define('AdmClient.controller.PreviewMap', {
	extend : 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.map.PreviewMap', 'OpenEMap.Client' ],

	init : function() {
		this.control({
//			'#previewMapPanel' : {
//				render : this.previewRender
//			},
			'#previewMap' : {
//				render : this.previewRender
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
//    			toolbar: {},
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