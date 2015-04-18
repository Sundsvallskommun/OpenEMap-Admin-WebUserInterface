set OPENEMAPADMIN=OpenEMap-Admin
set VERSIONBIG=1.6
set VERSIONSMALL=.0-rc.3
set OPENEMAPADMINJS=%OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%-min.js
set OPENEMAPADMINJS_DEBUG=%OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%-debug.js
set RELEASE_KAT=%OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%

cd release
rd /s /q %RELEASE_KAT%
del %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%.zip
sencha compile --classpath=../src/main/javascript,../../../libs/ext-4.2.1/src,../../../libs/geoext-2.0.1/src,../../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and concat -closure %RELEASE_KAT%/%OPENEMAPADMINJS%
sencha compile --classpath=../src/main/javascript,../../../libs/ext-4.2.1/src,../../../libs/geoext-2.0.1/src,../../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and concat %RELEASE_KAT%/%OPENEMAPADMINJS_DEBUG%
xcopy /s /y ..\src\main\webapp\resources %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%
md %RELEASE_KAT%\lib
md %RELEASE_KAT%\lib\ext
md %RELEASE_KAT%\lib\ext\resources\ext-theme-neptune
md %RELEASE_KAT%\lib\ext\locale
md %RELEASE_KAT%\lib\OpenLayers
md %RELEASE_KAT%\lib\geoext
copy ..\src\main\javascript\OpenEMapAdmin.js %RELEASE_KAT%\
copy %RELEASE_KAT%\%OPENEMAPADMINJS% %RELEASE_KAT%\%OPENEMAPADMIN%-min.js
copy %RELEASE_KAT%\%OPENEMAPADMINJS_DEBUG% %RELEASE_KAT%\%OPENEMAPADMIN%-debug.js
copy ..\..\..\libs\ext-4.2.1\ext-all.js %RELEASE_KAT%\lib\ext\ext-all.js
copy ..\..\..\libs\ext-4.2.1\ext-debug.js %RELEASE_KAT%\lib\ext\ext-debug.js
copy ..\..\..\libs\ext-4.2.1\ext-theme-neptune.js %RELEASE_KAT%\lib\ext\ext-theme-neptune.js
xcopy /s /y ..\..\..\libs\ext-4.2.1\locale %RELEASE_KAT%\lib\ext\locale
xcopy /s /y ..\..\..\libs\ext-4.2.1\resources\ext-theme-neptune %RELEASE_KAT%\lib\ext\resources\ext-theme-neptune
copy ..\..\..\libs\OpenLayers-2.13.1\OpenLayers.js %RELEASE_KAT%\lib\OpenLayers\OpenLayers.js
copy ..\..\..\libs\geoext-2.0.2-rc.1-all.js %RELEASE_KAT%\lib\geoext\geoext-all.js
xcopy /s /y %RELEASE_KAT% ..\..\Modules\src\org\oemap\services\modules\staticcontent\OpenEMapAdmin\

7z a -tzip %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%.zip -r %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL% -x!doc
cd..
# Copy to Admin Eclipse project
#7z -unzip %OPENEMAPADMIN%-%VERSIONBIG%%VERSIONSMALL%.zip ?%OPENEMAPADMIN%
pause
