/**
 * Initializes GUI from configuration
 */
Ext.define('MapClient.Gui', {
    activeAction: null,
                                            
                                            
                                                
    constructor : function(config) {
        this.config = config.config;
        this.gui = config.gui;
        this.map = config.map;
        
        // GUI defaults
        if (this.gui === undefined) {
            this.gui = {
                "map": false,
                "toolbar": {},
                "zoomTools":  {},
                "baseLayers": {},
                "layers": {},
                "searchFastighet": {},
                "objectConfig": {},
                "searchCoordinate": false
            };
        }
        
        this.mapPanel = Ext.create('MapClient.view.Map', {
            map: this.map,
            extent: this.config.extent,
            config: this.config
        });
                
        this.createPanels();
        this.createToolbar();
        
        var items = [];
        items.push(this.mapPanel);
        if (this.zoomTools) items.push(this.zoomTools);
        if (this.leftPanel) items.push(this.leftPanel);
        if (this.rightPanel) items.push(this.rightPanel);
        if (this.baseLayers) items.push(this.baseLayers);
        
        // create map rendered to a target element or as viewport depending on config
        if (this.gui.map) {
            var element = this.gui.map.renderTo ? Ext.get(this.gui.map.renderTo) : undefined;
            this.container = Ext.create('Ext.container.Container', Ext.apply({
                layout : 'absolute',
                border: false,
                width: element ? element.getWidth() : undefined,
                height: element ? element.getHeight() : undefined,
                items : items
            }, this.gui.map));
        } else {
            this.container = Ext.create('Ext.container.Viewport', {
                layout : 'absolute',
                items : items
            });
        }
        
        // TODO: defer until rendered...
        /*if (this.config.attribution) {
            var el = this.mapPanel.getEl();
            Ext.DomHelper.append(el, '<span class="unselectable attribution">'+this.config.attribution+'</span>');
        }*/
    },
    destroy: function() {
        if (this.mapPanel) this.mapPanel.destroy();
        if (this.zoomTools) this.zoomTools.destroy();
        if (this.mapLayers) this.mapLayers.destroy();
        if (this.searchFastighet) this.searchFastighet.destroy();
        if (this.searchCoordinate) this.searchCoordinate.destroy();
        if (this.toolbar) this.toolbar.destroy();
        if (this.leftPanel) this.leftPanel.destroy();
        if (this.rightPanel) this.rightPanel.destroy();
        if (this.baseLayers) this.baseLayers.destroy();
        if (this.objectConfig) this.objectConfig.destroy();
        if (this.objectConfigWindow) this.objectConfigWindow.destroy();
        if (this.container) this.container.destroy();
    },
    onToggle: function(button, pressed) {
        var action = button.baseAction;
        
        if (!this.objectConfig) return;
        
        // NOTE: want the effect of unselecting all and hiding object dialog on detoggle, but that is triggered after toggle... so this will have to do
        if (pressed) {
            this.mapPanel.unselectAll();
            this.objectConfig.hide();
            this.activeAction = action;
        }
        
        action.toggle(pressed);
    },
    createToolbar: function() {
        var basePath = this.config.basePath;
        var layers = this.config.layers;
        
        var createAction = function(type) {
            var cls;
            
            if (type === this.config.tools[this.config.tools.length-1]) cls = 'oep-tools-last';
            
            var config = {
                map: this.map,
                mapPanel: this.mapPanel,
                cls: cls
            };
            
            if (type.constructor === Object) {
                Ext.apply(config, type);
                type = config.type;
                delete config.type;
            }

            if (type == 'ZoomSelector') {
                return Ext.create('MapClient.form.ZoomSelector', {map: this.map});
            }
            else {
                if (type == 'DrawObject') {
                    config.objectConfigView = this.objectConfig;
                } else if (type == 'Identify') {
                    config.basePath = basePath;
                    config.layers = layers;
                }
                var action = Ext.create('MapClient.action.' + type, config);
                if (config.activate && action.control) {
                    this.controlToActivate = action.control;
                }
                var button = Ext.create('Ext.button.Button', action);
                button.on('toggle', this.onToggle, this);
                return button;
            }
        };
        
        if (!this.config.tools) {
            this.config.tools = [];
        }
        
        // TODO: need to apply cls: 'oep-tools-last' to last item...
        var tbar = this.config.tools.map(createAction, this);
        
        // calc width of toolbar
        var width = 6; // padding
        tbar.forEach(function(item) {
            if (item){
                if (item.constructor == String) {
                    width += 1; // separator
                } else if (item.width) {
                    width += item.width;
                } else {
                    width += 24; // button
                }
                // add spacing to next control
                width += 8;
            }
        });
        width += 3; // padding
                
        // create toolbar as floating left panel if no renderTo target is configured
        if (this.gui.toolbar && !this.gui.toolbar.renderTo) {
            this.leftPanel = Ext.create('Ext.toolbar.Toolbar', Ext.apply({
                cls: 'oep-tools',
                y : 20,
                x : 80,
                width: width,
                items: tbar
            }, this.gui.toolbar));
        } else if (this.gui.toolbar && this.gui.toolbar.renderTo) {
            this.toolbar = Ext.create('Ext.toolbar.Toolbar', Ext.apply({
                cls: 'oep-tools',
                width : this.gui.toolbar.width || width,
                items: tbar
            }, this.gui.toolbar));
        }
    },
    createPanels: function(items) {
        
        if (this.gui.layers instanceof Ext.Container) {
            this.mapLayers = this.gui.layers;
        } else {
            this.mapLayers = Ext.create('MapClient.view.Layers', Ext.apply({
                mapPanel : this.mapPanel
            }, this.gui.layers));
        }
        
        this.searchFastighet = Ext.create('MapClient.view.SearchFastighet', Ext.apply({
            mapPanel : this.mapPanel,
            basePath: this.config.basePath
        }, this.gui.searchFastighet));
        
        // NOTE: only create right panel if layers panel isn't rendered
        // create right panel containing layers and search panels if no renderTo target is configured
        if (this.gui.layers && !this.gui.layers.renderTo) {
            
            var rightPanelItems = [this.mapLayers];
            
            if (this.gui.searchFastighet && !this.gui.searchFastighet.renderTo) {
                rightPanelItems.push(this.searchFastighet);
            }
            
            this.rightPanel = Ext.create('Ext.panel.Panel', {
                y : 20,
                layout : {
                    type: 'vbox',
                    align : 'stretch',
                    pack  : 'start'
                },
                width : 300,
                border: false,
                style : {
                    'right' : '20px'
                },
                bodyStyle: {
                    background: 'transparent'
                },
                items : rightPanelItems
            });
        }
        
        // TODO: only create if config has baselayers
        if (!this.map.allOverlays && this.gui.baseLayers) {
            this.baseLayers = Ext.create("MapClient.view.BaseLayers", Ext.apply({
                mapPanel : this.mapPanel,
                y: 20,
                style: {
                    'right' : '45%'
                },
                width: 115
            }, this.gui.baseLayers));
        }
        
        if (this.gui.zoomTools && !this.gui.zoomTools.renderTo) {
            this.zoomTools = Ext.create('MapClient.view.ZoomTools', Ext.apply({
                mapPanel : this.mapPanel,
                x: 20,
                y: 20,
                width: 36
            }, this.gui.zoomTools));
        }
                
        // only create if renderTo
        if (this.gui.searchCoordinate && this.gui.searchCoordinate.renderTo) {
            this.searchCoordinate = Ext.create('MapClient.view.SearchCoordinate', Ext.apply({
                mapPanel : this.mapPanel
            }, this.gui.searchCoordinate));
        }
        
        // only create if renderTo
        if (this.gui.objectConfig && this.gui.objectConfig.renderTo) {
            this.objectConfig = Ext.create('MapClient.view.ObjectConfig', Ext.apply({
                mapPanel : this.mapPanel,
                gui: this
            }, this.gui.objectConfig));
        } else if (this.gui.objectConfig) {
            this.objectConfig = Ext.create('MapClient.view.ObjectConfig', Ext.apply({
                mapPanel : this.mapPanel,
                gui: this
            }, this.gui.objectConfig));
            this.objectConfigWindow = Ext.create('Ext.window.Window', Ext.apply({
                title: 'Object configuration',
                width: 480,
                height: 260,
                layout: 'fit',
                closable: false,
                items: this.objectConfig
            }, this.gui.objectConfig));
            this.objectConfigWindow.show();
        }
    }
});
/**
 * Form field based on combobox to select zoom level
 */
Ext.define('MapClient.form.ZoomSelector' ,{
    extend:  Ext.form.ComboBox ,
    emptyText: "Zoom Level",
    listConfig: {
        getInnerTpl: function() {
            return "1: {scale:round(0)}";
        }
    },
    width: 120,
    editable: false,
    triggerAction: 'all',
    queryMode: 'local',
    initComponent: function() {
        this.store = Ext.create("GeoExt.data.ScaleStore", {map: this.map});
        this.listeners = {
            select: {
                fn:function(combo, record, index) {
                    this.map.zoomTo(record[0].get("level"));
                },
                scope:this
            }
        };
        this.map.events.register('zoomend', this, function() {
            var scale = this.store.queryBy(function(record){
                return this.map.getZoom() == record.data.level;
            });

            if (scale.length > 0) {
                scale = scale.items[0];
                this.setValue("1 : " + parseInt(scale.data.scale));
            } else {
                if (!zoomSelector.rendered) return;
                this.clearValue();
            }
        });
        this.callParent(arguments);
    }
});

        
/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/Handler/Drag.js
 * @requires OpenLayers/Handler/Keyboard.js
 */

// NOTE: Overriding OpenLayers.Control.ModifyFeature with code from https://github.com/openlayers/openlayers/pull/1145.
// This override should be removed when possible.

// need this empty Ext JS class definition to make Ext JS class loader happy
Ext.define('MapClient.OpenLayers.Control.ModifyFeature', {

});

/**
 * Class: OpenLayers.Control.ModifyFeature
 * Control to modify features.  When activated, a click renders the vertices
 *     of a feature - these vertices can then be dragged.  By default, the
 *     delete key will delete the vertex under the mouse.  New features are
 *     added by dragging "virtual vertices" between vertices.  Create a new
 *     control with the <OpenLayers.Control.ModifyFeature> constructor.
 *
 * Inherits From:
 *  - <OpenLayers.Control>
 */
