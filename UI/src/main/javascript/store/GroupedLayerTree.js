/**
 * Grouped layer tree store
 * Ext.data.TreeStore extended to support OpenEMap layer configuration including layer groups
 */

Ext.define('AdmClient.store.GroupedLayerTree' ,{
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.XmlStore',
        'GeoExt.container.WmsLegend',
        'GeoExt.data.WfsCapabilitiesLayerStore',
        'GeoExt.data.WmsCapabilitiesLayerStore',
        'AdmClient.model.Layer',
        'AdmClient.store.LayerDetails'
    ],
    id: 'configurationTreeStore',

    model: 'AdmClient.model.Layer',
    defaultRootProperty: 'layers',

    proxy: {
        type: 'memory'
    },

    maxLayerIndex: 1000,

    listeners: {
        beforeinsert: function(store, node, refNode, eOpts) { return this.onBeforeInsert(store, node, refNode); },
        beforeappend: function(store, node, eOpts) { return this.onBeforeAppend(store, node); },
        insert: function(store, node, refNode, eOpts) { this.onInsert(node); },
        append: function(store, node, index, eOpts) { this.onAppend(node); },// this.onInsertAndAppend(node); },
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
        } else if(typeof node.data[attribute] !== 'undefined') {
            attr = node.data[attribute];
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
        var attributeList = ['name','wms','wfs','metadataUrl', 'isGroupLayer', 'queryable', 'clickable'];
        var layer = {};

        if(node.hasChildNodes()) {
            layer.layers = [];
            return layer;
        }
        
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
            node.set('wms', layer.wms);
            
            var queryable = this.tryToGetRecordAttribute(node, 'queryable');
            var clickable = this.tryToGetRecordAttribute(node, 'clickable');
            var isWmsInfo = this.tryToGetRecordAttribute(node, 'isWmsInfo');
            if ((queryable && clickable) || (clickable && this._updating)){
            	//OK rebuild logic here to determine of there is WFS get Feature, or WMSGetFeatureInfo
            	var layerPieces = layer.wms.params.LAYERS.split(':');
            	
                if (!isWmsInfo){
                    layer.wfs = {};
                    layer.wfs.featurePrefix = layerPieces[0];
                    layer.wfs.featureType = layerPieces[1];
                    layer.wfs.url = wfsServer;
                    node.set('wfs', layer.wfs);
                }else{
                    node.set('description', 'Added by OpeEMap Admin');
                }
                
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
                    layerConfig[index].isGroupLayer = subnode.parentNode.get('isGroupLayer');
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
    
    onInsert: function(node) {
    	//console.log(node);
        this.newNodeUpdate(node.data);
    },
    
    onAppend: function(node) {
    	this.newNodeUpdate(node.data);
    },

    /**
     * Handler for a store's insert and append event.
     *
     * @param {Ext.data.Model} node
     */
    
    //this function is obselete??
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

    newNodeUpdate: function(data){
        this.data = data;
        if (!data.wfs){ // new layer
                    // first check for wfs then wms
            var wfsUrl = 'adminproxy?url=' + wfsServer + '?service=wfs&request=DescribeFeatureType&version=1.0.0&typeName=' + data.name || data.wms.params.LAYERS;
            var localWfsStore = Ext.create('AdmClient.store.LayerDetails');
            localWfsStore.setUrl(wfsUrl);
            localWfsStore.load({
                scope: this,
                callback: function(records, operation, success) {
            	if (records.length === 0){ // Not wfs then wms
                    var layerName = data.name;
                    var wmsStore = Ext.create('GeoExt.data.WmsCapabilitiesLayerStore',{
                        url: wmsGetCapabilities
                    });

                    if (records.length === 0){

                        wmsStore.load({
                            scope: this,
                            callback: function(records, operation, success) {
                            
                            if(records && records.length > 0) {
                            
                                //var args = this;
                                records.forEach(function(record) {
                                    
                                    var layerName = this.data.name;
                                    var currentLayerName = record.get('name');
                                    if (layerName === currentLayerName){
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
                                                
                                                    
                                                    
                                                    if (this.data.metadata === '' || !this.data.metadata){
                                                        this.data.metadata = {};
                                                        this.data.metadata.attributes = {};
                                                    }
                                                    for (var attribute in feature[0].attributes){
                                                        var item = [attribute, '', false];
                                                        this.data.metadata.attributes[attribute] = {
                                                            "alias" : attribute
                                                        };
                                                    }
                                                    this.data.clickable = true; 
                                                    this.data.isWmsInfo = true;
                                                    AdmClient.app.config.layers = this.getLayerConfiguration(this.data);
                                                }
                                            });
                                        }
                                    }
                                }, this);
                            }
                            } // callback
                        }); // load wms
                    }
                } else{ // it is wfs
                    records.forEach(function(a){
                        if (this.data.metadata === '' || !this.data.metadata){
                            this.data.metadata = {};
                            this.data.metadata.attributes = {};
                        }
                        this.data.metadata.attributes[a.data.name] = {
                            "alias" : a.data.name
                        };
                    }, this);
                    this.data.clickable = true;
                    this.data.isWmsInfo = false;
                    AdmClient.app.config.layers = this.getLayerConfiguration(this.data);
                }
                }
            });
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

            if (data && data.clickable){
                //determine wfs or wms
            	this.newNodeUpdate(data);
                //check if wms or wfs already in configuration


            }else if (data && !data.clickable){
                delete data.wfs;
                delete data.metadata;
                data.clickable = false;
                var s = Ext.getStore('configurationTreeStore');
                AdmClient.app.config.layers = s.getLayerConfiguration(data);
            }
            else{
                AdmClient.app.config.layers = this.getLayerConfiguration(data);
            }
        }
        this._updating = false;
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
            //AdmClient.app.config.layers = this.getLayerConfiguration();

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
