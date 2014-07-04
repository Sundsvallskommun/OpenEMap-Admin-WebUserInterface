Ext.define('AdmClient.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['AdmClient.view.Main'],
    views: ['Main', 'MapConfiguration'],
    
    refs: [{
    	// skapa referens till form panel
        ref: 'form',
        selector: 'form'
    },{
    	// direkt referens till enskild form kontroll, bra om den behöver kommas åt på många ställen
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
    
//    onPanelRendered : function(){
//    	this.map = RigesAdminMap.getMap();
//    },
    
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
