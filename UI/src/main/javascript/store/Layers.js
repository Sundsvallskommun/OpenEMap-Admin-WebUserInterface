Ext.define('AdmClient.store.Layers', {
    extend: 'Ext.data.Store',
    model: 'AdmClient.model.Layer',
    requires : ['AdmClient.model.Layer'],
    proxy: {
        type: 'rest',
        url: '/openemapadmin/layers'
    },
    autoLoad: true
});