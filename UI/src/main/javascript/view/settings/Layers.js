/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

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