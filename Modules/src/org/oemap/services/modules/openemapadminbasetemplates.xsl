<?xml version="1.0" encoding="ISO-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	
	<xsl:variable name="scripts">
		
	</xsl:variable>	
	

	<xsl:template match="Document">
	
	<script type="text/javascript">
				var gisServer = '<xsl:value-of select="gisServer" />';
				var wmsServer = gisServer + '<xsl:value-of select="wmsServer" />';
				var wmsGetCapabilities = gisServer + '<xsl:value-of select="wmsGetCapabilities" />';
				var wfsServer = gisServer + '<xsl:value-of select="wfsServer" />';
				var wmtsServer = gisServer + '<xsl:value-of select="wmtsServer" />';
				var adminproxy = window.location.protocol + '//' + window.location.host + '<xsl:value-of select="/Document/requestinfo/contextpath" />/<xsl:value-of select="adminproxy" />';
				if (adminproxy !== ''){
					adminproxy += '?url=';
					wmsGetCapabilities = adminproxy + wmsGetCapabilities;
				}
	</script>

	<xsl:choose>
		<xsl:when test="debugAdmin='true'">
			<link rel="stylesheet" type="text/css" href="/ext-4.2.1/resources/css/ext-all-neptune.css" />
			<link rel="stylesheet" type="text/css" href="/OpenEmap-Admin-WebUserInterface2/UI/oeadmin.css" />
			<script type="text/javascript" src="/ext-4.2.1/ext-debug.js"></script>
			<script type="text/javascript" src="/ext-4.2.1/ext-theme-neptune.js"></script>
    		<script type="text/javascript" src="/ext-4.2.1/locale/ext-lang-sv_SE.js"></script>
    		<script type="text/javascript" src="/OpenLayers-2.13.1/OpenLayers.js"></script>
    		<!-- script type="text/javascript" src="/geoext2-2.0.0/geoext2.js"></script-->
    		
    		<script type="text/javascript">
        		 var appPath = 'http://localhost/openemap-admin'; 
        		 Ext.Loader.setConfig({
            		disableCaching: false,
            		paths: {
                		AdmClient: '/OpenEMap-Admin-WebUserInterface2/UI/src/main/javascript',
                		OpenEMap: '/OpenEMap-WebUserInterface/src/main/javascript',
                		GeoExt: '/geoext2-2.0.0/src/GeoExt/'
            		}	
          		});
          </script>
          <script type="text/javascript" src="/OpenEMap-Admin-WebUserInterface2/UI/src/main/javascript/App.js"></script>
        
		</xsl:when>
		<xsl:otherwise>
			<script type="text/javascript">
				var appPath = '<xsl:value-of select="/Document/requestinfo/contextpath" />';
			</script>
			<link rel="stylesheet" type="text/css" href="/libs/ext-4.2.1/resources/css/ext-all-neptune.css"></link>
			<script type="text/javascript" src="/libs/ext-4.2.1/ext-all.js"></script>
			<script type="text/javascript" src="/libs/ext-4.2.1/ext-theme-neptune.js"></script>
			<script type="text/javascript" src="/libs/ext-4.2.1/locale/ext-lang-sv_SE.js"></script>
			<script type="text/javascript" src="/libs/OpenLayers-2.13.1/OpenLayers.js"></script>
			<script type="text/javascript" src="/libs/geoext2-all.js"></script>
			<script type="text/javascript">
			
			Ext.onReady(function(){
				Ext.applyIf(OpenEMap, { wsUrls :{
					//basePath: '/openemap-admin/',
					configs: 'configurations/configs',
					servers: 'settings/servers',
					layers: 'layers/layers',
					metadata: 'geometadata/getmetadatabyid',
					metadata_abstract: 'geometadata/getabstractbyid'}});
			});
			</script>
			<script type="text/javascript" src="{/Document/requestinfo/contextpath}/static/f/{/Document/module/sectionID}/{/Document/module/moduleID}/OpenEMap-Admin-debug.js"></script>
			<!-- script type="text/javascript" src="https://kartatest.e-tjansteportalen.se/openemapadminjs/OpenEMap-Admin-debug.js"></script-->
					
		</xsl:otherwise>
	</xsl:choose>
		<script type="text/javascript">
		setTimeout(2000, function(){
			$(document).ready(function(){
						AdmClient.app.admClient.setHeight(window.innerHeight - 70);
						AdmClient.app.admClient.setWidth(window.innerWidth);
			});
					
			$(window).resize(function() {
  						AdmClient.app.admClient.setHeight(window.innerHeight - 70);
  						AdmClient.app.admClient.setWidth(window.innerWidth);
					});
			});
				
		</script>
		<div id="content">
			<div id="contentitem"
				style="position: absolute; left: 0; right: 0;">
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>