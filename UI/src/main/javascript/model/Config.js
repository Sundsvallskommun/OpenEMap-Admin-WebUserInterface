Ext.define('AdmClient.model.Config', {
	mixins : {
		observable : 'Ext.util.Observable'
	},
	
	setId : function(configId){
		this.configId = configId;
	},
	
	setName : function(name){
		this.name = name;
	},
	
	setMaxExtent : function(maxExtent){
		this.maxExtent = maxExtent;
	},
	
	setExtent : function(extent){
		this.extent = extent;
	},
	
	setAttribution : function(attribution){
		this.attribution = attribution;
	},
	
	setDrawStyle : function(drawStyle){
		this.drawStyle = drawStyle;
	},
	
	setTools : function(tools){
		this.tools = tools;
	},
	
	setLayers : function(layers){
		this.layers = layers;
	},
	
	setVersion : function(version){
		this.version = version;
	},
	
	setAutoClearDrawLayer : function(autoClearDrawLayer){
		this.autoClearDrawLayer = autoClearDrawLayer;
	},
	
	getConfig : function(){
		var config = {};
		config.configId = this.configId;
		config.name = this.name;
		config.maxExtent = this.maxExtent;
		config.extent = this.extent;
		config.attribution = this.attribution;
		config.drawStyle = this.drawStyle;
		config.tools = this.drawStyle;
		config.layers = this.layers;
		config.version = this.version;
		config.autoClearDrawLayer = this.autoClearDrawLayer;
		return config;
	},
	
	loadConfig : function(config){
		for (var k in config){
			this[k] = config[k];
		}
	},
	
	constructor : function(config){
		this.mixins.observable.constructor.call(this, config);
		
		this.addEvents(
				'updatedConfig'
		);
	}
});