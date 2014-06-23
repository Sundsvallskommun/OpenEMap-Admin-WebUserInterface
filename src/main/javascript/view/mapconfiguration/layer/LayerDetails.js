Ext.define('AdmClient.view.mapconfiguration.layer.LayerDetails', {
	extend : 'Ext.window.Window',
	alias : 'widget.layerDetails',

	requires: [
		'Ext.window.Window',
		'GeoExt.data.WfsCapabilitiesLayerStore'
	],
	layout: {
		type : 'border',
		margin : 8
	},
	title : 'Lager inst&auml;llningar',
	width : 600,
	height : 400,

	constructor : function(){
		this.layer = arguments[0].selectedLayer;

		if (this.layer === null){
			Ext.Msg.show({
				title: 'Inget lagernamn.',
				msg: 'Kan ej editera grupplager.',
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.WARNING
			});
			this.close();
			return;
		}

		this.title +=  ' - ' + this.layer.name;

		this.callParent(arguments);
	},

	initComponent : function() {

		var self = this;
		this.x = Math.ceil(window.innerWidth / 2 - this.innerWidth / 2),
		this.y = Math.ceil(window.innerHeight / 2 - this.innerHeight / 2),

		this.modal = true,
		this.store = Ext.create('AdmClient.store.LayerDetails');
		this.store.setUrl('apa');

		this.items = [{
			region: 'center',
			xtype: 'grid',
			itemId: 'layerDetailsGrid',
			store: store,
			columns: [{
				text: 'Kolumn'
			},{
				text: 'Alias'
			},{
				text: 'S&ouml;kbar'
			},{
				text: 'Synlig'
			}]
		},{
			region: 'south',
			xtype : 'toolbar',
			items : [
			'->',{
				xtype: 'button',
				text: 'Spara',
				itemId: 'saveLayerDetail'
			},{
				xtype : 'button',
				text : 'Avbryt',
				itemId: 'cancelLayerDetail',
				handler: function(){
					self.close();
				}
			}
			]
		}],

		this.callParent(arguments);
	}
});