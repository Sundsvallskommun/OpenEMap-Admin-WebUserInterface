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
		this.x = Math.ceil(window.innerWidth / 2 - this.innerWidth / 2);
		this.y = Math.ceil(window.innerHeight / 2 - this.innerHeight / 2);

		this.modal = true;
		var pathArray = this.layer.wms.url.split('/');
		var wfsUrl = 'adminproxy?url=' + pathArray[0] + '//' + pathArray[2] + (this.layer.wfs.url || '/geoserver/wfs') + '?service=wfs&request=DescribeFeatureType&version=1.0.0&typeName=' + this.layer.name;
		this.store = Ext.create('AdmClient.store.LayerDetails');
		this.store.setUrl(wfsUrl);
		this.store.load({
			scope: this
		});

		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit : 1
		});

		this.items = [{
			region: 'center',
			xtype: 'grid',
			itemId: 'layerDetailsGrid',
			store: this.store,

			plugins : [ this.cellEditing ],
			columns: [{
				text: 'Kolumn',
				dataIndex : 'name'
			},{
				text: 'Alias',
				dataIndex: 'alias',
				editor : {
					allowBlank : false
				},
			},{
				text: 'Synlig',
				xtype: 'checkcolumn',
				dataIndex: 'visible'
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
		}]

		this.callParent(arguments);
	}
});