OpenLayers.Control.ModifyFeature = OpenLayers.Class(OpenLayers.Control, {

    /**
     * APIProperty: bySegment
     * {Boolean} If set to true, one segment at a time will be editable (the
     *     one under the mouse cursor on hover). This supports editing much
     *     larger geometries. This requires the rbush library
     *     (https://github.com/mourner/rbush) for spatial indexing. Default is
     *     false.
     */
    bySegment: false,

    /**
     * APIProperty: documentDrag
     * {Boolean} If set to true, dragging vertices will continue even if the
     *     mouse cursor leaves the map viewport. Default is false.
     */
    documentDrag: false,

    /**
     * APIProperty: geometryTypes
     * {Array(String)} To restrict modification to a limited set of geometry
     *     types, send a list of strings corresponding to the geometry class
     *     names.
     */
    geometryTypes: null,

    /**
     * APIProperty: clickout
     * {Boolean} Unselect features when clicking outside any feature.
     *     Default is true.
     */
    clickout: true,

    /**
     * APIProperty: toggle
     * {Boolean} Unselect a selected feature on click.
     *      Default is true.
     */
    toggle: true,

    /**
     * APIProperty: standalone
     * {Boolean} Set to true to create a control without SelectFeature
     *     capabilities. Default is false.  If standalone is true, to modify
     *     a feature, call the <selectFeature> method with the target feature.
     *     Note that you must call the <unselectFeature> method to finish
     *     feature modification in standalone mode (before starting to modify
     *     another feature).
     */
    standalone: false,

    /**
     * Property: layer
     * {<OpenLayers.Layer.Vector>}
     */
    layer: null,

    /**
     * Property: feature
     * {<OpenLayers.Feature.Vector>} Feature currently available for modification.
     */
    feature: null,

    /**
     * Property: vertex
     * {<OpenLayers.Feature.Vector>} Vertex currently being modified.
     */
    vertex: null,

    /**
     * Property: vertices
     * {Array(<OpenLayers.Feature.Vector>)} Verticies currently available
     *     for dragging.
     */
    vertices: null,

    /**
     * Property: virtualVertices
     * {Array(<OpenLayers.Feature.Vector>)} Virtual vertices in the middle
     *     of each edge.
     */
    virtualVertices: null,

    /**
     * Property: handlers
     * {Object}
     */
    handlers: null,

    /**
     * APIProperty: deleteCodes
     * {Array(Integer)} Keycodes for deleting verticies.  Set to null to disable
     *     vertex deltion by keypress.  If non-null, keypresses with codes
     *     in this array will delete vertices under the mouse. Default
     *     is 46 and 68, the 'delete' and lowercase 'd' keys.
     */
    deleteCodes: null,

    /**
     * APIProperty: virtualStyle
     * {Object} A symbolizer to be used for virtual vertices.
     */
    virtualStyle: null,
    
    /**
     * APIProperty: dragHandleStyle
     * {Object} A symbolizer to be used for drag handles.
     */
    dragHandleStyle: null,
    
    /**
     * APIProperty: dragHandleStyle
     * {Object} A symbolizer to be used for radius handles.
     */
    radiusHandleStyle: null,

    /**
     * APIProperty: vertexRenderIntent
     * {String} The renderIntent to use for vertices. If no <virtualStyle> is
     * provided, this renderIntent will also be used for virtual vertices, with
     * a fillOpacity and strokeOpacity of 0.3. Default is null, which means
     * that the layer's default style will be used for vertices.
     */
    vertexRenderIntent: null,

    /**
     * APIProperty: mode
     * {Integer} Bitfields specifying the modification mode. Defaults to
     *      OpenLayers.Control.ModifyFeature.RESHAPE. To set the mode to a
     *      combination of options, use the | operator. For example, to allow
     *      the control to both resize and rotate features, use the following
     *      syntax
     * (code)
     * control.mode = OpenLayers.Control.ModifyFeature.RESIZE |
     *                OpenLayers.Control.ModifyFeature.ROTATE;
     *  (end)
     */
    mode: null,

    /**
     * APIProperty: createVertices
     * {Boolean} Create new vertices by dragging the virtual vertices
     *     in the middle of each edge. Default is true.
     */
    createVertices: true,

    /**
     * Property: modified
     * {Boolean} The currently selected feature has been modified.
     */
    modified: false,

    /**
     * Property: radiusHandle
     * {<OpenLayers.Feature.Vector>} A handle for rotating/resizing a feature.
     */
    radiusHandle: null,

    /**
     * Property: dragHandle
     * {<OpenLayers.Feature.Vector>} A handle for dragging a feature.
     */
    dragHandle: null,

    /**
     * APIProperty: onModificationStart 
     * {Function} *Deprecated*.  Register for "beforefeaturemodified" instead.
     *     The "beforefeaturemodified" event is triggered on the layer before
     *     any modification begins.
     *
     * Optional function to be called when a feature is selected
     *     to be modified. The function should expect to be called with a
     *     feature.  This could be used for example to allow to lock the
     *     feature on server-side.
     */
    onModificationStart: function() {},

    /**
     * APIProperty: onModification
     * {Function} *Deprecated*.  Register for "featuremodified" instead.
     *     The "featuremodified" event is triggered on the layer with each
     *     feature modification.
     *
     * Optional function to be called when a feature has been
     *     modified.  The function should expect to be called with a feature.
     */
    onModification: function() {},

    /**
     * APIProperty: onModificationEnd
     * {Function} *Deprecated*.  Register for "afterfeaturemodified" instead.
     *     The "afterfeaturemodified" event is triggered on the layer after
     *     a feature has been modified.
     *
     * Optional function to be called when a feature is finished 
     *     being modified.  The function should expect to be called with a
     *     feature.
     */
    onModificationEnd: function() {},

    /**
     * Constructor: OpenLayers.Control.ModifyFeature
     * Create a new modify feature control.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>} Layer that contains features that
     *     will be modified.
     * options - {Object} Optional object whose properties will be set on the
     *     control.
     */
    initialize: function(layer, options) {
        options = options || {};
        this.layer = layer;
        this.vertices = [];
        this.virtualVertices = [];
        this.virtualStyle = OpenLayers.Util.extend({},
            this.layer.style ||
            this.layer.styleMap.createSymbolizer(null, options.vertexRenderIntent)
        );
        this.virtualStyle.fillOpacity = 0.3;
        this.virtualStyle.strokeOpacity = 0.3;
        this.deleteCodes = [46, 68];
        this.mode = OpenLayers.Control.ModifyFeature.RESHAPE;
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        if(!(OpenLayers.Util.isArray(this.deleteCodes))) {
            this.deleteCodes = [this.deleteCodes];
        }
        
        // configure the drag handler
        var dragCallbacks = {
            down: function(pixel) {
                this.vertex = null;
                var feature = this.layer.getFeatureFromEvent(
                        this.handlers.drag.evt);
                if (feature) {
                    this.dragStart(feature);
                } else if (this.clickout) {
                    this._unselect = this.feature;
                }
            },
            move: function(pixel) {
                delete this._unselect;
                if (this.vertex) {
                    this.dragVertex(this.vertex, pixel);
                }
            },
            up: function() {
                this.handlers.drag.stopDown = false;
                if (this._unselect) {
                    this.unselectFeature(this._unselect);
                    delete this._unselect;
                }
            },
            done: function(pixel) {
                if (this.vertex) {
                    this.dragComplete(this.vertex);
                }
            }
        };
        var _self = this;
        var dragOptions = {
            documentDrag: this.documentDrag,
            setEvent: function(evt) {
                var feature = _self.feature;
                _self._lastVertex = feature ?
                                  feature.layer.getFeatureFromEvent(evt) : null;
                OpenLayers.Handler.Drag.prototype.setEvent.apply(
                                                               this, arguments);
            },
            stopDown: false
        };

        // configure the keyboard handler
        var keyboardOptions = {
            keydown: this.handleKeypress
        };
        this.handlers = {
            keyboard: new OpenLayers.Handler.Keyboard(this, keyboardOptions),
            drag: new OpenLayers.Handler.Drag(this, dragCallbacks, dragOptions)
        };

        if (this.bySegment) {
            if (!window.rbush) {
                throw new Error("The rbush library is required");
            }
            if (!OpenLayers.Control.ModifyFeature.BySegment) {
                throw new Error("OpenLayers.Control.ModifyFeature.BySegment is missing from the build");
            } else {
                OpenLayers.Util.extend(this, OpenLayers.Control.ModifyFeature.BySegment);
            }
        }
    },

    /**
     * Method: createVirtualVertex
     * Create a virtual vertex in the middle of the segment.
     *
     * Parameters:
     * point1 - {<OpenLayers.Geometry.Point>} First point of the segment.
     * point2 - {<OpenLayers.Geometry.Point>} Second point of the segment.
     *
     * Returns:
     * {<OpenLayers.Feature.Vector>} The virtual vertex created.
     */
    createVirtualVertex: function(point1, point2) {
        var x = (point1.x + point2.x) / 2;
        var y = (point1.y + point2.y) / 2;
        var point = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(x, y),
            null, this.virtualStyle
        );
        point._sketch = true;
        return point;
    },

    /**
     * APIMethod: destroy
     * Take care of things that are not handled in superclass.
     */
    destroy: function() {
        if (this.map) {
            this.map.events.un({
                "removelayer": this.handleMapEvents,
                "changelayer": this.handleMapEvents,
                scope: this
            });
        }
        this.layer = null;
        OpenLayers.Control.prototype.destroy.apply(this, []);
    },

    /**
     * APIMethod: activate
     * Activate the control.
     * 
     * Returns:
     * {Boolean} Successfully activated the control.
     */
    activate: function() {
        if (OpenLayers.Control.prototype.activate.apply(this, arguments)) {
            this.moveLayerToTop();
            this.map.events.on({
                "removelayer": this.handleMapEvents,
                "changelayer": this.handleMapEvents,
                scope: this
            });
            this._lastVertex = null;
            return this.handlers.keyboard.activate() &&
                    this.handlers.drag.activate();
        }
        return false;
    },

    /**
     * APIMethod: deactivate
     * Deactivate the control.
     *
     * Returns: 
     * {Boolean} Successfully deactivated the control.
     */
    deactivate: function() {
        var deactivated = false;
        // the return from the controls is unimportant in this case
        if(OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
            this.moveLayerBack();
            this.map.events.un({
                "removelayer": this.handleMapEvents,
                "changelayer": this.handleMapEvents,
                scope: this
            });
            this.layer.removeFeatures(this.vertices, {silent: true});
            this.layer.removeFeatures(this.virtualVertices, {silent: true});
            this.vertices = [];
            this.handlers.drag.deactivate();
            this.handlers.keyboard.deactivate();
            var feature = this.feature;
            if (feature && feature.geometry && feature.layer) {
                this.unselectFeature(feature);
            }
            deactivated = true;
        }
        return deactivated;
    },

    /**
     * Method: beforeSelectFeature
     * Called before a feature is selected.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} The feature about to be selected.
     */
    beforeSelectFeature: function(feature) {
        return this.layer.events.triggerEvent(
            "beforefeaturemodified", {feature: feature}
        );
    },

    /**
     * APIMethod: selectFeature
     * Select a feature for modification in standalone mode. In non-standalone
     * mode, this method is called when a feature is selected by clicking.
     * Register a listener to the beforefeaturemodified event and return false
     * to prevent feature modification.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} the selected feature.
     */
    selectFeature: function(feature) {
        if (this.feature === feature ||
           (this.geometryTypes && OpenLayers.Util.indexOf(this.geometryTypes,
           feature.geometry.CLASS_NAME) == -1)) {
            return;
        }
        if (this.beforeSelectFeature(feature) !== false) {
            if (this.feature) {
                this.unselectFeature(this.feature);
            }
            this.feature = feature;
            this.layer.selectedFeatures.push(feature);
            this.layer.drawFeature(feature, 'select');
            this.modified = false;
            this.resetVertices();
            this.onModificationStart(this.feature);
        }
        // keep track of geometry modifications
        var modified = feature.modified;
        if (feature.geometry && !(modified && modified.geometry)) {
            this._originalGeometry = feature.geometry.clone();
        }
    },

    /**
     * APIMethod: unselectFeature
     * Called when the select feature control unselects a feature.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} The unselected feature.
     */
    unselectFeature: function(feature) {
        this.layer.removeFeatures(this.vertices, {silent: true});
        this.vertices = [];
        this.layer.destroyFeatures(this.virtualVertices, {silent: true});
        this.virtualVertices = [];
        if(this.dragHandle) {
            this.layer.destroyFeatures([this.dragHandle], {silent: true});
            delete this.dragHandle;
        }
        if(this.radiusHandle) {
            this.layer.destroyFeatures([this.radiusHandle], {silent: true});
            delete this.radiusHandle;
        }
        this.layer.drawFeature(this.feature, 'default');
        this.feature = null;
        OpenLayers.Util.removeItem(this.layer.selectedFeatures, feature);
        this.onModificationEnd(feature);
        this.layer.events.triggerEvent("afterfeaturemodified", {
            feature: feature,
            modified: this.modified
        });
        this.modified = false;
    },
    
    
    /**
     * Method: dragStart
     * Called by the drag handler before a feature is dragged.  This method is
     *     used to differentiate between points and vertices
     *     of higher order geometries.
     *
     * Parameters:
     * feature - {<OpenLayers.Feature.Vector>} The point or vertex about to be
     *     dragged.
     */
    dragStart: function(feature) {
        var isPoint = feature.geometry.CLASS_NAME ==
                'OpenLayers.Geometry.Point';
        if (!this.standalone &&
                ((!feature._sketch && isPoint) || !feature._sketch)) {
            if (this.toggle && this.feature === feature) {
                // mark feature for unselection
                this._unselect = feature;
            }
            this.selectFeature(feature);
        }
        if (this.feature &&
                (feature._sketch || isPoint && feature === this.feature)) {
            // feature is a drag or virtual handle or point
            this.vertex = feature;
            this.handlers.drag.stopDown = true;
        }
    },

    /**
     * Method: dragVertex
     * Called by the drag handler with each drag move of a vertex.
     *
     * Parameters:
     * vertex - {<OpenLayers.Feature.Vector>} The vertex being dragged.
     * pixel - {<OpenLayers.Pixel>} Pixel location of the mouse event.
     */
    dragVertex: function(vertex, pixel) {
        var pos = this.map.getLonLatFromViewPortPx(pixel);
        var geom = vertex.geometry;
        geom.move(pos.lon - geom.x, pos.lat - geom.y);
        this.modified = true;
        /**
         * Five cases:
         * 1) dragging a simple point
         * 2) dragging a virtual vertex
         * 3) dragging a drag handle
         * 4) dragging a real vertex
         * 5) dragging a radius handle
         */
        if(this.feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
            // dragging a simple point
            this.layer.events.triggerEvent("vertexmodified", {
                vertex: vertex.geometry,
                feature: this.feature,
                pixel: pixel
            });
        } else {
            if(vertex._index) {
                if (vertex._index == -1) {
                    vertex._index = OpenLayers.Util.indexOf(vertex.geometry.parent.components, vertex._next);
                }
                // dragging a virtual vertex
                vertex.geometry.parent.addComponent(vertex.geometry,
                                                    vertex._index);
                // move from virtual to real vertex
                delete vertex._index;
                OpenLayers.Util.removeItem(this.virtualVertices, vertex);
                this.vertices.push(vertex);
            } else if(vertex == this.dragHandle) {
                // dragging a drag handle
                this.layer.removeFeatures(this.vertices, {silent: true});
                this.vertices = [];
                if(this.radiusHandle) {
                    this.layer.destroyFeatures([this.radiusHandle], {silent: true});
                    this.radiusHandle = null;
                }
            } else if(vertex !== this.radiusHandle) {
                // dragging a real vertex
                this.layer.events.triggerEvent("vertexmodified", {
                    vertex: vertex.geometry,
                    feature: this.feature,
                    pixel: pixel
                });
            }
            // dragging a radius handle - no special treatment
            if(this.virtualVertices.length > 0) {
                this.layer.destroyFeatures(this.virtualVertices, {silent: true});
                this.virtualVertices = [];
            }
            this.layer.drawFeature(this.feature, this.standalone ? undefined :
                                            'select');
        }
        // keep the vertex on top so it gets the mouseout after dragging
        // this should be removed in favor of an option to draw under or
        // maintain node z-index
        this.layer.drawFeature(vertex);
    },

    /**
     * Method: dragComplete
     * Called by the drag handler when the feature dragging is complete.
     *
     * Parameters:
     * vertex - {<OpenLayers.Feature.Vector>} The vertex being dragged.
     */
    dragComplete: function(vertex) {
        this.resetVertices();
        this.setFeatureState();
        this.onModification(this.feature);
        this.layer.events.triggerEvent("featuremodified", {feature: this.feature});
    },
    
    /**
     * Method: setFeatureState
     * Called when the feature is modified.  If the current state is not
     *     INSERT or DELETE, the state is set to UPDATE.
     */
    setFeatureState: function() {
        if(this.feature.state != OpenLayers.State.INSERT &&
           this.feature.state != OpenLayers.State.DELETE) {
            this.feature.state = OpenLayers.State.UPDATE;
            if (this.modified && this._originalGeometry) {
                var feature = this.feature;
                feature.modified = OpenLayers.Util.extend(feature.modified, {
                    geometry: this._originalGeometry
                });
                delete this._originalGeometry;
            }
        }
    },
    
    /**
     * Method: resetVertices
     */
    resetVertices: function() {
        if(this.vertices.length > 0) {
            this.layer.removeFeatures(this.vertices, {silent: true});
            this.vertices = [];
        }
        if(this.virtualVertices.length > 0) {
            this.layer.removeFeatures(this.virtualVertices, {silent: true});
            this.virtualVertices = [];
        }
        if(this.dragHandle) {
            this.layer.destroyFeatures([this.dragHandle], {silent: true});
            this.dragHandle = null;
        }
        if(this.radiusHandle) {
            this.layer.destroyFeatures([this.radiusHandle], {silent: true});
            this.radiusHandle = null;
        }
        if(this.feature &&
           this.feature.geometry.CLASS_NAME != "OpenLayers.Geometry.Point") {
            if((this.mode & OpenLayers.Control.ModifyFeature.DRAG)) {
                this.collectDragHandle();
            }
            if((this.mode & (OpenLayers.Control.ModifyFeature.ROTATE |
                             OpenLayers.Control.ModifyFeature.RESIZE))) {
                this.collectRadiusHandle();
            }
            if(this.mode & OpenLayers.Control.ModifyFeature.RESHAPE){
                // Don't collect vertices when we're resizing
                if (!(this.mode & OpenLayers.Control.ModifyFeature.RESIZE)){
                    this.collectVertices();
                }
            }
        }
    },
    
    /**
     * Method: handleKeypress
     * Called by the feature handler on keypress.  This is used to delete
     *     vertices. If the <deleteCode> property is set, vertices will
     *     be deleted when a feature is selected for modification and
     *     the mouse is over a vertex.
     *
     * Parameters:
     * evt - {Event} Keypress event.
     */
    handleKeypress: function(evt) {
        var code = evt.keyCode;
        
        // check for delete key
        if(this.feature &&
           OpenLayers.Util.indexOf(this.deleteCodes, code) != -1) {
            var vertex = this._lastVertex;
            if (vertex &&
                    OpenLayers.Util.indexOf(this.vertices, vertex) != -1 &&
                    !this.handlers.drag.dragging && vertex.geometry.parent) {
                // remove the vertex
                vertex.geometry.parent.removeComponent(vertex.geometry);
                this.layer.events.triggerEvent("vertexremoved", {
                    vertex: vertex.geometry,
                    feature: this.feature,
                    pixel: evt.xy
                });
                this.layer.drawFeature(this.feature, this.standalone ?
                                       undefined : 'select');
                this.modified = true;
                this.resetVertices();
                this.setFeatureState();
                this.onModification(this.feature);
                this.layer.events.triggerEvent("featuremodified",
                                               {feature: this.feature});
            }
        }
    },

    /**
     * Method: collectVertices
     * Collect the vertices from the modifiable feature's geometry and push
     *     them on to the control's vertices array.
     */
    collectVertices: function() {
        this.vertices = [];
        this.virtualVertices = [];
        var control = this;
        function collectComponentVertices(geometry) {
            var i, vertex, component, len;
            if(geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
                vertex = new OpenLayers.Feature.Vector(geometry);
                vertex._sketch = true;
                vertex.renderIntent = control.vertexRenderIntent;
                control.vertices.push(vertex);
            } else {
                var numVert = geometry.components.length;
                if(geometry.CLASS_NAME == "OpenLayers.Geometry.LinearRing") {
                    numVert -= 1;
                }
                for(i=0; i<numVert; ++i) {
                    component = geometry.components[i];
                    if(component.CLASS_NAME == "OpenLayers.Geometry.Point") {
                        vertex = new OpenLayers.Feature.Vector(component);
                        vertex._sketch = true;
                        vertex.renderIntent = control.vertexRenderIntent;
                        control.vertices.push(vertex);
                    } else {
                        collectComponentVertices(component);
                    }
                }
                
                // add virtual vertices in the middle of each edge
                if (control.createVertices && geometry.CLASS_NAME != "OpenLayers.Geometry.MultiPoint") {
                    for(i=0, len=geometry.components.length; i<len-1; ++i) {
                        var prevVertex = geometry.components[i];
                        var nextVertex = geometry.components[i + 1];
                        if(prevVertex.CLASS_NAME == "OpenLayers.Geometry.Point" &&
                           nextVertex.CLASS_NAME == "OpenLayers.Geometry.Point") {
                            var point = control.createVirtualVertex.call(control, prevVertex, nextVertex);
                            // set the virtual parent and intended index
                            point.geometry.parent = geometry;
                            point._index = i + 1;
                            control.virtualVertices.push(point);
                        }
                    }
                }
            }
        }
        collectComponentVertices.call(this, this.feature.geometry);
        this.layer.addFeatures(this.virtualVertices, {silent: true});
        this.layer.addFeatures(this.vertices, {silent: true});
    },

    /**
     * Method: collectDragHandle
     * Collect the drag handle for the selected geometry.
     */
    collectDragHandle: function() {
        var geometry = this.feature.geometry;
        var center = geometry.getBounds().getCenterLonLat();
        var originGeometry = new OpenLayers.Geometry.Point(
            center.lon, center.lat
        );
        var origin = new OpenLayers.Feature.Vector(originGeometry, null, this.dragHandleStyle);
        originGeometry.move = function(x, y) {
            OpenLayers.Geometry.Point.prototype.move.call(this, x, y);
            geometry.move(x, y);
        };
        origin._sketch = true;
        this.dragHandle = origin;
        this.dragHandle.renderIntent = this.vertexRenderIntent;
        this.layer.addFeatures([this.dragHandle], {silent: true});
    },

    /**
     * Method: collectRadiusHandle
     * Collect the radius handle for the selected geometry.
     */
    collectRadiusHandle: function() {
        var geometry = this.feature.geometry;
        var bounds = geometry.getBounds();
        var center = bounds.getCenterLonLat();
        var originGeometry = new OpenLayers.Geometry.Point(
            center.lon, center.lat
        );
        var radiusGeometry = new OpenLayers.Geometry.Point(
            bounds.right, bounds.bottom
        );
        var radius = new OpenLayers.Feature.Vector(radiusGeometry, null, this.radiusHandleStyle);
        var resize = (this.mode & OpenLayers.Control.ModifyFeature.RESIZE);
        var reshape = (this.mode & OpenLayers.Control.ModifyFeature.RESHAPE);
        var rotate = (this.mode & OpenLayers.Control.ModifyFeature.ROTATE);

        radiusGeometry.move = function(x, y) {
            OpenLayers.Geometry.Point.prototype.move.call(this, x, y);
            var dx1 = this.x - originGeometry.x;
            var dy1 = this.y - originGeometry.y;
            var dx0 = dx1 - x;
            var dy0 = dy1 - y;
            if(rotate) {
                var a0 = Math.atan2(dy0, dx0);
                var a1 = Math.atan2(dy1, dx1);
                var angle = a1 - a0;
                angle *= 180 / Math.PI;
                geometry.rotate(angle, originGeometry);
            }
            if(resize) {
                var scale, ratio;
                // 'resize' together with 'reshape' implies that the aspect 
                // ratio of the geometry will not be preserved whilst resizing 
                if (reshape) {
                    scale = dy1 / dy0;
                    ratio = (dx1 / dx0) / scale;
                } else {
                    var l0 = Math.sqrt((dx0 * dx0) + (dy0 * dy0));
                    var l1 = Math.sqrt((dx1 * dx1) + (dy1 * dy1));
                    scale = l1 / l0;
                }
                geometry.resize(scale, originGeometry, ratio);
            }
        };
        radius._sketch = true;
        this.radiusHandle = radius;
        this.radiusHandle.renderIntent = this.vertexRenderIntent;
        this.layer.addFeatures([this.radiusHandle], {silent: true});
    },

    /**
     * Method: setMap
     * Set the map property for the control and all handlers.
     *
     * Parameters:
     * map - {<OpenLayers.Map>} The control's map.
     */
    setMap: function(map) {
        this.handlers.drag.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },

    /**
     * Method: handleMapEvents
     * 
     * Parameters:
     * evt - {Object}
     */
    handleMapEvents: function(evt) {
        if (evt.type == "removelayer" || evt.property == "order") {
            this.moveLayerToTop();
        }
    },

    /**
     * Method: moveLayerToTop
     * Moves the layer for this handler to the top, so mouse events can reach
     * it.
     */
    moveLayerToTop: function() {
        var index = Math.max(this.map.Z_INDEX_BASE['Feature'] - 1,
            this.layer.getZIndex()) + 1;
        this.layer.setZIndex(index);
        
    },

    /**
     * Method: moveLayerBack
     * Moves the layer back to the position determined by the map's layers
     * array.
     */
    moveLayerBack: function() {
        var index = this.layer.getZIndex() - 1;
        if (index >= this.map.Z_INDEX_BASE['Feature']) {
            this.layer.setZIndex(index);
        } else {
            this.map.setLayerZIndex(this.layer,
                this.map.getLayerIndex(this.layer));
        }
    },

    CLASS_NAME: "OpenLayers.Control.ModifyFeature"
});

