/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

Ext.define('AdmClient.store.GroupedLayerTree' ,{
    extend: 'Ext.data.TreeStore',

    requires: [
        'GeoExt.container.WmsLegend',
        'AdmClient.model.Layer'
    ],

    model: 'AdmClient.model.Layer',
    defaultRootProperty: 'layers',

    proxy: {
        type: 'memory'
    },

    maxLayerIndex: 1000,

    listeners: {
        beforeinsert: function(store, node, refNode, eOpts) { return this.onBeforeInsert(store, node, refNode); },
        beforeappend: function(store, node, eOpts) { return this.onBeforeAppend(store, node); },
        //insert: function(store, node, refNode, eOpts) { this.onInsertAndAppend(node); },
        //append: function(store, node, index, eOpts) { this.onInsertAndAppend(node); },
        remove: function(store, node, isMove, eOpts) { this.onRemove(store, node, isMove); },
        datachanged: function() { this.onUpdate(); },
        layerMetadataChange: function(){
            AdmClient.app.config.layers = this.getLayerConfiguration(null);
        }
    },

    constructor: function(config) {
        config = Ext.apply({}, config);
        this.callParent([config]);
        
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
        } else if(typeof node.raw[attribute] !== 'undefined') {
            attr = node.raw[attribute];
        }
        
        // Set defaults
        if(attribute === 'wms' && typeof modelNodeAttr === 'string') {
            attr = { url: '', options: {}, params: {} };
        } else if(attribute === 'wfs' && typeof modelNodeAttr === 'string') {
            attr = { url: '', featureType: '', featurePrefix: '' };
        }
        
        if (attribute === 'wms' && !modelNodeAttr){
        	attr = attr || {};
        	attr.params = node.raw.params;
        	attr.url = node.raw.url;
        	attr.options = {
        	     "isBaseLayer": false,
        	     "visibility": false
        	    };
        	if (node.raw.options && node.raw.options.metadata && node.raw.options.metadata.metadataURLs && node.raw.options.metadata.metadataURLs.length > 0){
        		attr.metadataUrl = node.raw.options.metadata.metadataURLs[0].href;
        	}
        }
        
        return attr;
    },
    
    /*
    * Converts a store node to layer configuration
    * !TODO Change into writer and add something like nameProperty: 'mapping' to get mapped JSON
    * @param  {Ext.data.NodeInterface}    node    Node to convert
    * @return {object}                    layer   OpenEMap layer
    */
    nodeToLayerConfig: function(node, data) {
        var attributeList = ['name','wms','wfs','metadataUrl'];
        var layer = {};

        if(node.hasChildNodes()) {
            layer.layers = [];
            return layer;
        }
        
        attributeList.forEach(function(attributeName) {
            var attr = this.tryToGetRecordAttribute(node, attributeName);
            if(attr) {
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
            
            var searchable = this.tryToGetRecordAttribute(node, 'searchable');
            if (searchable){
                if (!layer.wfs){
                    layer.wfs = {};
                }
                var layerPieces = layer.wms.params.LAYERS.split(':');
                layer.wfs.featurePrefix = layerPieces[0];
                layer.wfs.featureType = layerPieces[1];
                layer.wfs.url = '/wfs';
            }else {
                if (layer.wfs) delete layer.wfs;
            }
            
            /*if (data && data.name && node.get('name') === data.name){ // handle visibility
            	layer.wms.options.visibility = data.checked;
            }*/
        }
        
        return layer;
    },

    /**
    * Returns all layers as OpenEMap layer configuration tree.
    * @return {object} layerConfig  OpenEMap layer configuration
    */
    getLayerConfiguration: function(data) {

    	var layerConfig  = [];
    
        // Get layers and sublayers.
        // TODO: clean up
    	var offset = layerConfig.length;
        var index = 0;
        this.getRootNode().childNodes.forEach(function(node, i) {
            index = offset + i;
            layerConfig[index] = this.nodeToLayerConfig(node, data);
            
            node.childNodes.forEach(function(subnode) {
                if(layerConfig[index].layers) {
                    layerConfig[index].name = subnode.parentNode.get('name');
                    layerConfig[index].layers.push(this.nodeToLayerConfig(subnode));
                }
            }, this);
        }, this);
        return layerConfig;
    },

    /**
    * Before append to store
    * @param {Ext.data.Model} node
    * @param {Ext.data.Model} appendNode
    */
    onBeforeAppend: function(node, appendNode) {
        // Prevent groups from being added to groups
        if(node && !node.isRoot() && !appendNode.isLeaf()) {
            return false;
        }
        return true;
    },

    /**
    * Before insert to store
    * @param {Ext.data.Store} store
    * @param {Ext.data.Model} node
    * @param {Ext.data.Model} refNode
    */
    onBeforeInsert: function(store, node, refNode) {
        // Prevent groups from being added to groups
        if(!refNode.parentNode.isRoot() && !node.isLeaf()) {
            return false;
        }
        return true;
    },

    /**
     * Handler for a store's insert and append event.
     *
     * @param {Ext.data.Model} node
     */
    onInsertAndAppend: function(node) {
        if(!this._inserting) {
            this._inserting = true;
            
            // Add this node layers and subnodes to map. 
            node.cascadeBy(function(subnode) {

                // If this node is a GeoExt layer, then the raw model is an OpenLayers layer
                if(subnode.raw && subnode.raw.CLASS_NAME && subnode.raw.CLASS_NAME.indexOf('OpenLayers.Layer') > -1) {
                    // Store a reference to the OpenLayers layer.
                    subnode.set('layer',subnode.raw);

                    // Insert WMS params
                    if(subnode.raw.CLASS_NAME.indexOf('OpenLayers.Layer.WMS') > -1) {
                        subnode.set('wms',{
                            url: subnode.raw.url,
                            params: subnode.raw.params,
                            options: {
                                isBaseLayer: false,
                                visibility: false
                            }
                        });
                        subnode.set('checked', false);
                        if(subnode.raw.options && subnode.raw.options.metadata && subnode.raw.options.metadata.metadataURLs && subnode.raw.options.metadata.metadataURLs.length > 0) {
                            subnode.set('metadataUrl', subnode.raw.options.metadata.metadataURLs[0].href);
                        }
                    }
                }

                var layer = subnode.get('layer');

                // Add getLayer function to support GeoExt
                subnode.getLayer = function() {
                    return this.get('layer');
                };
                // Add WMS legened 
                this.addWMSLegend(subnode);

                // If store is connected to a map, add layer to map
                if(layer && layer !== '' && this.map) {
                    var mapLayer = this.map.getLayer(layer);
                    if(mapLayer === null && layer && layer.displayInLayerSwitcher === true) {
                        this.map.addLayer(layer);
                    }
                }
            }, this);

            // Reorder layers on map
            this.reorderLayersOnMap();
    
            delete this._inserting;
        }
        
    },

    layerUpdate : function(){
         AdmClient.app.config.layers = this.getLayerConfiguration(null);
    },

    onUpdate: function(chkBox, opt, eOpts ) {
        if(!this._updating) {
            this._updating = true;

            var data = null
            if (chkBox && chkBox.data)
            	data = chkBox.data;
            AdmClient.app.config.layers = this.getLayerConfiguration(data);

            delete this._updating;
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
        me.un('beforeinsert', me.onBeforeInsert, me);
        me.un('beforeappend', me.onBeforeAppend, me);
        me.un('insert', me.onInsertAndAppend, me);
        me.un('append', me.onInsertAndAppend, me);
        me.un('remove', me.onRemove, me);
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
