

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
        {name: 'queryable', type: 'boolean', defaultValue: false},
    	{name: 'clickable', type: 'boolean', defaultValue: false},
    	{name: 'isGroupLayer', type: 'boolean', defaultValue: false},
    	{name: 'isBaseLayer', mapping: 'wms.options.isBaseLayer',  type : 'boolean'},
        {name: 'visibility', mapping: 'wms.options.visibility', type: 'boolean'},
        {name: 'wfs', mapping: 'wfs', type: 'object'},
    	'layer' // OpenLayers reference
    ],
    proxy: {
        type: 'rest',
        url: '/openemapadmin/layers'
    }
});