/**
 * Constant: RESHAPE
 * {Integer} Constant used to make the control work in reshape mode
 */
OpenLayers.Control.ModifyFeature.RESHAPE = 1;
/**
 * Constant: RESIZE
 * {Integer} Constant used to make the control work in resize mode
 */
OpenLayers.Control.ModifyFeature.RESIZE = 2;
/**
 * Constant: ROTATE
 * {Integer} Constant used to make the control work in rotate mode
 */
OpenLayers.Control.ModifyFeature.ROTATE = 4;
/**
 * Constant: DRAG
 * {Integer} Constant used to make the control work in drag mode
 */
OpenLayers.Control.ModifyFeature.DRAG = 8;
/**
 * MapClient application class
 *  
 * Typical use case is to call the method configure(config) where config is a valid configuration object (usually parsed from JSON).
 */
Ext.define('MapClient', {
                                         
                                                  
                               
                                             
                                                             
    version: '0.7.0-SNAPSHOT',
    /**
     * Base path to be used for all AJAX requests against search-lm REST API
     * 
     * @property {string}
     */
    basePath: '/search/lm/',
    /**
     * OpenLayers Map instance
     * 
     * @property {OpenLayers.Map}
     */
    map: null,
    /**
     * Overlay used by drawing actions
     * 
     * StyleMap can be overridden if more specific styling logic is required. 
     * 
     * Here is an example that changes style on scale:
     * 
     *     var style = new OpenLayers.Style();
     * 
     *     var ruleLow = new OpenLayers.Rule({
     *       symbolizer: {
     *         pointRadius: 10,
     *         fillColor: 'green',
     *         fillOpacity: 1
     *       },
     *       maxScaleDenominator: 10000
     *     });
     * 
     *     var ruleHigh = new OpenLayers.Rule({
     *       symbolizer: {
     *         pointRadius: 10,
     *         fillColor: 'red',
     *         fillOpacity: 1   
     *      },
     *      minScaleDenominator: 10000
     *     });
     * 
     *     style.addRules([ruleLow, ruleHigh]);
     * 
     *     var styleMap = new OpenLayers.StyleMap(style);
     *     mapClient.drawLayer.styleMap = styleMap;
     * 
     * See [OpenLayers documentation][1] on feature styling for more examples.
     * 
     * [1]: http://docs.openlayers.org/library/feature_styling.html
     * 
     * @property {OpenLayers.Layer.Vector}
     */
    drawLayer: null,
    /**
     * Clean up rendered elements
     */
    destroy: function() {
        if (this.gui) this.gui.destroy();
    },
    /**
     * Configure map
     * 
     * If this method is to be used multiple times, make sure to call destroy before calling it.
     * 
     * @param {Object} config Map configuration object
     * @param {Object} options Additional MapClient options
     * @param {Object} options.gui Options to control GUI elements. Each property in this object is
     * essentially a config object used to initialize an Ext JS component. If a property is undefined or false
     * that component will not be initialized except for the map component. If a property is a defined
     * but empty object the component will be rendered floating over the map. To place a component into a 
     * predefined html tag, use the config property renderTo.
     * @param {Object} options.gui.map If undefined or false MapClient will create the map in a full page viewport
     * @param {Object} options.gui.layers Map layers tree list
     * @param {Object} options.gui.baseLayers Base layer switcher intended to be used as a floating control
     * @param {Object} options.gui.searchCoordinate Simple coordinate search and pan control
     * @param {Object} options.gui.objectConfig A generic form to configure feature attributes similar to a PropertyList
     * @param {Object} options.gui.ZoomTools Zoom slider and buttons intended to be used as a floating control
     * @param {Object} options.gui.searchFastighet Search "fastighet" control
     * 
     * For more information about the possible config properties for Ext JS components see Ext.container.Container.
     */
    configure: function(config, options) {
        options = Ext.apply({}, options);
        
        this.initialConfig = Ext.clone(config);
        
        Ext.tip.QuickTipManager.init();
        
        // TODO: perhaps this is a bit ugly... but I need to pass basePath down to invididual components
        config.basePath = this.basePath;
        
        var parser = Ext.create('MapClient.config.Parser');
        
        this.map = parser.parse(config);
        this.gui = Ext.create('MapClient.Gui', {
            config: config,
            gui: options.gui,
            map: this.map
        });
        this.mapPanel = this.gui.mapPanel;
        this.drawLayer = this.gui.mapPanel.drawLayer;
        
        if (this.gui.controlToActivate) this.gui.controlToActivate.activate();
    },
    /**
     * Helper method to add GeoJSON directly to the draw layer
     * 
     * @param {string} geojson
     */
    addGeoJSON: function(geojson) {
        var format = new OpenLayers.Format.GeoJSON();
        var feature = format.read(geojson, "Feature");
        this.drawLayer.addFeatures([feature]);
    },
    /**
     * Allows you to override the sketch style at runtime
     * 
     * @param {OpenLayers.StyleMap} styleMap
     */
    setSketchStyleMap: function(styleMap) {
        this.map.controls.forEach(function(control) {
            if (control instanceof OpenLayers.Control.DrawFeature) {
                control.handler.layerOptions.styleMap = styleMap;
                if (control.handler.layer) {
                    control.handler.layer.styleMap = styleMap;
                }
            }
        });
    }
});

