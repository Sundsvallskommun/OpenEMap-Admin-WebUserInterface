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
* A controller to handle main view.
*/

Ext.define('AdmClient.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['AdmClient.view.Main'],
    views: ['Main', 'MapConfiguration'],
    
    refs: [{
      ref: 'form',
        selector: 'form'
    },{
        ref: 'currentZoom',
        selector: '#currentZoom'
    },{
    	ref : 'center',
    	selector : '#center'
    }
    ],
    
    init: function() {
        this.control({
            '#mapPanel' : {
            	aftermapmove : this.onMapMove
            },
            
            '#currentZoom' : {
            	keyup : this.onZoomKeyUp
            }
        });
    },
    
    onZoomKeyUp : function(evt, e){
    	var self = this;
    	var zoom = parseInt(evt.value, 10);
    	if ( (zoom > 0)  && (zoom < 20) && (e.keyCode === e.ENTER)){
    		self.map.setCenter(self.map.center, zoom);
    	}
    },
    
    setZoom : function(zoom){
    	
    }
});
