/*
Copyright Härnösands kommun(C) 2014 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    All rights reserved. This program and the accompanying materials
    are made available under the terms of the GNU Affero General Public License
    which accompanies this distribution, and is available at
    http://www.gnu.org/licenses/agpl-3.0.html
 */


/**
* A controller to handle layer view.
*/

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