/**
 * Creates predefined objects
 */
Ext.define('MapClient.ObjectFactory', {

    toPoint: function(coord) {
        return new OpenLayers.Geometry.Point(coord[0], coord[1]);
    },
    
    createR: function(config) {
        var x = config.x;
        var y = config.y;
        var l = config.l;
        var w = config.w;
        var coords = [
            [x    , y],
            [x    , y - l],
            [x + w, y - l],
            [x + w, y]
        ];
        var linearRing = new OpenLayers.Geometry.LinearRing(coords.map(this.toPoint));
        var polygon = new OpenLayers.Geometry.Polygon([linearRing]);
        return polygon;
    },
    
    createL: function(config) {
        var x = config.x;
        var y = config.y;
        var l = config.l;
        var w = config.w;
        var m1 = config.m1;
        var m2 = config.m2;
        var coords = [
            [x     , y],
            [x     , y - w],
            [x + m1, y - w],
            [x + m1, y - m2],
            [x + l , y - m2],
            [x + l , y]
        ];
        var linearRing = new OpenLayers.Geometry.LinearRing(coords.map(this.toPoint));
        var polygon = new OpenLayers.Geometry.Polygon([linearRing]);
        return polygon;
    },
            
    createD: function(config) {
        var x = config.x;
        var y = config.y;
        var l = config.l;
        var w = config.w;
        var m1 = config.m1;
        var m2 = config.m2;
        
        var o = (l-m1)/2;
        var coords = [
            [x        , y],
            [x        , y - w + o],
            [x + o    , y - w],
            [x + l - o, y - w],
            [x + l    , y - w + o],
            [x + l    , y]
        ];
                    
        var linearRing = new OpenLayers.Geometry.LinearRing(coords.map(this.toPoint));
        var polygon = new OpenLayers.Geometry.Polygon([linearRing]);
        return polygon;
    },
    
    createO: function(config) {
        var x = config.x;
        var y = config.y;
        var l = config.l;
        var w = config.w;
        var m1 = config.m1;
        var m2 = config.m2;
        var r = ((m1/2)*(Math.sqrt((4+(2*Math.SQRT2)))));
        var origin = new OpenLayers.Geometry.Point(x + r, y - r);
        var polygon = OpenLayers.Geometry.Polygon.createRegularPolygon(origin, r, 8);
        return polygon;
    },
    
    // NOTE: monkey patch rotate and resize to write resulting attributes on
    // change
    figurHooks: function(feature) {
        var oldMove = feature.geometry.move;
        feature.geometry.move = function(x, y) {
            feature.attributes.config.x += x;
            feature.attributes.config.y += y;
            oldMove.apply(feature.geometry, arguments);
        };
        
        var oldRotate = feature.geometry.rotate;
        feature.geometry.rotate = function(angle, origin) {
            feature.attributes.config.angle += angle;
            // TODO: rotate will change point of origin causing jumps if object is recreated
            // TODO: tried to fix below but isn't correct...
            //var point = feature.geometry.components[0].components[0];
            //feature.attributes.config.x = point.x;
            //feature.attributes.config.y = point.y;
            oldRotate.apply(feature.geometry, arguments);
        };
        
        // NOTE: dynamic resizing isn't allowed
        /*var oldResize = feature.geometry.resize;
        feature.geometry.resize = function(scale, origin, ratio) {
            feature.attributes.scale += scale;
            feature.attributes.origin = origin;
            feature.attributes.ratio = ratio;
            oldResize.apply(feature.geometry, arguments);
        };*/
    },
    create: function(config, attributes, style) {
        var geometry;
        if (config.type=='R') {
            geometry = this.createR(config);
        } else if (config.type=='L')    {
            geometry = this.createL(config);
        } else if (config.type=='D') {
            geometry = this.createD(config);
        } else {
            geometry = this.createO(config);
        }
        var center = geometry.getCentroid();
        var originGeometry = new OpenLayers.Geometry.Point(center.x, center.y);
        geometry.rotate(config.angle, originGeometry);
        var feature = new OpenLayers.Feature.Vector(geometry, attributes, style);
        this.figurHooks(feature);
        feature.attributes.config = config;
        return feature;
    }
});
/**
 * TODO: needs to be implemented
 */
Ext.define('MapClient.Search', {
    constructor: function(config) {
        initConfig();
    },
    doSearch: function() {
        // TODO: generic search logic..?
    }
});

/**
 * Base class for adding common functionality upon GeoExt.Action
 */
Ext.define('MapClient.action.Action', {
    extend:  GeoExt.Action ,
    constructor: function(config) {
        var mapPanel = config.mapPanel;
        var map = mapPanel.map;
                
        if (config.minScale || config.maxScale) {
            if (!config.minScale) config.minScale = 0;
            if (!config.maxScale) config.maxScale = 99999999999999;
            
            var onZoomend = function() {
                if (map.getScale() >= config.maxScale ||
                    map.getScale() <= config.minScale) {
                    this.disable();
                } else {
                    this.enable();
                }
            };
            
            map.events.register('zoomend', this, onZoomend);
        }
        
        this.callParent(arguments);
    },
    /**
     * To be implemented by actions that need special logic on toggle
     * @abstract
     */
    toggle: function() {}
});

/**
 * Action to delete geometry
 * 
 * The snippet below is from configuration to MapClient.view.Map
 * 
 *      "tools" : [{
 *            "type": "DeleteGeometry",
 *            "tooltip": "Ta bort valt objekt/geometri"
 *        }]
 */
Ext.define('MapClient.action.DeleteGeometry', {
    extend:  MapClient.action.Action ,
    /**
     * @param config
     * @param {string} config.typeAttribute string to write to new feature attribute type
     */
    constructor: function(config) {
        var mapPanel = config.mapPanel;
        var layer = mapPanel.drawLayer;
        
        config.handler = function() {
            layer.destroyFeatures(layer.selectedFeatures);
        };
        
        config.iconCls = config.iconCls || 'action-deletegeometry';
        config.tooltip = config.tooltip || 'Delete geometry';
        
        this.callParent(arguments);
    }
});

/**
 * Action for draw geometry.
 * 
 * The snippet below is from configuration to MapClient.view.Map
 *
 *         "tools" : [{
 *           "type": "DrawGeometry",
 *           "geometry": "Path",
 *           "tooltip": "Markera väg",
 *           "attributes": {
 *               "type": "Väg"
 *               }
 *       }]
 *  
 * DrawGeometry can also be used to draw text features, since they are simply point features with an attribute to be labeled with styling.
 */
Ext.define('MapClient.action.DrawGeometry', {
    extend:  MapClient.action.Action ,
    /**
     * @param config
     * @param {string} config.typeAttribute string to write to new feature attribute type
     * @param {boolean} config.singleObject Set to true to clear layer before adding feature effectively restricing 
     */
    constructor: function(config) {
        var mapPanel = config.mapPanel;
        var layer = mapPanel.drawLayer;
        
        config.attributes = config.attributes || {};
        
        config.geometry = config.geometry || 'Polygon';
        
        var Control = OpenLayers.Class(OpenLayers.Control.DrawFeature, {
            // NOTE: override drawFeature to set custom attributes
            drawFeature: function(geometry) {
                var feature = new OpenLayers.Feature.Vector(geometry, config.attributes);
                var proceed = this.layer.events.triggerEvent(
                    "sketchcomplete", {feature: feature}
                );
                if(proceed !== false) {
                    feature.state = OpenLayers.State.INSERT;
                    this.layer.addFeatures([feature]);
                    this.featureAdded(feature);
                    this.events.triggerEvent("featureadded",{feature : feature});
                }
            }
        });
        
        config.control = new Control(layer, OpenLayers.Handler[config.geometry]);
                
        config.iconCls = config.iconCls || 'action-drawgeometry';
        config.tooltip = config.tooltip || 'Draw geometry';
        config.toggleGroup = 'extraTools';
        
        this.callParent(arguments);
    }
});

/**
 * 
 */
