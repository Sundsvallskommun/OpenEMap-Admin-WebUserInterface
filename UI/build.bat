set OPENEMAPADMIN=OpenEMap-Admin
set VERSIONBIG=1.6
set VERSIONSMALL=.0-rc.2
set OPENEMAPADMINJS=%OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%-min.js
set OPENEMAPADMINJS_DEBUG=%OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%-debug.js

cd release
rd /s /q %OPENEMAPADMIN%-%VERSIONBIG%¤VERSIONSMALL%
del %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%.zip
sencha compile --classpath=../src/main/javascript,../../../libs/ext-4.2.1/src,../../../libs/geoext-2.0.1/src,../../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and concat -closure %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%/%OPENEMAPADMINJS%
sencha compile --classpath=../src/main/javascript,../../../libs/ext-4.2.1/src,../../../libs/geoext-2.0.1/src,../../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and concat %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%/%OPENEMAPADMINJS_DEBUG%
xcopy /s /y ..\src\main\webapp\resources %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%
md %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib
md %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\ext-4.2.1
md %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\ext-4.2.1\resources\ext-theme-neptune
md %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\ext-4.2.1\locale
md %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\OpenLayers-2.13.1
copy %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\%OPENEMAPADMINJS% %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\%OPENEMAPADMIN%-min.js
copy %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\%OPENEMAPADMINJS_DEBUG% %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\%OPENEMAPADMIN%-debug.js
copy ..\..\..\libs\ext-4.2.1\ext-all.js %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\ext-4.2.1\ext-all.js
copy ..\..\..\libs\ext-4.2.1\ext-debug.js %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\ext-4.2.1\ext-debug.js
copy ..\..\..\libs\ext-4.2.1\ext-theme-neptune.js %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\ext-4.2.1\ext-theme-neptune.js
xcopy /s /y ..\..\..\libs\ext-4.2.1\locale %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\ext-4.2.1\locale
xcopy /s /y ..\..\..\libs\ext-4.2.1\resources\ext-theme-neptune %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\ext-4.2.1\resources\ext-theme-neptune
copy ..\..\..\libs\OpenLayers-2.13.1\OpenLayers.js %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\OpenLayers-2.13.1\OpenLayers.js
copy ..\..\..\libs\geoext-2.0.2-rc.1-all.js %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%\lib\geoext-2.0.2-rc.1-all.js

7z a -tzip %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%.zip -r %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL% -x!doc
# Copy to Admin Eclipse project
#7z -unzip %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%.zip ?%OPENEMAPADMIN%
pause
