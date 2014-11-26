Ext.define('AdmClient.view.MapConfiguration', {
	extend : 'Ext.panel.Panel',
	requires : [ 'GeoExt.panel.Map' ],
	alias : 'widget.mapConfiguration',
	layout : 'border',
	border : false,

	initComponent : function() {
		this.items = [ {
			border : false,
			bodyPadding : 10,
			region : 'north',
			tbar : [ {
				xtype : 'combo',
				itemId : 'configurations',
				displayField: 'name',
				enableKeyEvents : true
			}, {
				text : 'Spara',
				itemId : 'saveConfiguration'
			} ]
		}, {
			xtype : 'tabpanel',
			region : 'center',
			items : [ {
				title : 'Map extent',
				layout : 'fit',
				border : false,
				itemId : 'mapPanel',
				disabled : true,
				tbar : [ {
					xtype : 'button',
					text : 'Pan',
					itemId : 'pan',
					icon : 'icons/arrow-move.png',
					enableToggle : true,
					pressed : true

				}, {
					xtype : 'button',
					itemId : 'markExtent',
					text : 'Mark extent',
					icon : 'icons/figur-R.png',
					iconCls : 'extent',
					enableToggle : true
				},('->'),{
					xtype : 'textfield',
					disabled : true,
					itemId : 'configId'
				},{
					xtype: 'checkbox',
					fieldLabel : 'Autoclear draw layer',
					itemId : 'autoClearDrawLayer'
						},{
					xtype : 'textfield',
					itemId : 'attribution',
					enableKeyEvents : true,
					fieldLabel : 'Attribution'
				} ],
				margin : 12
			}, {
				title : 'Tools',
				layout : 'border',
				border : false,
				itemId : 'tools',
				disabled : true,
				margin : 12,
				items : [ {
					xtype : 'toolsGrid',
					itemId : 'toolsGrid',
					region : 'north'
				}, {
					xtype : 'panel',
					region : 'center',
					itemId : 'toolGeneral'
				} ]
			}, {
				title : 'Search',
				xtype : 'searchPanel',
				itemId : 'searchGridConfig',
				layout : 'fit',
				disabled : true
			}, {
				title : 'Layers',
				xtype : 'layerPanel',
				itemId: 'layerTab',
				disabled : true
			}, {
				title: 'Preview',
				itemId: 'previewMap',
				layout: 'fit',
				disabled : true,
				hidden: true
			}]
		}, {
			title : 'Config',
			itemId : 'configurationPreviewPanel',
			layout : 'fit',
			disabled : true,
			collapsible : true,
			collapsed : true,
			height : 600,
			region : 'south',
			items : [{xtype : 'textarea', itemId : 'configurationTextfield'}],
			bbar : ['->', {
				xtype : 'button',
				text : 'Export'
			}]
		} ];

		this.callParent(arguments);

	}
});