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

Ext.define('AdmClient.controller.LayerDetails', {
	extend: 'Ext.app.Controller',
	requires : [ 'AdmClient.view.mapconfiguration.layer.LayerDetails'],
	refs : [{
		ref : 'saveLayerDetail',
		selector : '#saveLayerDetail'
	},{
		ref: 'layerDetailsGrid',
		selector: '#layerDetailsGrid'
	},{
		ref: 'layerDetails',
		selector: 'layerDetails'
	}],

	init : function() {
		this.control({
			'#saveLayerDetail' : {
				click : this.save
			}
		});
	},

	save : function(btn, e, eOpts){
		var store = this.getLayerDetailsGrid().getStore();
		var layer = this.getLayerDetails().layer;
		layer.metadata = {};
		store.data.items.forEach(function(c){
			if (c.data.visible || c.data.alias){
				if (c.data.alias === "") return;
				if (!layer.metadata.attributes){
					layer.metadata.attributes = {};
				}
				layer.metadata.attributes[c.data.name] = {alias : c.data.alias};
			}
		});

		if (Object.keys(layer.metadata).length === 0){
			delete layer.metadata;
		}

		var store = this.getLayerDetails().panelGrid.store;
		AdmClient.app.config.layers = store.treeStore.getLayerConfiguration();

		this.getLayerDetails().close();
	}
});