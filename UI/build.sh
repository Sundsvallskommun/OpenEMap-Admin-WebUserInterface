#!/bin/sh
ZIPFILE="OpenEMap-Admin.zip"
OPENEMAP="OpenEMap-Admin.js"
OPENEMAP_DEBUG="OpenEMap-Admin-debug.js"

#sencha compile --classpath=src/main/javascript,../ext-4.2.1/src,../geoext2/src,../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and include -file ../OpenEMap-WebUserInterface/src/main/javascript/OpenEMap.js and concat -closure $OPENEMAP
sencha compile --classpath=src/main/javascript,../../ext-4.2.1/src,../../geoext2/src,../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and include -file /OpenEMap-WebUserInterface/src/main/javascript/OpenEMap.js and concat $OPENEMAP_DEBUG
#cp ../geoext2-2.0.0/geoext2-all.js geoext2-all.js
#cp $OPENEMAP src/main/webapp/$OPENEMAP
#cp $OPENEMAP ../../
cp $OPENEMAP_DEBUG ../../
cp -r src/main/webapp/resources ./
rm adm-client-0.1.0-SNAPSHOT.zip
cp -v OpenEMap-Admin-debug.js ../Modules/src/org/oemap/services/modules/staticcontent/
#zip -r -q $ZIPFILE \
#  $OPENEMAP \
 # $OPENEMAP_DEBUG \
 # es5-shim.min.js \
 # OpenLayers-2.13.1/OpenLayers.js \
 # OpenLayers-2.13.1/theme/* \
 # OpenLayers-2.13.1/img/* \
 # ext-4.2.1/ext-all.js \
 # ext-4.2.1/ext-theme-oep.js \
 # ext-4.2.1/resources/css/* \
 # ext-4.2.1/resources/ext-theme-oep/* \
 # ext-4.2.1/locale/ext-lang-sv_SE.js \
 # geoext2-all.js \
 # resources/* \
 # index.html \
 # README.md
 # cp -v OpenEMap-Admin-debug.js ../Modules/src/org/oemap/services/modules/staticcontent/