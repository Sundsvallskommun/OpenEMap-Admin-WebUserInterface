#  OpenEMap-Admin-WebUserInterface

Administrative client for map-client

Based on Ext JS 4

Ext JS application name is AdmClient

## Development

Assumed external dependencies:
 * Ext JS 4.2.1 in folder ext-4.2.1
 * OpenLayers 2.13 in folder OpenLayers-2.13

When running map-client in debug mode you might want to setup proxy rules for server communications:

    ProxyPass               /search/lm   http://localhost:8080/search-lm
    ProxyPassReverse        /search/lm   http://localhost:8080/search-lm
