<?xml version="1.0" encoding="ISO-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	
	<xsl:variable name="scripts">
		
	</xsl:variable>	
	

	<xsl:template match="Document">
	
	<script type="text/javascript">
				defaultWMSServer = window.location.protocol + '//' + window.location.host + '<xsl:value-of select="/Document/requestinfo/contextpath" />/<xsl:value-of select="adminproxy" />?url=<xsl:value-of select="wmsServer" />';
	</script>

	<xsl:choose>
		<xsl:when test="debugAdmin='true'">
			<link rel="stylesheet" type="text/css" href="/ext-4.2.1/resources/css/ext-all-neptune.css" />
			<link rel="stylesheet" type="text/css" href="/OpenEmap-Admin-WebUserInterface/oeadmin.css" />
			<script type="text/javascript" src="/ext-4.2.1/ext-debug.js"></script>
			<script type="text/javascript" src="/ext-4.2.1/ext-theme-neptune.js"></script>
    		<script type="text/javascript" src="/ext-4.2.1/locale/ext-lang-sv_SE.js"></script>
    		<script type="text/javascript" src="/OpenLayers-2.13.1/OpenLayers.js"></script>
    		<script type="text/javascript" src="/geoext2-2.0.0/geoext2-all.js"></script>
    		
    		<script type="text/javascript">
        		 var appPath = '/openemap-admin'; 
        		 Ext.Loader.setConfig({
            		disableCaching: false,
            		paths: {
                		AdmClient: '/OpenEMap-Admin-WebUserInterface/src/main/javascript',
                		OpenEMap: '/OpenEMap-WebUserInterface/src/main/javascript',
                		GeoExt: '/geoext2-2.0.0/src/GeoExt/'
            		}	
          		});
          </script>
          <script type="text/javascript" src="/OpenEMap-Admin-WebUserInterface/src/main/javascript/App.js"></script>
        
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
					
		</xsl:otherwise>
	</xsl:choose>
		<div id="content">
			<div id="contentitem"
				style="min-height: 100%; min-width: 100%; position: absolute; left: 0; right: 0;">
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>