Ext.define('MapClient.view.ObjectConfig', {
    extend :  Ext.form.Panel ,
    statics: {
        config: {
            type: 'R',
            w: 100,
            l: 100,
            m1: 20,
            m2: 20,
            angle: 0
        }
    },
    fieldDefaults: {
        labelWidth: 60
    },
    autoHeight: true,
    width: 400,
    border: false,
    selectedFeature: undefined,
    layer: undefined,
    factory: undefined,
    hidden: true,
    defaults: {
        border: false
    },
    initComponent : function() {
        this.layer = this.mapPanel.drawLayer;
        this.factory = Ext.create('MapClient.ObjectFactory');
                        
        var types = {
            xtype : 'radiogroup',
            vertical : true,
            fieldLabel: 'Type',
            itemId: 'type',
            hidden: true,
            items : [ {
                boxLabel : '<img src="resources/css/images/figur-R.png">',
                name : 'rb',
                inputValue : 'R',
                checked : true
            }, {
                boxLabel : '<img src="resources/css/images/figur-L.png">',
                name : 'rb',
                enabled: false,
                inputValue : 'L'
            }, {
                boxLabel : '<img src="resources/css/images/figur-D.png">',
                name : 'rb',
                enabled: false,
                inputValue : 'D'
            }, {
                boxLabel : '<img src="resources/css/images/figur-O.png">',
                name : 'rb',
                enabled: false,
                inputValue : 'O'
            } ],
            listeners: {
                change: function(field, value) {
                    this.config.type = value.rb;
                    this.updateHelpImage(this.config.type);
                    this.setFormItemVisibility(this.config.type);
                    this.createObject();
                },
                scope: this
            }
        };
        
        var formItems = [];
        
        formItems.push(types);
        
        formItems = formItems.concat([{
            xtype: 'numberfield',
            fieldLabel: 'Width',
            itemId: 'w',
            minValue: 0,
            listeners: {
                change: function(field, value) {
                    this.config.w = value;
                    this.createObject();
                },
                scope: this
            }
        },{
            xtype: 'numberfield',
            fieldLabel: 'Length',
            itemId: 'l',
            minValue: 0,
            listeners: {
                change: function(field, value) {
                    this.config.l = value;
                    this.createObject();
                },
                scope: this
            }
        },{
            xtype: 'numberfield',
            fieldLabel: 'M1',
            itemId: 'm1',
            minValue: 0,
            listeners: {
                change: function(field, value) {
                    this.config.m1 = value;
                    this.createObject();
                },
                scope: this
            }
        },{
            xtype: 'numberfield',
            fieldLabel: 'M2',
            itemId: 'm2',
            minValue: 0,
            listeners: {
                change: function(field, value) {
                    this.config.m2 = value;
                    this.createObject();
                },
                scope: this
            }
        },{
            xtype: 'numberfield',
            itemId: 'angle',
            fieldLabel: 'Angle',
            value: 0,
            listeners: {
                change: function(field, value) {
                    this.config.angle = value;
                    this.createObject();
                },
                scope: this
            }
        }]);
        
        this.attributeFields = Ext.create('Ext.container.Container', { title: 'Attributes' });
        formItems.push(this.attributeFields);
        
        this.items = [ {
            layout: 'column',
            defaults: {
                border: false
            },
            padding: 5,
            items: [{
                width: 160,
                layout: 'form',
                items: formItems
            }, {
                columnWidth: 1,
                padding: 5,
                items: {
                    itemId: 'objectimage',
                    border: false,
                    height: 152
                }
            }]
        }];
        
        this.layer.events.register('featuremodified', this, this.onFeaturemodified);
        this.layer.events.register('beforefeatureselected', this, this.onBeforefeatureselected);
        this.layer.events.register('featureunselected', this, this.onFeatureunselected);

        this.callParent(arguments);
    },
    setConfig: function(config) {
        if (config === undefined) {
            this.config = Ext.clone(MapClient.view.ObjectConfig.config);
            this.down('#type').show();
        } else if (config.type) {
            this.config = Ext.clone(config);
            Ext.applyIf(this.config, MapClient.view.ObjectConfig.config);
            this.down('#type').hide();
        } else {
            this.config = Ext.clone(config);
            Ext.applyIf(this.config, MapClient.view.ObjectConfig.config);
            this.down('#type').show();
        }
        this.setFormValues();
        this.show();
        return this.config;
    },
    setFormValues: function() {
        if (this.config) {
            this.down('#type').setValue({'rb': this.config.type});
            this.updateHelpImage(this.config.type);
            this.down('#w').setRawValue(this.config.w);
            this.down('#l').setRawValue(this.config.l);
            this.down('#m1').setRawValue(this.config.m1);
            this.down('#m2').setRawValue(this.config.m2);
            this.down('#angle').setRawValue(this.config.angle);
            this.setFormItemVisibility(this.config.type);
            this.down('#angle').show();
        } else {
            this.down('#type').hide();
            this.down('#w').hide();
            this.down('#l').hide();
            this.down('#m1').hide();
            this.down('#m2').hide();
            this.down('#angle').hide();
            this.down('#objectimage').hide();
        }
        
        this.attributeFields.removeAll();
        if (this.selectedFeature) {
            Object.keys(this.selectedFeature.attributes).forEach(function(key) {
                this.createAttributeField(this.selectedFeature, key);
            }, this);
        }
        this.doLayout();
    },
    createAttributeField: function(feature, key) {
        if (key == 'config') return;
        
        var value = feature.attributes[key];
        
        this.attributeFields.add({
            xtype: 'textfield',
            fieldLabel: key,
            value: value,
            listeners: {
                change: function(field, value) {
                    this.selectedFeature.attributes[key] = value;
                    this.layer.drawFeature(this.selectedFeature);
                },
                scope: this
            }
        });
    },
    setFormItemVisibility: function(type) {
        if (type == 'R') {
            this.down('#w').show();
            this.down('#l').show();
            this.down('#m1').hide();
            this.down('#m2').hide();
        } else if (type == 'L') {
            this.down('#w').show();
            this.down('#l').show();
            this.down('#m1').show();
            this.down('#m2').show();
        } else if (type == 'D') {
            this.down('#w').show();
            this.down('#l').show();
            this.down('#m1').show();
            this.down('#m2').hide();
        } else if (type == 'O') {
            this.down('#w').hide();
            this.down('#l').hide();
            this.down('#m1').show();
            this.down('#m2').hide();
        }
    },
    onFeaturemodified: function(e) {
        var feature = e.feature;
        config = feature.attributes.config;
        
        if (!config) return;
        
        this.down('#angle').setRawValue(config.angle);
    },
    onBeforefeatureselected: function(e) {
        var feature = e.feature;
        this.selectedFeature = feature;
        this.config = feature.attributes.config;
        
        var action = this.gui.activeAction;
        if (action && action.control instanceof OpenLayers.Control.ModifyFeature) {
            if (this.config && (action.control.mode & OpenLayers.Control.ModifyFeature.RESHAPE)) {
                action.control.mode = action.control.mode ^ OpenLayers.Control.ModifyFeature.RESHAPE;
            } else {
                action.control.mode = action.control._mode;
            }
            action.control.resetVertices();
        }
        
        this.show();
        
        this.setFormValues();
    },
    onFeatureunselected: function(e) {
        if (this.layer.selectedFeatures.length === 0) this.hide();
        
        this.selectedFeature = undefined;
    },
    createObject: function(x, y, style) {
        if (this.selectedFeature && this.selectedFeature.attributes.config) {
            // NOTE: for some strange reason replacing geometry components works, whereas replacing geometry causes strange render bugs
            var geometry = this.factory.create(this.config, style).geometry;
            this.selectedFeature.geometry.removeComponent(this.selectedFeature.geometry.components[0]);
            this.selectedFeature.geometry.addComponent(geometry.components[0]);
            this.selectedFeature.modified = true;
            this.selectedFeature.geometry.calculateBounds();
            if (this.mapPanel.modifyFeature) this.mapPanel.modifyFeature.resetVertices();
            this.layer.drawFeature(this.selectedFeature);
            this.layer.events.triggerEvent('featuremodified', {
                feature: this.selectedFeature
            });
        }
    },
    updateHelpImage: function(type) {
        var name = 'figur-' + type + '-help.png';
        this.down('#objectimage').show();
        this.down('#objectimage').update('<img src="css/images/' + name + '"></img>');
    }
});
/**
 * Specialised draw Action that draws predefined objects
 * 
 * Predefined objects can either be configured when constructing the action and/or defined
 * by a corresponding (optional) ObjectConfig view.
 */
Ext.define('MapClient.action.DrawObject', {
    extend:  MapClient.action.Action ,
                                              
    /**
     * NOTE: objectConfigView is assumed to be supplied as a config object
     * 
     * @param {Object} config
     * @param {Object} config.objectConfig
     * @param {string} config.objectConfig.type available types are 'R', 'L', 'D', 'O'
     * @param {number} config.objectConfig.w
     * @param {number} config.objectConfig.l
     * @param {number} config.objectConfig.m1
     * @param {number} config.objectConfig.m2
     * @param {number} config.objectConfig.angle rotation
     */
    constructor: function(config) {
        this.mapPanel = config.mapPanel;
        this.layer = this.mapPanel.drawLayer;
        this.style = config.style;
        this.attributes = config.attributes;
        this.objectConfig = config.objectConfig;
        this.objectConfigView = config.objectConfigView;
        this.factory = Ext.create('MapClient.ObjectFactory');
        
        this.attributes = this.attributes || {};
                    
        var Click = OpenLayers.Class(OpenLayers.Control, {
            initialize: function(options) {
                OpenLayers.Control.prototype.initialize.apply(
                    this, arguments
                );
                this.handler = new OpenLayers.Handler.Click(
                    this, {
                        'click': this.onClick
                    }, this.handlerOptions
                );
            },
            onClick: Ext.bind(this.onClick, this)
        });
        
        config.control = new Click({
            type: OpenLayers.Control.TYPE_TOGGLE
        });
        
        config.iconCls = config.iconCls || 'action-drawobject';
        config.tooltip = config.tooltip || 'Draw predefined object';
        config.toggleGroup = 'extraTools';
        
        this.callParent(arguments);
    },
    onClick: function(e) {
        var lonlat = this.mapPanel.map.getLonLatFromPixel(e.xy);
        var config = this.objectConfigView ? this.objectConfigView.config : MapClient.view.ObjectConfig.config;
        config = Ext.clone(config);
        config.x = lonlat.lon;
        config.y = lonlat.lat;
        var feature = this.factory.create(config, this.attributes, this.style);
        this.mapPanel.unselectAll();
        this.layer.addFeatures([feature]);
        this.mapPanel.selectControl.select(feature);
    },
    toggle: function(pressed) {
        if (pressed) this.objectConfigView.setConfig(this.objectConfig);
    }
});

/**
 * Action in toolbar that zooms the user to full extent
 * 
 * The snippet below is from configuration to MapClient.view.Map
 * 
 * {@img Fullextent.png fullextent}
 * 
 *        "tools": ["FullExtent"]
 */
Ext.define('MapClient.action.FullExtent', {
    extend:  MapClient.action.Action ,
    constructor: function(config) {
        config.control = new OpenLayers.Control.ZoomToMaxExtent();
        
        config.iconCls = config.iconCls || 'action-fullextent';
        config.tooltip = config.tooltip || 'Zoom to full extent';
        
        this.callParent(arguments);
    }
});

/**
 * 
 */
Ext.define('MapClient.view.IdentifyResults', {
    extend :  Ext.panel.Panel ,
    autoScroll : true,
    layout: {
        type: 'vbox',
        pack:'start',
        align: 'stretch'
    },
    initComponent : function() {
        var mapPanel = this.mapPanel;
        
        var store = Ext.create('Ext.data.TreeStore', {
            root : {
                expanded : true
            }
        });
        
        this.root = store.getRootNode();
        
        this.items = [{
            xtype : 'treepanel',
            flex: 1,
            rootVisible : false,
            store : store,
            minHeight: 200,
            listeners: {
                select: function(model, record, index) {
                    var source = null;
                    if (record.raw.feature) {
                        source = record.raw.feature.attributes;
                        mapPanel.searchLayer.selectedFeatures.forEach(function(feature) {
                            mapPanel.selectControl.unselect(feature);
                        });
                        mapPanel.selectControl.select(record.raw.feature);
                    }
                    this.down('propertygrid').setSource(source);
                },
                scope: this
            }
        }, {
            flex: 2,
            autoScroll : true,
            title: 'Egenskaper',
            collapsible : true,
            collapsed: false,
            xtype : 'propertygrid',
            stripeRows: true
        } ];

        this.callParent(arguments);
    },
    /**
     * @param {Array.<OpenLayers.Feature.Vector>} features
     */
    addResult: function(features, title) {
        var layerNode = this.root.appendChild({
            text: title,
            leaf: false,
            expanded : true
        });
        
        var processFeature = function(feature) {
            layerNode.appendChild({
                text: feature.attributes[Object.keys(feature.attributes)[0]],
                leaf: true,
                feature: feature
            });
        };
        
        features.forEach(processFeature);
    }
});
/**
 * Identify action
 * 
 * TODO: Should be generic, is now hardcoded against search-lm parcels
 */
