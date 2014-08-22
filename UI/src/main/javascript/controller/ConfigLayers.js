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


/*
* A controller to handle layers, see layer store for more implementation specifics regarding
*/

Ext.define('AdmClient.controller.ConfigLayers', {
    extend : 'Ext.app.Controller',
    requires : ['AdmClient.view.mapconfiguration.layer.LayerPanel'],
    refs: [
        {
            ref: 'mapConfigLayerTree',
            selector: '#mapConfigLayerTree'
        },
        {
            ref: 'mapConfigWMSLayerTree',
            selector: '#mapConfigWMSLayerTree'
        },
        {
            ref: 'layerServiceSelector',
            selector: '#layerServiceSelector'
        }
    ],
    views: ['mapconfiguration.layer.LayerPanel'],
    
    init : function() {
        this.control({
            '#mapConfigLayerTree': {
                checkchange: this.onNodeCheckChange
            },
            '#layerServiceSelector' : {
                keyup : this.onWMSServiceKeyup,
                render: function(field) {
                    // Intial select
                    this.loadWMSCapabilities(field.getValue());
                }
            },
            '#newGroupLayer' :{
                click: this.onNewGrouplayer,
                scope: this
            },
            'checkcolumn' : {
            	checkchange : this.onBaseLayer
            }
        });

        this.application.on({
            configuration_change: this.updateLayerTree,
            scope: this
        });

        
    },

    onNewGrouplayer : function(){
        var self = this;
        Ext.Msg.prompt('Name', 'Nytt grupplagernamn:', function(btn, text){
            if (btn == 'ok'){
                var tree = self.getMapConfigLayerTree();
                var root = tree.getRootNode();
                root.appendChild({
                    name : text
                });
            }
        });
    },
    
    onBaseLayer : function(chkBox, rowIndex, checked, eOpts){
    	var layerTree = this.getMapConfigLayerTree();
    	layerTree.store.save();
    },

    onWMSServiceKeyup: function(combo, e, eOpts) {
        if(e.getKey() === e.ENTER) {
            this.loadWMSCapabilities(combo.getValue());
        }

    },

    onNodeCheckChange: function(node, rowIndex, checked, eOpts ) {
        if(node.data.wms) {
            node.data.wms.visibility = checked;
        }
    },

    loadWSLayers: function(url) {
         if(url) {
            this.getMapConfigWMSLayerTree().setLoading(true);
            var wmsCapabilitiesStore = this.getMapConfigWMSLayerTree().getStore();
            Ext.Ajax.request({
                url: url,
                success: function(response) {
                    if(response && response.responseText) {
                        var json = Ext.decode(response.responseText);
                        // Load nodes into the tree store.
                        wmsCapabilitiesStore.setRootNode({ 
                            root: true, 
                            expanded: true, 
                            name: 'Lager', 
                            layers: this.parseLayerTree(json).map(function(layer) {
                                // Ugly solution to support the stores, GeoExt.data.WmsCapabilitiesLayerModel
                                layer.metadata = layer;
                                return layer;
                            })
                        });
                    } else {
                        // !TODO Throw error
                    }
                    this.getMapConfigWMSLayerTree().setLoading(false);
                },
                failure: function() {
                    // !TODO Throw error
                    this.getMapConfigWMSLayerTree().setLoading(false);
                },
                scope: this
            });
        }
    },

    loadWMSCapabilities: function(url) {
        if(url) {
            this.getMapConfigWMSLayerTree().setLoading(true);
            var wmsCapabilitiesStore = this.getMapConfigWMSLayerTree().getStore();
            
            // Load data into a plain GeoExt Capablities store.
            var geoExtWMSStore = Ext.create("GeoExt.data.WmsCapabilitiesLayerStore", {
                url: url
            });

            geoExtWMSStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(records && records.length > 0) {
                        // Make sure that records in the store is leafs and remove GeoExts defaulted checkcolumn
                        records.forEach(function(record) {
                            record.data.leaf = true;
                            record.data.checked = null;
                        });
                        // Load nodes into the tree store.
                        wmsCapabilitiesStore.setRootNode({ root: true, expanded: true, name: 'Lager', layers: records });
                        this.getMapConfigWMSLayerTree().setLoading(false);
                    } else {
                        // !TODO Throw error
                    }
                }
            });
        } else {
            // !TODO Throw error
        }
    },

    updateLayerTree: function(config) {
        if(config.layers && config.layers.length > 0) {
            // Update layer tree with new layers
            var layerTree = this.getMapConfigLayerTree();
            layerTree.getStore().setRootNode({
                name: (config.name ? config.name : 'Lager'),
                expanded: true,
                layers: this.getLayerSwitcherLayers(this.parseLayerTree(config.layers))
            });
        }
    },

    isWMSLayer: function(layer) {
        return layer.wms ? true : false;
    },

    isOpenLayersLayer: function(layer) {
        if (layer.wms || layer.osm || layer.google || layer.bing) {
            return true;
        } else {
            return false;
        }
    },
    isBaseLayer: function(layer) {
        var options = this.getOptions(layer);
        if (options && options.isBaseLayer) {
            return true;
        } else {
            return false;
        }
    },
    getOptions: function(layer) {
        if (layer.wms) {
            return layer.wms.options;
        } else if (layer.osm) {
            return layer.osm.options;
        } else if (layer.google) {
            return layer.google.options;
        } else if (layer.bing) {
            return layer.bing.options;
        }
    },

    /**
    * Iterate over the layertree and create a ExtJS-tree structure
    */
    parseLayerTree: function(layers) {
        layers.forEach(this.iterateLayers, this);
        return layers;
    },

    /**
    * Get all layers and layer groups that should show up in the layer switcher
    */
    getLayerSwitcherLayers: function(layers) {
        return layers.filter(function(layer) { 
            return (layer.layers || this.isWMSLayer(layer)) ? true : false;
        }, this);
    },

    iterateLayers: function(layer) {
        // Is node checked?
        //layer.checked = layer.wms && layer.wms.options ? layer.wms.options.visibility : false;
        // Get url from Server and set to layer
        if(typeof layer.serverId !== 'undefined' && layer.serverId !== '') {
            var server = Ext.StoreManager.get('servers').getById(layer.serverId);
            if(server) {
                if(layer.wms && !layer.wms.url) {
                    var wmsService = '/wms';
                    if(layer.wms.gwc) {
                        wmsService = '/gwc/service/wms';
                    }
                    layer.wms.url = server.get('url') + wmsService;
                }

                if(layer.wfs && !layer.wfs.url) {
                    layer.wfs.url = server.get('url');
                }
            }
        }

        // Create and store a reference to OpenLayers layer for this node
        if(this.isOpenLayersLayer(layer)) {
            //layer.layer = this.createLayer(layer);
        }
        // Do the node have sublayers, iterate over them
        if(layer.layers) {
            // Expand all groups
            layer.expanded = true;
            layer.layers.forEach(arguments.callee, this);
        } else {
            // If no sublayers, this is a leaf
            layer.leaf = true;
        }
    }
});