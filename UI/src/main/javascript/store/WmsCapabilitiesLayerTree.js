Ext.define('AdmClient.store.WmsCapabilitiesLayerTree',{
    extend: 'Ext.data.TreeStore',
    requires: ['GeoExt.data.reader.WmsCapabilities'],
    model: 'GeoExt.data.WmsCapabilitiesLayerModel',

    alias: 'widget.wmsCapabilitiesLayerTree',

    defaultRootProperty: 'layers'
});