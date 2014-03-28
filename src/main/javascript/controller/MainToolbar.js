Ext.define('AdmClient.controller.MainToolbar', {
	extend : 'Ext.app.Controller',
	init : function() {
		this.control({
			'#about' : {
				click : this.aboutButtonClick
			}
		});
	},
	
	aboutButtonClick : function(btn, evt) {
		new AdmClient.view.about.About().show();
	}
});