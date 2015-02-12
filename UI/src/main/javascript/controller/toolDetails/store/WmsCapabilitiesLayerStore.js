Ext.define('AdmClient.store.WmsCapabilitiesLayerStore',{
    extend: 'Ext.data.JsonStore',
    requires: ['GeoExt.data.reader.WmsCapabilities'],
    model: 'GeoExt.data.WmsCapabilitiesLayerModel',
    alias: 'widget.wmsCapabilities'
});