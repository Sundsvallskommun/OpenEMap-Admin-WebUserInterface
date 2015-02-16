set OPENEMAPADMIN=OpenEMap-Admin-1.6.0-rc.1
set OPENEMAPADMINJS=%OPENEMAPADMIN%-min.js
set OPENEMAPADMINJS_DEBUG=%OPENEMAPADMIN%-debug.js

cd release
rd /s /q %OPENEMAPADMIN%
del %OPENEMAPADMIN%.zip
sencha compile --classpath=../src/main/javascript,../../../libs/ext-4.2.1/src,../../../libs/geoext-2.0.1/src,../../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and concat -closure %OPENEMAPADMIN%/%OPENEMAPADMINJS%
sencha compile --classpath=../src/main/javascript,../../../libs/ext-4.2.1/src,../../../libs/geoext-2.0.1/src,../../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and concat %OPENEMAPADMIN%/%OPENEMAPADMINJS_DEBUG%
xcopy /s /y ..\src\main\webapp\resources %OPENEMAPADMIN%
7z a -tzip %OPENEMAPADMIN%.zip -r %OPENEMAPADMIN% -x!doc

#del /q ..\Modules\src\org\oemap\services\modules\staticcontent\*
#copy /v %OPENEMAPADMIN% ..\Modules\src\org\oemap\services\modules\staticcontent\
#copy /v %OPENEMAPADMIN_DEBUG% ..\Modules\src\org\oemap\services\modules\staticcontent\
pause
