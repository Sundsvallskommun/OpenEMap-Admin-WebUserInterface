Ext.define('AdmClient.view.settings.LayerSettings', {
    extend : 'Ext.form.Panel',
    requires : [],
    alias : 'widget.layersettings',
    defaultType: 'textfield',
    initComponent : function() {

        this.items = [ {
            fieldLabel : 'Name',
            name : 'name'
        } ];

        this.callParent(arguments);
    }
});