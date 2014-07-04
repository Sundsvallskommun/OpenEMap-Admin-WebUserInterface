Ext.define('AdmClient.view.settings.LayersWMS', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.layerswms',
    layout : {
        type : 'vbox',
        align : 'stretch'
    },
    title : 'WMS layers',
    initComponent : function() {
        var wms = Ext.create("GeoExt.data.WmsCapabilitiesLayerStore", {
            url: '/riges/geoserver/wms?request=GetCapabilities&version=1.1.0',
            //url : "capabilities.xml",
            autoLoad : true
        });
        
        this.items = [ {
            xtype : 'combobox',
            fieldLabel : 'WMS server'
        }, {
            xtype : 'grid',
            store : wms,
            itemId : 'wmslayers',
            flex : 1,
            hideHeaders : true,
            autoScroll : true,
            columns : [ {
                dataIndex : "name",
                sortable : true,
                flex : 1
            } ]
        } ];

        this.callParent(arguments);
    }
});