Ext.define('AdmClient.view.mapconfiguration.layer.LayerDetails', {
	extend : 'Ext.window.Window',
	alias : 'widget.layerDetails',

	requires: [
		'Ext.window.Window',
		'Ext.data.XmlStore',
		'GeoExt.data.WfsCapabilitiesLayerStore',
		'GeoExt.data.WmsCapabilitiesLayerStore',
		'GeoExt.data.AttributeStore'
	],
	layout: {
		type : 'border',
		margin : 8
	},
	title : 'Lager inst&auml;llningar',
	width : 600,
	height : 400,

	constructor : function(){
		this.layer = arguments[0].selectedLayer;
		this.panelGrid = arguments[0].grid;

		if (this.layer === null){
			Ext.Msg.show({
				title: 'Inget lagernamn.',
				msg: 'Kan ej editera grupplager.',
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.WARNING
			});
			this.close();
			return;
		}

		this.title +=  ' - ' + this.layer.name;

		this.callParent(arguments);
	},

	getAttributeCollection: function(attributes){
		var items = [];
		for (var key in attributes){
				var item = [key, '', false];
				items.push(item);
		}
		return items;
	},

	getItem: function(item){
		item.forEach(function(row){
			console.log(row);
		});
	},

	initComponent : function() {

		var self = this;
		this.x = Math.ceil(window.innerWidth / 2 - this.innerWidth / 2);
		this.y = Math.ceil(window.innerHeight / 2 - this.innerHeight / 2);

		this.modal = true;
		
		if (this.layer.wfs){
			var getTypeName = function(layer) {
				if (layer.wfs.featurePrefix && layer.wfs.featureType) {
					return layer.wfs.featurePrefix + ':' + layer.wfs.featureType;
				} else if (layer.name) {
					return layer.name;
				} else {
					Ext.Error.raise({
		                msg: 'No valid layer name for WFS-layer',
		                option: this
		            });
				}
					
			}
			
			var wfsUrl = 'adminproxy?url=' + wfsServer + '?service=wfs&request=DescribeFeatureType&version=1.0.0&typeName=' + getTypeName(this.layer);
			this.store = Ext.create('GeoExt.data.AttributeStore');
			var proxy = this.store.getProxy();
			Ext.apply(proxy.proxyConfig, {headers: {"Content-Type": "application/xml; charset=UTF-8"}});
			this.store.setUrl(wfsUrl);
			this.store.load();
		}
		else if (this.layer.wms){
			var pathArray = this.layer.wms.url.split('/');

			this.store = Ext.create('Ext.data.ArrayStore', {fields: [
				{name: 'name'},
                {name: 'alias'},
                {name: 'visible', type: 'boolean', defaultValue: true}
                ]
            });

			this.wmsStore = Ext.create('GeoExt.data.WmsCapabilitiesLayerStore',{
				url: wmsGetCapabilities
			});

			
			
			this.wmsStore.load({
                scope: this,
                callback: function(records, operation, success) {
        			var getLayerName = function(layer) {
        				if (layer.wms.params && layer.wms.params.LAYERS) {
        					return layer.wms.params.LAYERS;
        				} else if (layer.name) {
        					return layer.name;
        				} else {
        					Ext.Error.raise({
        		                msg: 'No valid layer name for WMS-layer',
        		                option: this
        		            });
        					return undefined;
        				}
        			}
                	var layerName = getLayerName(this.layer);
                    if(layerName && records && records.length > 0) {
                    	records = records.filter(function(record){
                    		return record.get('name') === layerName;
                    	});
                        
                        if (records.length > 0) {
	                        records.forEach(function(record) {
                            	var boundaryBox = record.get('bbox');
                            	for (var srsName in boundaryBox){
                            		var boundary = boundaryBox[srsName].bbox;
                            		var extent = new OpenLayers.Bounds.fromArray(boundary);

                            		var requestUrl = 'adminproxy?url=' + wmsServer + '?' + 'request=GetFeatureInfo&service=WMS&version=1.1.1&layers=' + layerName + '&styles=&srs=' + srsName + '&bbox=' + extent.toString() + 
                            		 	'&width=1&height=1&query_layers=' + layerName + '&info_format=application/vnd.ogc.gml&feature_count=1&x=0&y=0';
                            		 Ext.Ajax.request({
                            		 	scope: this,
                            		 	url: requestUrl,
                            		 	success: function(){
                            		 		var format = new OpenLayers.Format.GML();
                            		 		var feature = format.read(arguments[0].responseXML);
                            		 		var fields = this.getAttributeCollection(feature[0].attributes);
                            		 		

                            		 		if (this.layer.metadata 
                            		 				&& this.layer.metadata.attributes 
                            		 				&& this.layer.metadata.attributes instanceof Object) {
                            		 			var attributesInLayer = this.layer.metadata.attributes;
                            		 			for (var attribute in attributesInLayer){
                            		 				var item = fields.filter(function(f){
                            		 					return f[0] === attribute;
                            		 				});
                            		 				if (item.length > 0) {
                            		 					item[0][1] = item[0][1] === '' ? attributesInLayer[attribute].alias : item[0][1];
                            		 					item[0][2] = true;
                            		 				}
                            		 			}
                            		 		}
                            		 		this.store.loadData(fields);
										}
                            		 });
                            	}
	                        }, this);
	                    } else {
	                    	Ext.Error.raise({
	                            msg: 'Cant get metadata for layer' + layerName,
	                            option: this
	                        });	            
	                    }
                    } else {
                    	Ext.Error.raise({
                            msg: 'Cant get metadata for layer' + layerName,
                            option: this
                        });	            
                    }
                }
            });
		}
		if (this.store){
			this.store.addListener('load', function(store, records, successful, eOpts){
				records.forEach(function(l){
					if (self.layer.metadata && self.layer.metadata.attributes && self.layer.metadata.attributes[l.data.name] instanceof Object){
						l.data.alias = self.layer.metadata.attributes[l.data.name].alias;
						l.data.visible = true;
					}
				});
				store.update();
			});
		}

		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit : 1
		});

		this.items = [{
			region: 'center',
			xtype: 'grid',
			itemId: 'layerDetailsGrid',
			store: this.store || undefined,

			plugins : [ this.cellEditing ],
			columns: [{
				header: 'Kolumn',
				dataIndex : 'name'
			},{
				header: 'Alias',
				dataIndex: 'alias',
				editor : {
					allowBlank : false
				}
			},{
				header: 'Synlig',
				xtype: 'checkcolumn',
				dataIndex: 'visible',
				listeners :{
					'checkchange': function(chkBox, rowIdx, checked, eOpts){
						if (checked){
							self.store.data.items[rowIdx].data.alias = self.store.data.items[rowIdx].data.alias || self.store.data.items[rowIdx].data.name;
						}else{
							self.store.data.items[rowIdx].data.alias = '';
						}
						self.store.update();
					}
				}
			}]
		},{
			region: 'south',
			xtype : 'toolbar',
			items : [
			'->',{
				xtype: 'button',
				text: 'Spara',
				itemId: 'saveLayerDetail'
			},{
				xtype : 'button',
				text : 'Avbryt',
				itemId: 'cancelLayerDetail',
				handler: function(){
					self.close();
				}
			}
			]
		}],

		this.callParent(arguments);
	}
});