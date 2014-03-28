/**
 * NOTE: could share code with ObjectConfig view in OpenEMap
 */
Ext.define('AdmClient.view.mapconfiguration.tools.details.DrawObject', {
	extend : 'Ext.form.Panel',
	alias : 'widget.drawobject',
	
	type: 'drawobject',
	
	typeLabel: 'Type',
    widthLabel: 'Width',
    lengthLabel: 'Length',
    m1Label: 'M1',
    m2Label: 'M2',
    angleLabel: 'Angle',
    
	initComponent : function() {
	    
	    var formItems = [{
            xtype: 'numberfield',
            fieldLabel: this.widthLabel,
            itemId: 'w',
            minValue: 0
        },{
            xtype: 'numberfield',
            fieldLabel: this.lengthLabel,
            itemId: 'l',
            minValue: 0
        },{
            xtype: 'numberfield',
            fieldLabel: this.m1Label,
            itemId: 'm1',
            minValue: 0
        },{
            xtype: 'numberfield',
            fieldLabel: this.m2Label,
            itemId: 'm2',
            minValue: 0
        },{
            xtype: 'numberfield',
            itemId: 'angle',
            fieldLabel: this.angleLabel,
            value: 0
        }];
	    
		this.items = [ {
			xtype : 'checkboxfield',
			boxLabel : 'User customizable'
		}, {
		    width: 230,
		    xtype : 'radiogroup',
            vertical : true,
            fieldLabel: 'Type',
            itemId: 'type',
		    items : [ {
                boxLabel : '<div class="objectconfig-radio-r"></div>',
                name : 'rb',
                inputValue : 'R',
                checked : true
            }, {
                boxLabel : '<div class="objectconfig-radio-l"></div>',
                name : 'rb',
                enabled: false,
                inputValue : 'L'
            }, {
                boxLabel : '<div class="objectconfig-radio-d"></div>',
                name : 'rb',
                enabled: false,
                inputValue : 'D'
            }, {
                boxLabel : '<div class="objectconfig-radio-o"></div>',
                name : 'rb',
                enabled: false,
                inputValue : 'O'
            } ]
		} ];
		
		this.items = this.items.concat(formItems);
		
		this.callParent(arguments);
		
		this.getConfig();
	},
	
	setConfig: function() {
	    var toolCfg = this.getToolConfig();
	},
	
	getConfig: function() {
	    var toolCfg = this.getToolConfig();
	    var objectConfig = toolCfg.objectConfig;
	    
	    if (objectConfig) {
	        objectConfig.type = this.down('#type').getValue();
	    }
	},
	
	getToolConfig: function() {
	    return AdmClient.app.config.tools.filter(function(tool) {
	        return tool.type = this.type;
	    }, this);
	}
});