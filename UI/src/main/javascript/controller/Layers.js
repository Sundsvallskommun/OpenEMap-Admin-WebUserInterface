Ext.define('AdmClient.controller.Layers', {
    extend : 'Ext.app.Controller',
    requires : ['AdmClient.view.settings.Layers',
                'AdmClient.view.settings.LayerSettings'],
    refs: [{
        ref: 'layers',
        selector: '#layers'
    },{
        ref: 'wmslayers',
        selector: '#wmslayers'
    }],
    views: ['settings.Layers'],
    stores: ['Layers'],
    
    init : function() {
        this.control({
            '#add': {
                click: this.onAddClick
            },
            '#layers': {
                edit: this.onEdit
            },
            '#save': {
                click: this.onSaveClick
            },
            '#settings': {
                click: this.onSettingsClick
            },
            '#delete': {
                click: this.onDeleteClick
            }
        });
    },

    onSaveClick: function() {
        var layers = this.getLayersStore();
        layers.sync();
    },
    onAddClick: function() {
        var layers = this.getLayersStore();
        var wmslayers = this.getWmslayers();
        var selection = wmslayers.getSelectionModel().getSelection();
        
        if (selection.length !== 1) return;
        
        var wmslayer = selection[0];
        
        var layer = Ext.create('AdmClient.model.Layer', {
            name: wmslayer.get('name'),
            isGroupLayer : null,
            wms: {
                params: {
                    layers: wmslayer.get('name')
                }
            }
        });
        
        layers.add(layer);
        
        layer.save();
    },
    onEdit: function(editor, e) {
        e.record.save();
    },
    onSettingsClick: function(gridview, rl, rowIndex, colIndex, e, record) {
        var layerSettings = Ext.create('AdmClient.view.settings.LayerSettings');
        
        var w = Ext.create('Ext.Window', {
            height: 200,
            width: 300,
            padding: 10,
            title: 'Layer settings',
            layout: 'fit',
            modal: true,
            items: layerSettings,
            buttons: [{ text: 'Save'}]
        });
        
        w.show();
                
        layerSettings.getForm().loadRecord(record);
    },
    onDeleteClick: function(gridview, rl, rowIndex, colIndex, e, record) {
        record.destroy();
    }
});