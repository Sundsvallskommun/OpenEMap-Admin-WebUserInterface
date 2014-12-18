<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	<xsl:template match="/">
	<link rel="stylesheet" type="text/css" href="https://kartatest.e-tjansteportalen.se/libs/ext-theme-oep/oepTheme-all.css"></link>
    <link rel="stylesheet" type="text/css" href="https://kartatest.e-tjansteportalen.se/OpenEMap-1.5.0-rc.1/resources/css/OpenEMap.css"></link>
    <style>
     input[type="button"], button {
     	padding: 0px !important;
     }
    </style>
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/libs/ext-4.2.1/ext-all.js"></script>
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/libs/ext-4.2.1/ext-theme-neptune.js"></script>
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/libs/ext-4.2.1/locale/ext-lang-sv_SE.js"></script>
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/libs/OpenLayers-2.13.1/OpenLayers.js"></script>
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/libs/proj4js/proj4-compressed.js"></script>
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/libs/proj4js/proj4_defs.js"></script>
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/libs/geoext-2.0.2-rc.1-all.js"></script> 
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/libs/es5-shim.min.js"></script>
    <script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/OpenEMap-1.5.0-rc.2/OpenEMap-1.5.0-rc.2-min.js"></script>

	<div id="mapContent"></div>
	<div id="layers" style="position: fixed; right: 10px; top: 10px;"></div>
	<div id="search" style="position: fixed; right: 10px; top: 670px; width: 300px; height: 100px;"></div>
	<script type="text/javascript">
	
	var hideOH = function(){
		$('header').css('display', 'none');
					$('#mapContent').height(window.innerHeight - 50);
					$('#mapContent').width(window.innerWidth - 50);
					$('#mapContent').css('position', 'absolute');
					$('#mapContent').css('left', 25);
					$('#mapContent').css('top', 25);
					
					$("link[src='/openemap-admin/css/global.css']").remove();
					$("link[src='/openemap-admin/css/header.css']").remove();
					$("link[src='/openemap-admin/css/layout.css']").remove();
					$("link[src='/openemap-admin/css/modules.css']").remove();
					$("link[src='/openemap-admin/css/interface.css']").remove();
					$("link[src='/openemap-admin/css/footer.css']").remove();
					$("link[src='/openemap-admin/css/openhierarchy.css']").remove();
	};
	
	var intervalId = setInterval(function(){
		if (jQuery){
			hideOH();
			clearInterval(intervalId);
		}
	}, 50);
		
		Ext.onReady(function() {

				var idx = window.location.href.indexOf('?');
				if (!~idx) {
					Ext.MessageBox.alert('Konfiguration','Du måste ange en konfigurationsid i url adresen t ex http://{url}/index.html?configid=16.')
				}
				
				var queryString = Ext.Object.fromQueryString(window.location.href.substring(idx + 1));

				var id = queryString[Object.keys(queryString)[0]];
				
				
				function init(config) {
					var mapClient = Ext.create('OpenEMap.Client');
					var gui = {
						map : {},
						toolbar : {},
						zoomTools : {},
						layers : {type: 'advanced', renderTo: 'layers'},
						baseLayers : {},
						searchFastighet : {renderTo: 'search'}
						//objectConfig : {x: 100, y: 400, width: 300, height: 200, collapsed: true}
					};
					
					//just for demo, remove
					config.tools.push('ZoomSelector');
					
					

					mapClient.destroy();
					mapClient.configure(Ext.clone(config), {
						gui : gui
					});
					

					var labels = new OpenLayers.Rule({
						filter : new OpenLayers.Filter.Comparison({
							type : OpenLayers.Filter.Comparison.EQUAL_TO,
							property : "type",
							value : "label"
						}),
						symbolizer : {
							pointRadius : 20,
							fillOpacity : 0,
							strokeOpacity : 0,
							label : "${label}"
						}
					});
					mapClient.drawLayer.styleMap.styles['default'].addRules([ labels ]);
				}
				
				Ext.Ajax.request({
					url : 'adminconfigs/config/' + id,
					method : 'GET',
					success : function(evt){
						var config = JSON.parse(evt.responseText);
						init(config);
					}
				});
			});
		
		
		</script>

	</xsl:template>
</xsl:stylesheet>