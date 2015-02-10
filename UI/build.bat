set OPENEMAPADMIN_VERSION=1.5.0
set ZIPFILE=OpenEMap-Admin%OPENEMAPADMIN_VERSION%.zip
set OPENEMAPADMIN=OpenEMap-Admin-%OPENEMAPADMIN_VERSION%-min.js
set OPENEMAPADMIN_DEBUG=OpenEMap-Admin-%OPENEMAPADMIN_VERSION%-debug.js
#set OPENEMAP_VERSION=1.5.0-rc.4
#set OPENEMAP=OpenEMap-%OPENEMAP_VERSION%-min.js
#set OPENEMAP_DEBUG=OpenEMap-%OPENEMAP_VERSION%-debug.js

sencha compile --classpath=src/main/javascript,../../libs/ext-4.2.1/src,../../libs/geoext-2.0.1/src,../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and concat -closure %OPENEMAPADMIN%
sencha compile --classpath=src/main/javascript,../../libs/ext-4.2.1/src,../../libs/geoext-2.0.1/src,../../OpenEMap-WebUserInterface/src/main/javascript exclude -all and include -namespace AdmClient,OpenEMap and concat %OPENEMAPADMIN_DEBUG%

copy %OPENEMAPADMIN% ..\..\
copy %OPENEMAPADMIN_DEBUG% ..\..\
xcopy /s /y src\main\webapp\resources .
del /q ..\Modules\src\org\oemap\services\modules\staticcontent\*
copy /v %OPENEMAPADMIN% ..\Modules\src\org\oemap\services\modules\staticcontent\
copy /v %OPENEMAPADMIN_DEBUG% ..\Modules\src\org\oemap\services\modules\staticcontent\
#copy /v ..\..\OpenEMap-WebUserInterface\release\OpenEMap-%OPENEMAP_VERSION%\%OPENEMAP% ..\Modules\src\org\oemap\services\modules\staticcontent\
#copy /v ..\..\OpenEMap-WebUserInterface\release\OpenEMap-%OPENEMAP_VERSION%\%OPENEMAP_DEBUG% ..\Modules\src\org\oemap\services\modules\staticcontent\
#cpoy OPENEMAP_RESOURCES?
pause
