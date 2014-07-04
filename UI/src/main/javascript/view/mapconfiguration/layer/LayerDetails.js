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
		this.panelGrid = arguments[0].grid;

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

		this.store.addListener('load', function(store, records, successful, eOpts){
			records.forEach(function(l){
				if (self.layer.metadata && self.layer.metadata.attributes && self.layer.metadata.attributes[l.data.name] instanceof Object){
					l.data.alias = self.layer.metadata.attributes[l.data.name].alias;
					l.data.visible = true;
				}
			});
			store.update();
		}); 

		this.store.setUrl(wfsUrl);
		this.store.load();

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
				header: 'Kolumn',
				dataIndex : 'name'
			},{
				header: 'Alias',
				dataIndex: 'alias',
				editor : {
					allowBlank : false
				}
			},{
				header: 'Synlig',
				xtype: 'checkcolumn',
				dataIndex: 'visible',
				listeners :{
					'checkchange': function(chkBox, rowIdx, checked, eOpts){
						if (checked){
							self.store.data.items[rowIdx].data.alias = self.store.data.items[rowIdx].data.alias || self.store.data.items[rowIdx].data.name;
						}else{
							self.store.data.items[rowIdx].data.alias = '';
						}
						self.store.update();
					}
				}
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