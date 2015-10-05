/*
Copyright Härnösands kommun(C) 2014 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    All rights reserved. This program and the accompanying materials
    are made available under the terms of the GNU Affero General Public License
    which accompanies this distribution, and is available at
    http://www.gnu.org/licenses/agpl-3.0.html
 */

/**
 * ###Factory for creating a Open eMap Admin application
 *  
 * Call the method initOpenEMapAdmin(configPath, options)
 * ###[Integration example](https://github.com/Sundsvallskommun/OpenEMap-WebUserInterface/blob/master/README.md)
 * globals
 * appPath
 * defaultWMSServer
 * wfsServer
 * proxyUrl
 * imageBasePath
 * wmsGetCapabilities deprecated from 1.6.2. Use defaultWMSServer instead. 
 */
var version = "-1.6.2";
var openEMapScriptLocation;
var appPath = appPath || '/openemapadmin'; 
var defaultWMSServer = defaultWMSServer || 'https://extmaptest.sundsvall.se/geoserver/wms?request=GetCapabilities&version=1.1.0';
var wfsServer = wfsServer || 'https://extmaptest.sundsvall.se/geoserver/wfs';
var proxyUrl = proxyUrl || 'https://extmaptest.sundsvall.se/openemapadmin/adminproxy?url=';
var imageBasePath = imageBasePath || '';

var loadCssFiles = function(files, callback) {
	var fileCounter = 0;
	var cssFilesIndex = document.styleSheets.length - 1;

	for (var index in files) {
		fileCounter++;
		if(checkFileType(files[index])) {
			var link = document.createElement("link");
			link.href = files[index];
			link.rel = "stylesheet";
			link.type = "text/css";
			link.onload = checkFinishedState;
			if (this.readyState === 'loaded' || this.readyState === 'complete') {
				link.onreadystatechange = checkFinishedState();
			}
			document.getElementsByTagName("head")[0].appendChild(link);
			cssFilesIndex++;
			if (!window.opera && navigator.userAgent.indexOf("MSIE") == -1) {
				checkCSSLoadingState(cssFilesIndex);
			}
		}
	}

	function checkFileType(f) {
		f = f.toLowerCase();
	    var cssIndex = f.indexOf("css");
	    if(cssIndex == -1) {
	    	return false;
	    }
	    return true;
	}
	
	function checkCSSLoadingState(index) {
		try {
			if (document.styleSheets[index].cssRules) {
				checkFinishedState();
			} else {
				if (document.styleSheets[index].rules && document.styleSheets[index].rules.length) {
					checkFinishedState();
				} else {
					setTimeout(function() { checkCSSLoadingState(index); }, 250);
				}
			}
		} catch (e) {
			setTimeout(function() { checkCSSLoadingState(index); }, 250);
		}
	}

	function checkFinishedState() {
		fileCounter--;
		if (fileCounter === 0) {
			callback();
			fileCounter = -1;
		}
	}
};

var loadJsScripts = function(files) {
	var head = document.getElementsByTagName("head")[0];
	var waitUntilDependenciesIsLoaded = function(dependencies, script) {
		if (dependencies()) {
			head.appendChild(script);
		} else {
			setTimeout(function() { waitUntilDependenciesIsLoaded(dependencies, script); }, 5);
		}
	};
	
    for (var i = 0; i < files.length; i++) {
		var script = {};
		script = document.createElement('script');
		script.type = 'text/javascript';
	 	script.src = files[i].src;

    	waitUntilDependenciesIsLoaded(files[i].dependencies, script);
    }
};

var waitUntilOpenEMapIsLoaded = function(callback) {
	if (typeof AdmClient === "undefined")  {
		setTimeout(function() {waitUntilOpenEMapIsLoaded(callback);}, 5);
	} else {
		callback();
	}
};

(function () {
	var scriptNameRaw = "OpenEMapAdmin.js";
	var openEMapScriptName = new RegExp("(^|(.*?\\/))(" + scriptNameRaw + ")(\\?|$)");
	var scripts = document.getElementsByTagName("script");
	for (var i = 0; i < scripts.length; i++) {
		var src = scripts[i].getAttribute('src');
		if (src) {
			var match = src.match(openEMapScriptName);
	        if (match) {
	        	openEMapScriptLocation = match[1];
	        	break;
	        }
	    }
	}
	var cssFiles = [
		openEMapScriptLocation + "lib/ext/resources/ext-theme-neptune/ext-theme-neptune-all.css",
		openEMapScriptLocation + "oeadmin.css"
	];

	scripts = [
		{src: openEMapScriptLocation + "lib/ext/ext-all.js", dependencies: function() {return true;}},
		{src: openEMapScriptLocation + "lib/ext/ext-theme-neptune.js", dependencies: function() {return (typeof Ext !== "undefined" && Ext.isReady);}},
		{src: openEMapScriptLocation + "lib/ext/locale/ext-lang-sv_SE.js", dependencies:  function() {return (typeof Ext !== "undefined" && Ext.isReady);}},
		{src: openEMapScriptLocation + "lib/OpenLayers/OpenLayers.js", dependencies: function() {return true;}},
		{src: openEMapScriptLocation + "lib/geoext/geoext-all.js", dependencies: function() {return ((typeof Ext !== "undefined") && Ext.isReady &&  (typeof OpenLayers !== "undefined"));}},
		{src: openEMapScriptLocation + "lib/OpenEMap/OpenEMap-min.js", dependencies: function() {return ((typeof Ext !== "undefined") && Ext.isReady &&  (typeof GeoExt !== "undefined") &&  (typeof OpenLayers !== "undefined"));}},
		{src: openEMapScriptLocation + "OpenEMap-Admin-min.js", dependencies: function() {return ((typeof Ext !== "undefined") && Ext.isReady &&  (typeof GeoExt !== "undefined") &&  (typeof OpenLayers !== "undefined") && (typeof OpenEMap !== "undefined") && (typeof OpenEMap.Client !== "undefined") );}}
    ];
	
	// Ensure css files are loaded before js files
	loadCssFiles(cssFiles, function() {
		loadJsScripts(scripts);
	});

	waitUntilOpenEMapIsLoaded(run);
	function run() {
		AdmClient.app.admClient.setHeight(window.innerHeight - 70);
		AdmClient.app.admClient.setWidth(window.innerWidth);
		window.addEventListener("resize", function() {
				AdmClient.app.admClient.setHeight(window.innerHeight - 70);
				AdmClient.app.admClient.setWidth(window.innerWidth);
		});
	}

}) ();
