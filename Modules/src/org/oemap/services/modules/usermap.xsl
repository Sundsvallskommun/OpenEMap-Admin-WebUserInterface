<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	<xsl:template match="Document">
    <style>
     input[type="button"], button {
     	padding: 0px !important;
     }
    </style>
	<xsl:choose>
		<xsl:when test="debug='true'">
			<link rel="stylesheet" type="text/css" href="/libs/ext-4.2.1/packages/ext-theme-oep/build/resources/ext-theme-oep-all.css"></link>
		    <link rel="stylesheet" type="text/css" href="/OpenEMap-WebUserInterface/resources/css/OpenEMap.css"></link>
		    <script type="text/javascript" src="/libs/ext-4.2.1/ext-all-debug.js"></script>
		    <script type="text/javascript" src="/libs/ext-4.2.1/ext-theme-neptune.js"></script>
		    <script type="text/javascript" src="/libs/ext-4.2.1/locale/ext-lang-sv_SE.js"></script>
		    <script type="text/javascript" src="/libs/OpenLayers-2.13.1/OpenLayers.js"></script>
		    <script type="text/javascript" src="/libs/proj4js/proj4-compressed.js"></script>
		    <script type="text/javascript" src="/libs/proj4js/proj4_defs.js"></script>
    		
    		<script type="text/javascript">
        		 var appPath = 'http://localhost/openemap-admin'; 
        		 Ext.Loader.setConfig({
            		disableCaching: false,
            		paths: {
                		AdmClient: '/OpenEMap-Admin-WebUserInterface/UI/src/main/javascript',
                		OpenEMap: '/OpenEMap-WebUserInterface/src/main/javascript',
                		GeoExt: '/libs/geoext-2.0.1/src/GeoExt/'
            		}	
          		});
          </script>
          <script type="text/javascript" src="/OpenEMap-WebUserInterface/src/main/javascript/Client.js"></script>
		</xsl:when>
		<xsl:otherwise>
			<link rel="stylesheet" type="text/css" href="/libs/ext-theme-oep/ext-theme-oep-all.css"></link>
		    <link rel="stylesheet" type="text/css" href="/OpenEMap-1.6.0-rc.1/resources/css/OpenEMap.css"></link>
		    <script type="text/javascript" src="/libs/ext-4.2.1/ext-all.js"></script>
		    <script type="text/javascript" src="/libs/ext-4.2.1/ext-theme-neptune.js"></script>
		    <script type="text/javascript" src="/libs/ext-4.2.1/locale/ext-lang-sv_SE.js"></script>
		    <script type="text/javascript" src="/libs/OpenLayers-2.13.1/OpenLayers.js"></script>
		    <script type="text/javascript" src="/libs/proj4js/proj4-compressed.js"></script>
		    <script type="text/javascript" src="/libs/proj4js/proj4_defs.js"></script>
		    <script type="text/javascript" src="/libs/geoext-2.0.2-rc.1-all.js"></script> 
		    <script type="text/javascript" src="/libs/es5-shim.min.js"></script>
			<script type="text/javascript" src="/OpenEMap-1.6.0-rc.1/OpenEMap-1.6.0-rc.1-debug.js"></script>
	
		</xsl:otherwise>
	</xsl:choose>
		<div id="mapContent"></div>
		<div id="layers" style="position: fixed; right: 10px; top: 10px;"></div>
		<div id="search" style="position: fixed; right: 10px; top: 670px; width: 300px; height: 100px;"></div>
		<script type="text/javascript">
	
		var hideOH = function(){
			$('header').css('display', 'none');
						$('#mapContent').height(window.innerHeight);
						$('#mapContent').width(window.innerWidth);
						$('body').css('overflow', 'hidden');
						//$('#mapContent').css('position', 'absolute');
						//$('#mapContent').css('left', 0);
						//$('#mapContent').css('top', 0);
						
						$("link[src='{/document/requestinfo/contextpath}/css/global.css']").remove();
						$("link[src='{/document/requestinfo/contextpath}/css/header.css']").remove();
						$("link[src='{/document/requestinfo/contextpath}/css/layout.css']").remove();
						$("link[src='{/document/requestinfo/contextpath}/css/modules.css']").remove();
						$("link[src='{/document/requestinfo/contextpath}/css/interface.css']").remove();
						$("link[src='{/document/requestinfo/contextpath}/css/footer.css']").remove();
						$("link[src='{/document/requestinfo/contextpath}/css/openhierarchy.css']").remove();
		};
		
		var intervalId = setInterval(function(){
			if (jQuery){
				hideOH();
				clearInterval(intervalId);
			}
		}, 50);
		
		
		function init(config) {
			var mapClient = Ext.create('OpenEMap.Client');
			var gui = {
				map : {renderTo: 'mapContent'},
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

		</script>				
	<xsl:choose>
		<xsl:when test="debug='true'">
			<script type="text/javascript">
				Ext.onReady(function() {
	
					var idx = window.location.href.indexOf('?');
					if (!~idx) {
						Ext.MessageBox.alert('Konfiguration','Du måste ange en konfigurationsid i url adresen t ex http://{url}/index.html?configid=16.')
					}

					var queryString = Ext.Object.fromQueryString(window.location.href.substring(idx + 1));
	
					var id = queryString[Object.keys(queryString)[0]];
					OpenEMap.username='<xsl:value-of select="usr" />';
					OpenEMap.wsUrls.basePath = '/openemap-admin';
					OpenEMap.wsUrls.adminconfigs = '/adminconfigs';
					OpenEMap.wsUrls.configs = '/configs';
					Ext.Ajax.request({
						url : OpenEMap.wsUrls.basePath + OpenEMap.wsUrls.configs + '/config/' + id,
						method : 'GET',
						success : function(evt){
							var config = JSON.parse(evt.responseText);
							if (!config) {
								Ext.MessageBox.alert('Konfiguration','Angiven konfiguration saknas: ' + id + ' Kontakta systemadministratören.');
							} else {
								init(config);
							}
						}
					});
				});
			</script>
		</xsl:when>
		<xsl:otherwise>
			<script type="text/javascript">
				Ext.onReady(function() {
	
					var idx = window.location.href.indexOf('?');
					if (!~idx) {
						Ext.MessageBox.alert('Konfiguration','Du måste ange en konfigurationsid i url adresen t ex http://{url}/index.html?configid=16.')
					}
					
					var queryString = Ext.Object.fromQueryString(window.location.href.substring(idx + 1));
	
					var id = queryString[Object.keys(queryString)[0]];

					OpenEMap.username='<xsl:value-of select="usr" />';
		        	OpenEMap.wsUrls.basePath = '/openemapadmin'; 
					OpenEMap.wsUrls.adminconfigs = '/adminconfigs';
					OpenEMap.wsUrls.configs = '/configs';

					Ext.Ajax.request({
						url : OpenEMap.wsUrls.basePath + OpenEMap.wsUrls.configs + '/config/' + id,
						method : 'GET',
						success : function(evt){
							var config = JSON.parse(evt.responseText);
							if (!config) {
								Ext.MessageBox.alert('Konfiguration','Angiven konfiguration saknas: ' + id + ' Kontakta systemadministratören.');
							} else {
								init(config);
							}
						}
					});
				});
			</script>
		</xsl:otherwise>
	</xsl:choose>

	</xsl:template>
</xsl:stylesheet>