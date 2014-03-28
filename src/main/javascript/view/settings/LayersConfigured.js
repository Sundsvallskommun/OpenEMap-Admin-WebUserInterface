Ext.define('AdmClient.view.settings.LayersConfigured', {
    extend : 'Ext.grid.Panel',
    requires : [ 'AdmClient.store.Layers' ],
    alias : 'widget.layersconfigured',
    title : 'Configured layers',
    store : 'Layers',
    title : 'Configured layers',
    itemId : 'layers',
    autoScroll : true,
    minHeight : 200,
    hideHeaders : true,
    selType : 'cellmodel',
    viewConfig: {
        stripeRows: false
    },
    initComponent : function() {
        /*this.plugins = [ Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit : 1
        }) ];*/
        
        this.columns = [ {
            dataIndex : "name",
            sortable : false,
            flex : 1/*,
            editor : {
                xtype : 'textfield',
                allowBlank : false
            }*/
        }, {
            xtype:'actioncolumn',
            width:25,
            itemId: 'settings',
            items: [{
                icon: 'resources/images/gear.png',
                tooltip: 'Settings'
            }]
        }, {
            xtype:'actioncolumn',
            width:25,
            itemId: 'delete',
            items: [{
                icon: 'resources/images/cross.png',
                tooltip: 'Delete'
            }]
        } ];

        this.callParent(arguments);
    }
});