/*
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
    All rights reserved. This program and the accompanying materials
    are made available under the terms of the GNU Affero General Public License
    which accompanies this distribution, and is available at
    http://www.gnu.org/licenses/agpl-3.0.html
 */


/**
* A model store for det grouped layers. 
*/

Ext.define('AdmClient.store.GroupedLayerTree' ,{
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.XmlStore',
        'GeoExt.container.WmsLegend',
        'GeoExt.data.WfsCapabilitiesLayerStore',
        'GeoExt.data.WmsCapabilitiesLayerStore',
        'AdmClient.model.Layer'
    ],
    id: 'configurationTreeStore',

    model: 'AdmClient.model.Layer',
    defaultRootProperty: 'layers',

    proxy: {
        type: 'memory'
    },

    maxLayerIndex: 1000,

    listeners: {
        beforeinsert: function(store, node, refNode, eOpts) { return this.onBeforeInsertAppend(store, node, refNode); },
        beforeappend: function(store, node, eOpts) { return this.onBeforeInsertAppend(store, node); },
        insert: function(store, node, refNode, eOpts) { this.onInsertAndAppend(store, node); },
        append: function(store, node, index, eOpts) { this.onInsertAndAppend(store, node); },
        remove: function(store, node, isMove, eOpts) { this.onRemove(store, node, isMove); },
        move: function(store, oldParent, newParent, index, eOpts) {this.onMove(store, oldParent, newParent, index, eOpts);},
        datachanged: function() { this.onUpdate(); },
        layerMetadataChange: function(){
            AdmClient.app.config.layers = this.getLayerConfiguration();
        }
    },

    constructor: function(config) {
        config = Ext.apply({}, config);
        this.callParent([config]);
        
    },

	onMove: function(store, oldParent, newParent, index, eOpts) {
		console.log('onMove');
		console.log(oldParent);
	},
    /**
    * Before insert to store
    * @param {Ext.data.Store} store
    * @param {Ext.data.Model} node
    * @param {Ext.data.Model} refNode
    */
    onBeforeInsertAppend: function(store, node, refNode) {
/*    	var layerName = this.getLayerName(node.data);
        if ((node.$className === 'GeoExt.data.WmsCapabilitiesLayerModel' && (!node.data.wms && node.raw && node.raw.url && layerName)) || node.$className === 'AdmClient.model.Layer') {
        	return true;
        } else {
        	return false;
        }
*/
		return true;
    },

    /**
     * Get a nodes layer name
     * @param {Ext.data.Model} data
     */
	getLayerName: function(data) {
    	if (data.wms && data.wms.params && (data.wms.params.LAYERS || data.wms.params.layers)) {
    			return data.wms.params.LAYERS || data.wms.params.layers;
    	} else {
    		return data.name;
    	}
	},

	onInsertAndAppend: function(store, node) {
		if(!this._inserting) {
			this._inserting = true; 
	        if (node.$className === 'GeoExt.data.WmsCapabilitiesLayerModel') {
		    	node.set('allowDrag', true);
	        	var layerName = this.getLayerName(node.data);
	        	
    			// Add this node layers and subnodes to map. 
//				store.cascadeBy(function(node) {
					
			        if(node.raw && node.raw.CLASS_NAME && node.raw.CLASS_NAME.indexOf('OpenLayers.Layer') > -1) {
		    			node.set('layer', node.raw);
		
						if (node.raw.CLASS_NAME.indexOf('OpenLayers.Layer.WMS') > -1) {
			            	var wms = {url: node.raw.url, options: {displayInLayerSwitcher: true, isBaseLayer: false, visibility: true}};
			    			if (node.raw.params) {
			    				wms.params = node.raw.params; 
			    			} else {
			    				wms.params = {layers: layerName};
			    			}
			    			if (node.raw.metadata && node.raw.metadata.legendURL) {
			    				wms.options.legendURL = node.raw.metadata.legendURL; 
			    			}
			    			if (node.raw.metadata && node.raw.metadata.metadataURLs && node.raw.metadata.metadataURLs.length > 0) {
			    				wms.metadataURL = node.raw.metadata.metadataURLs[0]; 
			    			}
			    			node.set('wms', wms);
			    		}
		    			
		    			if (node.raw.metadata && node.raw.metadata.queryable) {
		    				node.set('queryable', node.raw.metadata.queryable); 
		    			}
		    	    	node.set('isGroupLayer', false);
		    	    	node.set('clickable', false);
		    	    	
		    	    	// Add getLayer function to support GeoExt
		    	    	var layer = node.get('layer');
		    	    	node.getLayer = function() {
		    	    		this.get('layer');
		    	    	};
		    	    	
						// Add ´metadata and WFS info to node if it is queryable
		    	    	this.getWFSSettings(node);
		        	}
//	        	});
//	        } else if (node.$className === 'AdmClient.model.Layer') {
//				console.log('onInsertAndAppend');
//	        	console.log(node);
	      }
	      this._inserting = false;
	    }
    },
    
    /**
     * Handler for a store's remove event.
     *
     * @param {Ext.data.Store} store
     * @param {Ext.data.Model} node
     * @param {Boolean} isMove
     * @private
     */
    onRemove: function(store, node, isMove) {
        if(!this._removing && !isMove) {
            this._removing = true;
            // Remove layer and sublayers from map
            node.cascadeBy(function(subnode) {
                var layer = subnode.get('layer');
                if(layer && layer.map) {
                    this.map.removeLayer(layer);
                }
            }, this);

            // Remove layers from app configuration
            AdmClient.app.config.layers = this.getLayerConfiguration();

            delete this._removing;
        }
    },

    onUpdate: function(chkBox, opt, eOpts ) {
        if(!this._updating) {
            this._updating = true;

            var data = null;
            if (chkBox && chkBox.data)
            	data = chkBox.data;

            if (data && data.id === "root"){
                this._updating = false;
                return;
            }

            var s = Ext.getStore('configurationTreeStore');
            AdmClient.app.config.layers = s.getLayerConfiguration();
        }
        this._updating = false;
    },

    
    /**
     * Tries to get WFS-settings for a layer 
     * @private
     * @param  {Ext.data.NodeInterface} node     
     */
    getWFSSettings: function(node) {
        var stripName = function(name) {
            var parts = name.split(':');
            return parts.length > 1 ? parts : ['',name];
        };
        if (!(node.data && node.data.wms)) {
        	return false;
        }
    	var layerPieces = stripName(node.data.wms.params.layers || node.data.wms.params.LAYERS);
        var wfsUrl = proxyUrl + wfsServer + '?service=wfs&request=DescribeFeatureType&version=1.0.0&typeName=' + (node.data.wms.params.layers || node.data.wms.params.LAYERS);
	    var localWfsStore = Ext.create('GeoExt.data.AttributeStore');
	    localWfsStore.setUrl(wfsUrl);
	    localWfsStore.load({
	        scope: node,
	        callback: function(records, operation, success) {
	        	if (success && records.length > 0) {
	        		var metadata = {};
		            records.forEach(function(a){
		                if (this.get('metadata') === '' || !this.get('metadata')){
		                    metadata.attributes = {};
		                }
		                metadata.attributes[a.data.name] = {
		                    "alias" : a.data.name
		                };
		            }, this);
	        		this.set('metadata', metadata);
		            this.set('wfs', {
		            	featurePrefix: layerPieces[0],
		                featureType: layerPieces[1],
		                url: wfsServer
		               });
		            this.set('queryable', true);
		            this.set('clickable', true);
	                var s = Ext.getStore('configurationTreeStore');
	                AdmClient.app.config.layers = s.getLayerConfiguration();
	            // WFS Fails, try WMS 
		        } else if (this.get('wms')  && this.get('wms').params && (this.get('wms').params.LAYERS || this.get('wms').params.layers)) {
					var srsName = null;
					var wms = this.get('wms');
					for (srsName in this.get('srs')) {
						break;
					}
					var boundary = this.get('bbox')[srsName].bbox;
					var extent = new OpenLayers.Bounds.fromArray(boundary);
					var layerName = wms.params.LAYERS || wms.params.layers; 

					var requestUrl = proxyUrl + wmsServer + '?' + 'request=GetFeatureInfo&service=WMS&version=1.1.1&layers=' + layerName + '&styles=&srs=' + srsName + '&bbox=' + extent.toString() + 
						'&width=1&height=1&query_layers=' + layerName + '&info_format=application/vnd.ogc.gml&feature_count=1&x=0&y=0';
					Ext.Ajax.request({
						scope: this,
						url: requestUrl,
						success: function(){
							var format = new OpenLayers.Format.GML();
							var feature = format.read(arguments[0].responseXML);
			                var store = Ext.getStore('configurationTreeStore');

							if (feature.length > 0) { 
								metadata = {};
								if (this.get('metadata') === '' || !this.get('metadata')){
									metadata.attributes = {};
								}
								for (var attribute in feature[0].attributes){
									//var item = [attribute, attribute, true];
									metadata.attributes[attribute] = {
										alias: attribute
									};
								}
								this.set('metadata', metadata);
								this.set('clickable', true); 
				                AdmClient.app.config.layers = store.getLayerConfiguration();
							} else {
								this.set('clickable', false); 
								this.set('queryable', false); 
				                AdmClient.app.config.layers = store.getLayerConfiguration();
							}
						}
					});
		        }
	        }
	    });
    },

    /*
     * Since not all models include all AdmClient attributes, like wms and wfs
     * try to get attributes from the raw json data. As a last solution set defaults
     * @param    {Ext.data.NodeInterface}    node        node to search for attributes in
     * @param    {string}                    attribute   searched attribute
     */
    tryToGetRecordAttribute: function(node, attribute) {
        var attr = null;
        var modelNodeAttr = node.get(attribute);
        
        if( (modelNodeAttr && typeof modelNodeAttr !== 'undefined')) {
            attr = modelNodeAttr;
        } else if(typeof node.data[attribute] !== 'undefined') {
            attr = node.data[attribute];
        }
        return attr;
    },
     
    /**
    * Converts a store node to layer configuration
    * !TODO Change into writer and add something like nameProperty: 'mapping' to get mapped JSON
    * @param  {Ext.data.NodeInterface}    node    Node to convert
    * @return {object}                    layer   OpenEMap layer
    */
    nodeToLayerConfig: function(node) {
        var attributeList = ['name','wms','wfs','metadataUrl', 'isGroupLayer', 'queryable', 'clickable', 'expanded'];
        var layer = {};
        var me = this;

        var stripName = function(name) {
            var parts = name.split(':');
            return parts.length > 1 ? parts : ['',name];
        };

        attributeList.forEach(function(attributeName) {
            var attr = this.tryToGetRecordAttribute(node, attributeName);
            if(attr !== undefined) {
                layer[attributeName] = attr;
            }
        }, this);

        if(layer.wms && layer.wms.options) {
            var isBaseLayer = this.tryToGetRecordAttribute(node, 'isBaseLayer');
            if(!isBaseLayer) {
                isBaseLayer = false;
            }
             
            layer.wms.options.isBaseLayer = isBaseLayer;
            layer.wms.options.visibility = this.tryToGetRecordAttribute(node, 'visibility');
             
            if (layer.wms.options.visibility === undefined || layer.wms.options.visibility === null){
                layer.wms.options.visibility = false;
            }

            if (node.data.metadata && node.data.metadata !== ''){
                layer.metadata = node.data.metadata;
            }
             
            var queryable = this.tryToGetRecordAttribute(node, 'queryable');
            var clickable = this.tryToGetRecordAttribute(node, 'clickable');
            if ((queryable && clickable) || (clickable && this._updating)){
            	var layerPieces = stripName(layer.wms.params.layers ? layer.wms.params.layers : layer.wms.params.LAYERS);
                layer.wfs = {};
                layer.wfs.featurePrefix = layerPieces[0];
                layer.wfs.featureType = layerPieces[1];
                layer.wfs.url = wfsServer;
            } else {
                if (layer.wfs) delete layer.wfs;
            }
        }
         
        if (node.hasChildNodes()) {
	        layer.layers = [];
	        node.childNodes.forEach(function(subnode) {
	        	layer.layers.push(me.nodeToLayerConfig(subnode));
	        });
        }
        return layer;
    },

    /**
    * Returns all layers as OpenEMap layer configuration tree.
    * @return {object} layerConfig  OpenEMap layer configuration
    */
    getLayerConfiguration: function() {
    	var layerConfig  = [];
        // Get layers and sublayers.
        this.getRootNode().childNodes.forEach(function(node, i) {
        	layerConfig.push(this.nodeToLayerConfig(node));
        }, this);
        return layerConfig;
    },

    layerUpdate : function(){
        AdmClient.app.config.layers = this.getLayerConfiguration();
    },

    /**
     * Reorder map layers from store order
     *
     * @private
     */
    reorderLayersOnMap: function() {
        if(this.map) {
            var node = this.getRootNode();
            if(node) {
                var i = this.maxLayerIndex;
                node.cascadeBy(function(subnode) {
                    var layer = subnode.get('layer');
                    if(layer) {
                        layer.setZIndex(i);
                        i--;
                    }
                   
                }, this);
            }
        }
    },

    /**
    * Adds a WMS-legend to a node
    * @param {Ext.data.Model} node
    * @return {Ext.data.Model} node
    */
    addWMSLegend: function(node) {
        if(node.get('layer')) {
            node.gx_wmslegend = Ext.create('GeoExt.container.WmsLegend',{
                layerRecord: node,
                showTitle: false,
                hidden: true,
                deferRender: true,
                // custom class for css positioning
                // see tree-legend.html
                cls: "legend"
            });
        }
        return node;
    },

    /**
     * Unbind this store from the map it is currently bound.
     */
    unbind: function() {
        var me = this;
        me.un('beforeinsert', me.onBeforeInsertAndAppend, me);
        me.un('beforeappend', me.onBeforeInsertAndAppend, me);
        me.un('insert', me.onInsertAndAppend, me);
        me.un('append', me.onInsertAndAppend, me);
        me.un('remove', me.onRemove, me);
        me.un('datachangded', me.onUpdate, me);
        me.map = null;
    },

    /**
     * Unbinds listeners by calling #unbind prior to being destroyed.
     *
     * @private
     */
    destroy: function() {
        //this.unbind();
        //this.callParent();
    }
});
