<?xml version="1.0" encoding="ISO-8859-1" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0">
	<xsl:output method="html" version="4.0" encoding="ISO-8859-1" />
	
	<xsl:variable name="scripts">
		
	</xsl:variable>	

	<xsl:template match="Document">

		<script type="text/javascript">
			var appPath = '/openemapadmin/';
		</script>

		<link rel="stylesheet" type="text/css"
			href="/ext-4.2.1/resources/css/ext-all-neptune.css"></link>
		<script type="text/javascript" src="/ext-4.2.1/ext-all.js"></script>
		<script type="text/javascript" src="/ext-4.2.1/ext-theme-neptune.js"></script>
		<script type="text/javascript" src="/ext-4.2.1/locale/ext-lang-sv_SE.js"></script>
		<script type="text/javascript" src="/OpenLayers-2.13.1/OpenLayers.js"></script>
		<script type="text/javascript" src="/geoext2-all.js"></script>
		<script type="text/javascript" src="/adm-client-all.js"></script> 
		<script type="text/javascript">
			Ext.onReady({

			Ext.applyIf(OpenEMap, { wsUrls :{
				basePath: '/openemapadmin/',
				configs: 'configurations/configs',
				servers: 'settings/servers',
				layers: 'layers/layers',
				metadata: 'geometadata/getmetadatabyid',
				metadata_abstract: 'geometadata/getabstractbyid'}});
			});
		</script>
		<div id="content">
			<div id="contentitem"
				style="min-height: 100%; position: absolute; left: 0; right: 0;">
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>