Ext.define('MapClient.action.Identify', {
    extend:  MapClient.action.Action ,
                                                 
    
    constructor: function(config) {
        
        var mapPanel = config.mapPanel;
        var layer = mapPanel.searchLayer;
        var map = config.map;
        var basePath = config.basePath;
        var layers = config.layers;
        
        var Click = OpenLayers.Class(OpenLayers.Control, {
            initialize: function(options) {
                OpenLayers.Control.prototype.initialize.apply(
                    this, arguments
                );
                this.handler = new OpenLayers.Handler.Click(
                    this, {
                        'click': this.onClick
                    }, this.handlerOptions
                );
            },
            onClick: function(evt) {
                mapPanel.setLoading(true);
                layer.destroyFeatures();
                
                var lonlat = map.getLonLatFromPixel(evt.xy);
                
                var x = lonlat.lon;
                var y = lonlat.lat;
                
                var point = new OpenLayers.Geometry.Point(x, y);
                var feature = new OpenLayers.Feature.Vector(point);
                layer.addFeatures([feature]);
                
                var identifyResults = Ext.create('MapClient.view.IdentifyResults', {
                    mapPanel : mapPanel
                });
                
                var popup = Ext.create('GeoExt.window.Popup', {
                    title: 'Sökresultat',
                    location: feature,
                    anchored: false,
                    unpinnable: false,
                    draggable: true,
                    map: mapPanel,
                    maximizable : false,
                    minimizable : false,
                    resizable: true,
                    width: 300,
                    height: 400,
                    layout: 'fit',
                    items: identifyResults,
                    collapsible: false
                });
                
                popup.show();

                Ext.Ajax.request({
                    url: basePath + 'registerenheter?x=' +x+ '&y=' +y,
                    success: function(response) {
                        var registerenhet = Ext.decode(response.responseText);

                        var feature = new OpenLayers.Feature.Vector(point, {
                            name: registerenhet.name
                        });
                        identifyResults.addResult([feature], "Fastigheter");
                    },
                    failure: function(response) {
                        Ext.Msg.alert('Fel', response.statusText);
                    },
                    callback: function() {
                        mapPanel.setLoading(false);
                    }
                });
                
                var parser = Ext.create('MapClient.config.Parser');
               
                var wfsLayers =  parser.extractWFS(layers);
                
                var wfsIdentify = function(wfsLayer) {
                    var options = Ext.apply({
                        version: "1.1.0",
                        srsName: "EPSG:3006"
                    }, wfsLayer.wfs);
                    
                    var protocol = new OpenLayers.Protocol.WFS(options);
                    
                    protocol.read({
                        filter: new OpenLayers.Filter({
                            type: OpenLayers.Filter.Spatial.BBOX,
                            value: point.getBounds()
                        }),
                        callback: function(response) {
                            var features = response.features;
                            if (features && features.length>0) {
                                identifyResults.addResult(features, wfsLayer.name);
                                layer.addFeatures(features);
                            }
                        }
                    });
                };
                
                wfsLayers.forEach(wfsIdentify);
            }
        });
        
        config.control = new Click({
            type: OpenLayers.Control.TYPE_TOGGLE
        });
        
        config.iconCls = config.iconCls || 'action-identify';
        config.tooltip = config.tooltip || 'Identify';
        config.toggleGroup = 'extraTools';
        
        this.callParent(arguments);
    }
});

/**
 * Action that measure area.
 *{@img Measurearea.png measurearea}
 * 
 * The example below is from configuration adding the tool to MapClient.view.Map:
 * 
 *         "tools": [ "FullExtent", "ZoomSelector", "MeasureLine", "MeasureArea"]
 */
Ext.define('MapClient.action.MeasureArea', {
    extend:  MapClient.action.Action ,
    
    constructor: function(config) {
        
        var sketchSymbolizers = {
            "Point": {
                pointRadius: 4,
                graphicName: "square",
                fillColor: "white",
                fillOpacity: 1,
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeColor: "#333333"
            },
            "Line": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: "#2969db",
                strokeDashstyle: "dash"
            },
            "Polygon": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: "#2969db",
                strokeDashstyle: "dash",
                fillColor: "#deecff",
                fillOpacity: 0.4
            }
        };
        var style = new OpenLayers.Style();
        style.addRules([
            new OpenLayers.Rule({symbolizer: sketchSymbolizers})
        ]);
        var styleMap = new OpenLayers.StyleMap({"default": style});
        
        config.control = new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
            persist: true,
            handlerOptions: {
                layerOptions: {
                    styleMap: styleMap
                }
            }
        });
        
        var out = "";
        var count = 1;
        var reset = true;
        function handleMeasurements(event) {
            MapClient.action.MeasureLine.createMeasureWindow();
            MapClient.action.MeasureLine.measureWindow.show();
            
            var geometry = event.geometry;
            var units = event.units;
            var order = event.order;
            var measure = event.measure;
            //var out = "";
            if (reset) {
                out = "";
                count = 1;
                reset = false;
            }
            var p1 = geometry.components[geometry.components.length-2];
            var p2 = geometry.components[geometry.components.length-3];
            if (p1 === undefined || p2 === undefined) return;
            measure = p1.distanceTo(p2);
            units = "m";
            if(order == 1) {
                out += "Delsträcka " + count + " : " + measure.toFixed(3) + " " + units + "<br>";
            } else {
                out += "Delsträcka " + count + " : " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>" + "<br>";
            }
            MapClient.action.MeasureLine.measureWindow.update(out);
            count = count+1;
        }
        
        function handleMeasurement(event) {
            var units = event.units;
            var order = event.order;
            var measure = event.measure;
            //var out = "";
            if(order == 1) {
                out += "Totalt: " + measure.toFixed(3) + " " + units + "<br>";
            } else {
                out += "Totalt: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>" + "<br>";
            }
            MapClient.action.MeasureLine.measureWindow.update(out);
            reset = true;
        }
        
        config.control.events.on({
            'measure': handleMeasurement,
            'measurepartial': handleMeasurements
        });
        
        config.iconCls = config.iconCls || 'action-measurearea';
        config.tooltip = config.tooltip || 'Measure area';
        config.toggleGroup = 'extraTools';
        
        this.callParent(arguments);
    }
});

/**
 * Action that measure line.
 * {@img Measureline.png measureline}
 * 
 * The example below is from configuration:
 * 
* The example below is from configuration adding the tool to MapClient.view.Map:
 * 
 *         "tools": [ "FullExtent", "ZoomSelector", "MeasureLine", "MeasureArea"]
 */
 
Ext.define('MapClient.action.MeasureLine', {
    extend:  MapClient.action.Action ,
    statics: {
        measureWindow: null,
        createMeasureWindow: function() {
            if (this.measureWindow) {
                this.measureWindow.update('');
                return;
            }
            this.measureWindow = Ext.create('Ext.window.Window', {
                title: 'Mätresultat',
                maximizable : false,
                minimizable : false,
                resizable: true,
                width: 300,
                height: 200,
                autoScroll: true,
                layout: 'fit',
                collapsible: false,
                closeAction: 'hide'
            });
        }
    },
    constructor: function(config) {
        
        var sketchSymbolizers = {
            "Point": {
                pointRadius: 4,
                graphicName: "square",
                fillColor: "white",
                fillOpacity: 1,
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeColor: "#333333"
            },
            "Line": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: "#666666",
                strokeDashstyle: "dash"
            },
            "Polygon": {
                strokeWidth: 2,
                strokeOpacity: 1,
                strokeColor: "#666666",
                fillColor: "white",
                fillOpacity: 0.3
            }
        };
        var style = new OpenLayers.Style();
        style.addRules([
            new OpenLayers.Rule({symbolizer: sketchSymbolizers})
        ]);
        var styleMap = new OpenLayers.StyleMap({"default": style});
        
        config.control = new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            persist: true,
            handlerOptions: {
                layerOptions: {
                    styleMap: styleMap
                }
            }
        });
        
        var out = "";
        var count = 1;
        var reset = true;
        function handleMeasurements(event) {
            MapClient.action.MeasureLine.createMeasureWindow();
            MapClient.action.MeasureLine.measureWindow.show();
            
            var geometry = event.geometry;
            var units = event.units;
            var order = event.order;
            var measure = event.measure;
            //var out = "";
            if (reset) {
                out = "";
                count = 1;
                reset = false;
            }
            var p1 = geometry.components[geometry.components.length-2];
            var p2 = geometry.components[geometry.components.length-3];
            if (p1 === undefined || p2 === undefined) return;
            measure = p1.distanceTo(p2);
            units = "m";
            if(order == 1) {
                out += "Delsträcka " + count + " : " + measure.toFixed(3) + " " + units + "<br>";
            } else {
                out += "Delsträcka " + count + " : " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>" + "<br>";
            }
            MapClient.action.MeasureLine.measureWindow.update(out);
            count = count+1;
        }
        
        function handleMeasurement(event) {
            var units = event.units;
            var order = event.order;
            var measure = event.measure;
            //var out = "";
            if(order == 1) {
                out += "Totalt: " + measure.toFixed(3) + " " + units + "<br>";
            } else {
                out += "Totalt: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>" + "<br>";
            }
            MapClient.action.MeasureLine.measureWindow.update(out);
            reset = true;
        }
        
        config.control.events.on({
            'measure': handleMeasurement,
            'measurepartial': handleMeasurements
        });
        
        config.iconCls = config.iconCls || 'action-measureline';
        config.tooltip = config.tooltip || 'Measure line';
        config.toggleGroup = 'extraTools';
        
        this.callParent(arguments);
    }
});

/**
 * Action that modify geometry
 *            
 *            
 */
Ext.define('MapClient.action.ModifyGeometry', {
    extend:  MapClient.action.Action ,
    constructor: function(config) {
        var mapPanel = config.mapPanel;
        var layer = mapPanel.drawLayer;
        
        if (config.drag === undefined) config.drag = true;
        if (config.rotate === undefined) config.rotate = true;
        
        var mode = 0;
        if (config.drag) mode = mode | OpenLayers.Control.ModifyFeature.DRAG;
        if (config.rotate) mode = mode | OpenLayers.Control.ModifyFeature.ROTATE;
        if (config.resize) mode = mode | OpenLayers.Control.ModifyFeature.RESIZE;
        if (config.reshape) mode = mode | OpenLayers.Control.ModifyFeature.RESHAPE;
        
        var options = Ext.apply({mode: mode}, config.options);
        config.control = new OpenLayers.Control.ModifyFeature(layer, options);
        config.control._mode = config.control.mode;
        
        config.iconCls = config.iconCls || 'action-modifygeometry';
        config.tooltip = config.tooltip || 'Modify geometry';
        config.toggleGroup = 'extraTools';
        
        this.callParent(arguments);
    }
});

/**
 * Action for print using mapfish.
 */
