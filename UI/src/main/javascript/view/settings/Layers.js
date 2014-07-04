Ext.define('AdmClient.view.settings.Layers', {
    extend : 'Ext.panel.Panel',
    requires : [ 'GeoExt.data.WfsCapabilitiesLayerStore',
            'AdmClient.store.Layers',
            'AdmClient.view.settings.LayersConfigured',
            'AdmClient.view.settings.LayersWMS' ],
    alias : 'widget.layers',
    title : 'Layers',
    layout : {
        type : 'hbox',
        align : 'stretch'
    },
    initComponent : function() {

        this.items = [ {
            xtype : 'layerswms',
            //padding : '0 5 0 0',
            padding : 10,
            flex : 1
        }, {
            layout : {
                type : 'vbox',
                align : 'center',
                pack : 'center'
            },
            items : {
                xtype : 'button',
                text : 'Add ->',
                itemId : 'add'
            }
        }, {
            xtype : 'layersconfigured',
            //padding : '0 0 0 5',
            padding : 10,
            flex : 1
        } ];
        
        this.callParent(arguments);
    }
});