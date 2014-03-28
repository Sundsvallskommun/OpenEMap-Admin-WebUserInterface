#!/bin/sh
sencha compile --classpath=src/main/javascript,ext-4.2.1/src,geoext2/src,../map-client/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and include -file ../map-client/src/main/javascript/OpenEMap.js and concat -closure adm-client-all.js
sencha compile --classpath=src/main/javascript,ext-4.2.1/src,geoext2/src,../map-client/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and include -file ../map-client/src/main/javascript/OpenEMap.js and concat adm-client-debug-all.js
#cp geoext2/geoext2-all.js geoext2-all.js
cp adm-client-all.js src/main/webapp/adm-client-all.js
cp adm-client-all.js ../../
cp adm-client-debug-all.js ../../
cp -r src/main/webapp/resources ./
rm adm-client-0.1.0-SNAPSHOT.zip
zip -r -q adm-client-0.1.0-SNAPSHOT.zip \
  adm-client-all.js \
  adm-client-debug-all.js \
  es5-shim.min.js \
  OpenLayers-2.13.1/OpenLayers.js \
  OpenLayers-2.13.1/theme/* \
  OpenLayers-2.13.1/img/* \
  ext-4.2.1/ext-all.js \
  ext-4.2.1/ext-theme-oep.js \
  ext-4.2.1/resources/css/* \
  ext-4.2.1/resources/ext-theme-oep/* \
  ext-4.2.1/locale/ext-lang-sv_SE.js \
  geoext2-all.js \
  resources/* \
  README.md
  