Ext.define('MapClient.action.Print', {
    extend :  MapClient.action.Action ,
    constructor : function(config) {
        var mapPanel = config.mapPanel;
        var printExtent = mapPanel.plugins[0];
        var printProvider = printExtent.printProvider;
        var printDialog = null;
        var page = null;

        var onTransformComplete = function() {
            var scale = printDialog.down('#scale');
            scale.select(page.scale);
        };
        var onBeforedownload = function() {
            if (printDialog) printDialog.setLoading(false);
        };
        var onPrintexception = function(printProvider, response) {
            if (printDialog) printDialog.setLoading(false);
            Ext.Msg.show({
                 title:'Felmeddelande',
                 msg: 'Print failed.\n\n' + response.responseText,
                 icon: Ext.Msg.ERROR
            });
        };
        var close = function() {
            printProvider.un('beforedownload', onBeforedownload);
            printProvider.on('printexception', onPrintexception);
            printExtent.control.events.unregister('transformcomplete', null, onTransformComplete);
            printExtent.removePage(page);
            printExtent.hide();
            printDialog = null;
        };
        var onClose = function() {
            close();
            control.deactivate();
        };
        
        config.iconCls = config.iconCls || 'action-print';
        config.tooltip = config.tooltip || 'Print';
        config.toggleGroup = 'extraTools';
        
        var Custom =  OpenLayers.Class(OpenLayers.Control, {
            initialize: function(options) {
                OpenLayers.Control.prototype.initialize.apply(
                    this, arguments
                );
            },
            type: OpenLayers.Control.TYPE_TOGGLE,
            activate: function() {
                if (printDialog) {
                    return;
                }
                // NOTE: doing a hide/show at first display fixes interaction problems with preview extent for unknown reasons
                printExtent.hide();
                printExtent.show();
                page = printExtent.addPage();
                
                printDialog = new Ext.Window({
                    autoHeight : true,
                    width : 250,
                    resizable: false,
                    layout : 'fit',
                    bodyPadding : '5 5 0',
                    title: 'Print settings',
                    listeners: {
                        close: onClose
                    },
                    items : [ {
                        xtype : 'form',
                        layout : 'anchor',
                        defaults : {
                            anchor : '100%'
                        },
                        fieldDefaults : {
                            labelWidth : 75
                        },
                        items : [ {
                            xtype : 'combo',
                            fieldLabel: 'Layout',
                            store : printProvider.layouts,
                            displayField : 'name',
                            valueField : 'name',
                            queryMode: 'local',
                            value: printProvider.layouts.first().get("name"),
                            listeners: {
                                select: function(combo, records, eOpts) {
                                    var record = records[0];
                                    printProvider.setLayout(record);
                                }
                            }
                        }, {
                            xtype : 'combo',
                            fieldLabel: 'Resolution',
                            store : printProvider.dpis,
                            displayField : 'name',
                            valueField : 'value',
                            queryMode: 'local',
                            value: printProvider.dpis.first().get("value"),
                            listeners: {
                                select: function(combo, records, eOpts) {
                                    var record = records[0];
                                    printProvider.setDpi(record);
                                }
                            }
                        }, {
                            xtype : 'combo',
                            fieldLabel: 'Scale',
                            store : printProvider.scales,
                            displayField : 'name',
                            valueField : 'value',
                            queryMode: 'local',
                            itemId: 'scale',
                            value: printProvider.scales.first().get("value"),
                            listeners: {
                                select: function(combo, records, eOpts) {
                                    var record = records[0];
                                    page.setScale(record, "m");
                                }
                            }
                        } ]
                    } ],
                    bbar : [ '->', {
                        text : "Skriv ut",
                        handler : function() {
                            printDialog.setLoading(true);
                            printExtent.print();
                        }
                    } ]
                });
                printDialog.show();
                var scale = printDialog.down('#scale');
                scale.select(page.scale);
                
                printExtent.control.events.register('transformcomplete', null, onTransformComplete);
                printExtent.control.events.register('transformcomplete', null, onTransformComplete);
                printProvider.on('beforedownload', onBeforedownload);
                printProvider.on('printexception', onPrintexception);
                
                OpenLayers.Control.prototype.activate.apply(this, arguments);
            },
            deactivate: function() {
                if (printDialog) printDialog.close();
                OpenLayers.Control.prototype.deactivate.apply(this, arguments);
            }
        });
        var control = new Custom({
            type: OpenLayers.Control.TYPE_TOGGLE
        });
        config.control = control;
        
        this.callParent(arguments);
    }
});

/**
 * Action that selelcts geometry.
 */
Ext.define('MapClient.action.SelectGeometry', {
    extend:  MapClient.action.Action ,
    constructor: function(config) {
        var mapPanel = config.mapPanel;
        
        config.control = mapPanel.selectControl;
        
        config.iconCls = config.iconCls || 'action-selectgeometry';
        config.tooltip = config.tooltip || 'Select geometry';
        config.toggleGroup = 'extraTools';
        
        this.callParent(arguments);
    }
});

/**
 * Parser for configuration JSON
 * Set defaults, initializes OpenLayers and Ext JS stuff.
 */
Ext.define('MapClient.config.Parser', {
                              

    /**
     * Parse configuration JSON
     * 
     * Set defaults, initializes OpenLayers and Ext JS stuff.
     */
    parse : function(config) {
        // construct OpenLayers.Map options object
        var options = {
            "resolutions" : [ 256.0, 128.0, 36.0, 12.0, 4.0, 2.0, 1.0, 0.5,    0.25, 0.125 ],
            "units" : "m",
            "projection" : "EPSG:3006",
            "fallThrough" : true,
            "controls": ["Navigation", "KeyboardDefaults"]
        };
        
        options.maxExtent = config.maxExtent;
        options.extent = config.extent;
        options.allOverlays = !config.layers.some(this.testForBaseLayer);
        options.controls = options.controls.map(this.createControl);
        
        // filter out plain layer definitions (no group)
        var layers = this.extractLayers(config.layers);
        
        // Create OpenLayers.Layer.WMS from layer definitions that describe WMS source
        options.layers = layers
            .map(this.transformLayer)
            .filter(this.isWMSLayer)
            .map(this.createLayer);
        
        var map = new OpenLayers.Map(options);
        
        return map;
    },
    /**
     * Process layers config to return a flat array with layer definitions
     */
    extractLayers: function(layers) {
        // filter out plain layer definitions (no group)
        var plainLayers = layers.filter(function(layer) { return !layer.group; });
        // filter out groups
        var groups = layers.filter(function(layer) { return layer.group; }).map(function(layer) { return layer.group; });
        // flatten groups into an array of layer definitions 
        var flattenedGroups = [].concat.apply([], groups);
        // concat all layer definitions
        layers = plainLayers.concat(flattenedGroups);
        
        return layers;
    },
    extractWFS: function(layers) {
        layers = this.extractLayers(layers);
        layers = layers.filter(function(layer){ return layer.wfs; });
        return layers;
    },
    testForBaseLayer: function(layer) {
        if (layer.wms && layer.wms.options && layer.wms.options.isBaseLayer) {
            return true;
        } else {
            return false;
        }
    },
    createControl: function(control) {
        if (control.constructor == String) {
            return new OpenLayers.Control[control]();
        } else {
            return new OpenLayers.Control[control.type](control.options);
        }
    },
    isWMSLayer: function(layer) {
        return layer.wms;
    },
    /**
     * Transform layer definition for back compatibility reasons
     */
    transformLayer: function(layer) {
        // if layer def has url assume it should be moved to wms property
        if (layer.url) {
            layer.wms = {
                    url: layer.url,
                    params: layer.params,
                    options: layer.options
            };
        }
        return layer;
    },
    createLayer: function(layer) {
        return new OpenLayers.Layer.WMS(layer.name, layer.wms.url, layer.wms.params, layer.wms.options);
    }

});

/**
 * Combobox that searches from LM with type ahead.
 */
Ext.define('MapClient.form.SearchAddress', {
    extend :  Ext.form.field.ComboBox ,
    alias: 'widget.searchaddress',
    require: ['Ext.data.*',
              'Ext.form.*'],
    initComponent : function() {
        var registeromrade = Ext.Object.fromQueryString(location.search).registeromrade;
        var layer = this.mapPanel.searchLayer;
        
        function doSearch(fnr, x, y) {
            this.mapPanel.setLoading(true);
            this.mapPanel.searchLayer.destroyFeatures();
            Ext.Ajax.request({
                url: this.basePath + 'registerenheter?fnr=' + fnr,
                success: function(response) {
                    var json = Ext.decode(response.responseText);
                    if (json.success === false) {
                        Ext.Msg.alert('Meddelande', 'Ingen fastighet kunde hittas på adressen.');
                        return;
                    }
                    this.resultPanel.expand();
                    var features = new OpenLayers.Format.GeoJSON().read(response.responseText, "FeatureCollection");
                    layer.addFeatures(features);
                    var point = new OpenLayers.Geometry.Point(x, y);
                    feature = new OpenLayers.Feature.Vector(point);
                    layer.addFeatures([feature]);
                    var resolution = OpenLayers.Util.getResolutionFromScale(1000, 'm');
                    var zoom = this.mapPanel.map.getZoomForResolution(resolution);
                    this.mapPanel.map.setCenter([x,y], zoom);
                    MapClient.app.fireEvent('searchresult', feature);
                },
                failure: function() {
                    Ext.Msg.alert('Fel', 'Okänt.');
                },
                callback: function() {
                    this.mapPanel.setLoading(false);
                },
                scope: this
            });
        }
        
        this.store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url : this.basePath + 'addresses',
                reader: {
                    type: 'array'
                }
            },
            fields: ['id', 'name', 'x', 'y', 'fnr']
        });
        
        this.labelWidth= 60;
        this.displayField= 'name';
        this.valueField= 'id';
        this.queryParam='q';
        this.typeAhead= true;
        this.forceSelection= true;
        
        this.listeners = {
            'select':  function(combo, records) {
                doSearch.call(this, records[0].data.fnr, records[0].data.x, records[0].data.y);
            },
            'beforequery': function(queryPlan) {
                if (registeromrade && queryPlan.query.match(registeromrade) === null) {
                    queryPlan.query = registeromrade + ' ' + queryPlan.query;
                }
            },
            scope: this
        };
        
        this.callParent(arguments);
    }
});
/**
 * Combobox that searches from LM with type ahead.
 */
Ext.define('MapClient.form.SearchPlacename', {
    extend :  Ext.form.field.ComboBox ,
    alias: 'widget.searchplacename',
    require: ['Ext.data.*',
              'Ext.form.*'],
    initComponent : function() {
        var kommunkod = Ext.Object.fromQueryString(location.search).kommunkod;
                
        this.store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url : this.basePath + 'placenames',
                reader: {
                    type: 'json',
                    root: 'features'
                },
                extraParams: {
                    kommunkod: kommunkod
                }
            },
            fields: [
                 {name: 'id', mapping: 'properties.id'},
                 {name: 'name', mapping: 'properties.name'}
             ]
        });
        
        this.labelWidth= 60;
        this.displayField= 'name';
        this.valueField= 'id';
        this.queryParam='q';
        this.typeAhead= true;
        this.forceSelection= true;
        
        this.listeners = {
            'select':  function(combo, records) {
                var fake = records[0].raw;
                this.mapPanel.map.setCenter(fake.geometry.coordinates, 5);
            },
            scope: this
        };
        
        this.callParent(arguments);
    }
});
/**
 * Combobox that searches from LM with type ahead.
 */
Ext.define('MapClient.form.SearchRegisterenhet', {
    extend :  Ext.form.field.ComboBox ,
    alias: 'widget.searchregisterenhet',
    require: ['Ext.data.*',
              'Ext.form.*'],
    initComponent : function() {
        var registeromrade = Ext.Object.fromQueryString(location.search).registeromrade;
        var layer = this.mapPanel.searchLayer;
        
        function doSearch(id) {
            this.mapPanel.setLoading(true);
            this.mapPanel.searchLayer.destroyFeatures();
            Ext.Ajax.request({
                url: this.basePath + 'registerenheter/'+id+'/enhetsomraden',
                success: function(response) {
                    this.resultPanel.expand();
                    var features = new OpenLayers.Format.GeoJSON().read(response.responseText);
                    layer.addFeatures(features);
                    var extent = layer.getDataExtent();
                    // TODO : small extents should not be allowed to zoom below certain zoom level
                    this.mapPanel.map.zoomToExtent(extent);
                },
                failure: function() {
                    Ext.Msg.alert('Fel', 'Ingen träff.');
                },
                callback: function() {
                    this.mapPanel.setLoading(false);
                },
                scope: this
            });
        }
        
        this.store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url : this.basePath + 'registerenheter',
                reader: {
                    type: 'json',
                    root: 'features'
                }
            },
            fields: [
                 {name: 'id', mapping: 'properties.objid'},
                 {name: 'name', mapping: 'properties.name'}
             ]
        });
        
        this.labelWidth = 60;
        this.displayField = 'name';
        this.valueField = 'id';
        this.queryParam = 'q';
        this.typeAhead = true;
        this.forceSelection = true;
        
        this.listeners = {
            'select':  function(combo, records) {
                var id = records[0].get('id');
                doSearch.call(this, id);
            },
            'beforequery': function(queryPlan) {
                if (registeromrade && queryPlan.query.match(registeromrade) === null) {
                    queryPlan.query = registeromrade + ' ' + queryPlan.query;
                }
            },
            scope: this
        };
        
        this.callParent(arguments);
    }
});
/**
 * Custom floating panel to switch baselayers
 */
Ext.define('MapClient.view.BaseLayers', {
    extend :  Ext.toolbar.Toolbar ,
    border: false,
    cls: 'oep-map-tools',
    constructor : function(config){
        var mapPanel = config.mapPanel;
        var map = mapPanel.map;
        
        var baseLayers = mapPanel.map.layers.filter(function(layer) { return layer.isBaseLayer; });
        
        var createButton = function(layer){
            var cls;
            
            if (layer == baseLayers[baseLayers.length-1]) cls = 'oep-tools-last';
            
            var button = Ext.create('Ext.Button', {
                text : layer.name,
                toggleGroup : 'baseLayers',
                allowDepress: false,
                layer: layer,
                pressed : layer.visibility,
                cls: cls,
                listeners : {
                    toggle : function(btn, pressed, opts){
                        if (pressed) map.setBaseLayer(layer);
                    }
                }
            });

            return button;
        };
        
        this.items = baseLayers.map(createButton);
        
        map.events.register('changebaselayer', this, this.onChangeBaseLayer);
        
        this.callParent(arguments);
    },
    onChangeBaseLayer: function(e) {
        this.items.each(function(button) {
            button.toggle(button.layer == e.layer, true);
        });
    }
});
/**
 * 
 */
