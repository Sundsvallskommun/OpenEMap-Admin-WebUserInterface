

Ext.define('AdmClient.model.Layer', {
    extend : 'Ext.data.Model',
    fields : [ 
    	'layerId', 
    	'name', 
    	'wms', 
    	'wfs', 
    	'group', 
    	'metadata',
    	'isSearchable',
    	'urlToMetadata',
    	'serverId',
    	{name: 'isBaseLayer', mapping: 'wms.options.isBaseLayer',  type : 'boolean'},
    	'layer' // OpenLayers reference
    ],
    proxy: {
        type: 'rest',
        url: '/openemapadmin/layers'
    }
});