Ext.define('MapClient.view.Layers' ,{
    extend:  GeoExt.tree.Panel ,
                                            
                                             
    autoScroll: true,
    lines: false,
    rootVisible: false,
    width: 300,
    border: false,
    initComponent: function() {
        
        if (!this.renderTo) {
            this.title = 'Lager';
            this.bodyPadding = 5;
            this.collapsible = true;
        }
        
        this.store = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                expanded: true,
                plugins: [{
                    ptype: 'gx_layercontainer',
                    store: this.mapPanel.layers
                }]
            }
        });
        
        this.callParent(arguments);
    }
});
/**
 * 
 */
Ext.define('MapClient.view.Map' ,{
    extend:  GeoExt.panel.Map ,
    border: false,
    anchor: '100% 100%',
    constructor: function(config) {
        this.initDefaultLayers(config.config);
        
        var printProvider = Ext.create('GeoExt.data.MapfishPrintProvider', {
            url: "/print/pdf",
            autoLoad: true,
            listeners: {
                /*"loadcapabilities": function(printProvider, capabilities) {
                    // NOTE: need to override to test locally...
                    capabilities.createURL = "/print/pdf/create.json";
                },*/
                "encodelayer": function(printProvider, layer, encodedLayer) {
                    if (encodedLayer && encodedLayer.baseURL) {
                        encodedLayer.baseURL = encodedLayer.baseURL.replace('gwc/service/', '');
                    }
                }/*,
                "beforedownload": function(printProvider, url) {
                    console.log("beforedownload");
                }*/
            }
        });
        
        var printExtent = Ext.create('GeoExt.plugins.PrintExtent', {
            printProvider: printProvider
        });
        
        config.plugins = [printExtent];
        
        this.callParent(arguments);
                
        this.layers.add(this.searchLayer);
        this.layers.add(this.drawLayer);
        
        this.selectControl = new OpenLayers.Control.SelectFeature(this.drawLayer);
        this.map.addControl(this.selectControl);
    },
    unselectAll: function() {
        this.drawLayer.selectedFeatures.forEach(function(feature) {
            this.selectControl.unselect(feature);
        }, this);
    },
    parseStyle: function(style) {
        var template = {
                "Point": {
                    pointRadius: 4,
                    graphicName: "square",
                    fillColor: "#e8ffee",
                    fillOpacity: 0.9,
                    strokeWidth: 1,
                    strokeOpacity: 1,
                    strokeColor: "#29bf4c"
                },
                "Line": {
                    strokeWidth: 3,
                    strokeColor: "#29bf4c",
                    strokeOpacity: 1
                },
                "Polygon": {
                    strokeWidth: 3,
                    strokeOpacity: 1,
                    strokeColor: "#29bf4c",
                    fillColor: "#e8ffee",
                    fillOpacity: 0.9
                }
            };
        
        var createSymbolizer = function(style) {
            var clone = Ext.clone(template);
            if (style["Point"]) {
                Ext.apply(clone["Point"], style["Point"]);
                Ext.apply(clone["Line"], style["Line"]);
                Ext.apply(clone["Polygon"], style["Polygon"]);
            } else {
                Ext.apply(clone["Point"], style);
                Ext.apply(clone["Line"], style);
                Ext.apply(clone["Polygon"], style);
            }
            return clone;
        };
        
        var defaultStyle = new OpenLayers.Style(null, {rules: [ new OpenLayers.Rule({symbolizer: template})]});
        var selectStyle;
        var temporaryStyle;
        if (style) {
            if (style["default"]) {
                defaultStyle = createSymbolizer(style["default"]);
                defaultStyle = new OpenLayers.Style(null, {rules: [ new OpenLayers.Rule({symbolizer: defaultStyle})]});
            }
            if (style["select"]) {
                selectStyle = createSymbolizer(style["select"]);
                selectStyle = new OpenLayers.Style(null, {rules: [ new OpenLayers.Rule({symbolizer: selectStyle})]});
            }
            if (style["temporary"]) {
                temporaryStyle = createSymbolizer(style["temporary"]);
                temporaryStyle = new OpenLayers.Style(null, {rules: [ new OpenLayers.Rule({symbolizer: temporaryStyle})]});
            }
            if (!style["default"]) {
                defaultStyle = createSymbolizer(style);
                defaultStyle = new OpenLayers.Style(null, {rules: [ new OpenLayers.Rule({symbolizer: defaultStyle})]});
            }
        }
        
        var map = {
            "default": defaultStyle
        };
        if (selectStyle) {
            map["select"] = selectStyle;
        }
        if (temporaryStyle) {
            map["temporary"] = temporaryStyle;
        }
        var styleMap = new OpenLayers.StyleMap(map);
        
        return styleMap;
    },
    initDefaultLayers: function(config) {
        if (!config.drawStyle) {
            config.drawStyle = {
                    "default": {
                        "Point": {
                            pointRadius: 4,
                            graphicName: "square",
                            fillColor: "#ffffff",
                            fillOpacity: 1,
                            strokeWidth: 1,
                            strokeOpacity: 1,
                            strokeColor: "#2969bf"
                        },
                        "Line": {
                            strokeWidth: 3,
                            strokeColor: "#2969bf",
                            strokeOpacity: 1
                        },
                        "Polygon": {
                            strokeWidth: 3,
                            strokeOpacity: 1,
                            strokeColor: "#2969bf",
                            fillOpacity: 0
                        }
                    },
                    "select": {
                        strokeWidth: 3,
                        strokeOpacity: 1,
                        fillColor: "#deecff",
                        fillOpacity: 0.9,
                        strokeColor: "#2969bf"
                    },
                    "temporary": {
                        strokeWidth: 3,
                        strokeOpacity: 0.75,
                        fillColor: "#ff00ff",
                        fillOpacity: 0,
                        strokeColor: "#ff00ff"
                    }
            };
        }
        
        this.drawLayer = new OpenLayers.Layer.Vector('Drawings', {
            displayInLayerSwitcher: false,
            styleMap: this.parseStyle(config.drawStyle)
        });
        
        if (config.autoClearDrawLayer) {
            this.drawLayer.events.register('beforefeatureadded', this, function() {
                this.drawLayer.destroyFeatures();
            });
        }
        
        function onFeatureadded(e) {
            var feature = e.feature;
            this.selectControl.select(feature);
        }
        
        function onBeforefeaturemodified(e) {
            var feature = e.feature;
            this.selectControl.select(feature);
        }
        
        function onAfterfeaturemodified(e) {
            var feature = e.feature;
            //this.selectControl.unselect(feature);
        }
        
        //this.drawLayer.events.register('featureadded', this, onFeatureadded);
        this.drawLayer.events.register('beforefeaturemodified', this, onBeforefeaturemodified);
        this.drawLayer.events.register('afterfeaturemodified', this, onAfterfeaturemodified);
        
        var searchStyle = {
                "Point": {
                    pointRadius: 4,
                    graphicName: "square",
                    fillColor: "#ffffff",
                    fillOpacity: 1,
                    strokeWidth: 1,
                    strokeOpacity: 1,
                    strokeColor: "#2969bf"
                },
                "Line": {
                    strokeWidth: 3,
                    strokeColor: "#2969bf",
                    strokeOpacity: 1
                },
                "Polygon": {
                    strokeDashstyle: 'dot',
                    strokeWidth: 3,
                    strokeOpacity: 1,
                    strokeColor: "#f58d1e",
                    fillOpacity: 0
                }
        };
        
        this.searchLayer = new OpenLayers.Layer.Vector('Searchresult', {
            displayInLayerSwitcher: false,
            styleMap: this.parseStyle(searchStyle)
        });
    }
});

/**
 * 
 */
Ext.define('MapClient.view.SearchCoordinate', {
    extend :  Ext.container.Container ,
    layout: 'column',
    defaults: {
        labelWidth: 20
    },
    width: 300,
    border: false,
    initComponent : function(config) {
        this.items = [ {
            itemId: 'e',
            fieldLabel: 'E',
            xtype : 'textfield',
            columnWidth: 0.5
        },{
            itemId: 'n',
            fieldLabel: 'N',
            xtype : 'textfield',
            columnWidth: 0.5
        }, {
            xtype: 'button',
            text: 'Sök',
            handler: function() {
                var x = this.down('#e').getValue();
                var y = this.down('#n').getValue();
                this.mapPanel.map.setCenter([x, y], 5);
            },
            scope: this
        }];
        
        this.callParent(arguments);
    }
});
/**
 * 
 */
Ext.define('MapClient.view.SearchFastighet', {
    extend :  Ext.form.Panel ,
                
                                                     
                                               
                                                 
                                                 
    width: 400,
    border: false,
    initComponent : function() {

        if (!this.renderTo) {
            this.title = 'Sök fastighet';
            this.bodyPadding = 5;
        }
        
        var data = [
                    [ 'searchregisterenhet', 'Fastighet' ],
                    [ 'searchaddress', 'Adress' ],
                    [ 'searchplacename', 'Ort' ]/*,
                    [ 'searchbyggnad', 'Byggnad' ]*/
                    ];

        var columns = [ {
            text : 'Namn',
            dataIndex : 'name',
            flex : 1
        } ];

        var store = Ext.create('GeoExt.data.FeatureStore', {
            layer : this.mapPanel.searchLayer,
            featureFilter: new OpenLayers.Filter.Function({
                evaluate: function(context) {
                    if (context.attributes.name) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }),
            fields : [ {
                name : 'name'
            }, {
                name : 'fid'
            }, {
                name : 'objid'
            } ]
        });
        
        var grid = Ext.create('Ext.grid.Panel', {
            columns : columns,
            store : store,
            selType : 'featuremodel'
        });
        
        function defSearchCombo(type) {
            return {
                xtype : type,
                mapPanel : this.mapPanel,
                basePath: this.basePath,
                resultPanel : grid
            };
        }
        
        function onChange(combo, value) {
            var container = this.down('#search');
            this.mapPanel.searchLayer.destroyFeatures();
            container.removeAll();
            container.add(defSearchCombo.call(this,value));
        }

        this.items = [ {
            layout : 'column',
            border: false,
            items : [ {
                xtype : 'combo',
                width : 110,
                store : data,
                forceSelection : true,
                queryMode : 'local',
                value : 'searchregisterenhet',
                border: false,
                listeners : {
                    change : onChange,
                    scope : this
                }
            }, {
                itemId : 'search',
                columnWidth : 1,
                layout : 'fit',
                border: false,
                items : defSearchCombo.call(this,'searchregisterenhet')
            } ]    }
        ];
        
        if (!this.renderTo) {
            this.items.push(grid);
        }

        this.callParent(arguments);
    }
});
/**
 * Custom panel to represent a floating zoom slider
 */
Ext.define('MapClient.view.ZoomTools', {
    extend :  Ext.panel.Panel ,
    bodyStyle : 'background : transparent',
    border: false,
    getTools : function() {
        var oep = Ext.util.CSS.getRule('.oep-tools');
        var scale = oep ? 'large' : 'medium';
        var margin = oep ? '5 0 5 0' : '5 0 5 8';
        
        var pile = [];
        var slider = Ext.create('GeoExt.slider.Zoom', {
            height : 200,
            vertical : true,
            aggressive : true,
            margin  : margin,
            map : this.mapPanel.map
        });
        pile.push({
            xtype : 'button',
            iconCls: 'zoomtools-plus',
            mapPanel : this.mapPanel,
            scale: scale,
            cls: 'x-action-btn',
            listeners : {
                'click' : function() {
                    this.mapPanel.map.zoomIn();
                },
                scope: this
            }
        });
        pile.push(slider);
        pile.push({
            xtype : 'button',
            scale: scale,
            cls: 'x-action-btn',
            iconCls: 'zoomtools-minus',
            mapPanel : this.mapPanel,
            listeners : {
                'click' : function() {
                    this.mapPanel.map.zoomOut();
                },
                scope: this
            }
        });
        return pile;
    },

    constructor : function(config) {
        Ext.apply(this, config);

        this.items = this.getTools();

        this.callParent(arguments);
    }

});
