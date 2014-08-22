Ext.data.JsonP.AdmClient_controller_toolDetails_MeasureLine({"tagname":"class","name":"AdmClient.controller.toolDetails.MeasureLine","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"MeasureLine.js","href":"MeasureLine.html#AdmClient-controller-toolDetails-MeasureLine"}],"aliases":{},"alternateClassNames":[],"extends":"AdmClient.controller.MapConfiguration","mixins":[],"requires":["AdmClient.view.MapConfiguration","AdmClient.view.mapconfiguration.tools.details.*"],"uses":[],"members":[{"name":"mapClient","tagname":"property","owner":"AdmClient.controller.MapConfiguration","id":"property-mapClient","meta":{"private":true}},{"name":"refs","tagname":"property","owner":"AdmClient.controller.toolDetails.MeasureLine","id":"property-refs","meta":{"private":true}},{"name":"autoClearDrawLayerChanged","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-autoClearDrawLayerChanged","meta":{"private":true}},{"name":"changeConfiguration","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-changeConfiguration","meta":{"private":true}},{"name":"configurationPreviewPanelShow","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-configurationPreviewPanelShow","meta":{"private":true}},{"name":"init","tagname":"method","owner":"AdmClient.controller.toolDetails.MeasureLine","id":"method-init","meta":{"private":true}},{"name":"loadConfiguration","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-loadConfiguration","meta":{"private":true}},{"name":"mapPanelRender","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-mapPanelRender","meta":{"private":true}},{"name":"markExtent","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-markExtent","meta":{"private":true}},{"name":"panMap","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-panMap","meta":{"private":true}},{"name":"renderConfiguration","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-renderConfiguration","meta":{"private":true}},{"name":"saveConfiguration","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-saveConfiguration","meta":{"private":true}},{"name":"selectConfiguration","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-selectConfiguration","meta":{"private":true}},{"name":"setAttribution","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-setAttribution","meta":{"private":true}},{"name":"setConfigText","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-setConfigText","meta":{"private":true}},{"name":"setConfigurationName","tagname":"method","owner":"AdmClient.controller.MapConfiguration","id":"method-setConfigurationName","meta":{"private":true}},{"name":"toolSelected","tagname":"method","owner":"AdmClient.controller.toolDetails.MeasureLine","id":"method-toolSelected","meta":{"private":true}}],"code_type":"ext_define","id":"class-AdmClient.controller.toolDetails.MeasureLine","component":false,"superclasses":["Ext.app.Controller","AdmClient.controller.MapConfiguration"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.app.Controller<div class='subclass '><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='docClass'>AdmClient.controller.MapConfiguration</a><div class='subclass '><strong>AdmClient.controller.toolDetails.MeasureLine</strong></div></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/AdmClient.view.MapConfiguration' rel='AdmClient.view.MapConfiguration' class='docClass'>AdmClient.view.MapConfiguration</a></div><div class='dependency'>AdmClient.view.mapconfiguration.tools.details.*</div><h4>Files</h4><div class='dependency'><a href='source/MeasureLine.html#AdmClient-controller-toolDetails-MeasureLine' target='_blank'>MeasureLine.js</a></div></pre><div class='doc-contents'><p>A controller to handle tooldetails for measure line tool.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-mapClient' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-property-mapClient' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-property-mapClient' class='name expandable'>mapClient</a> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-refs' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.toolDetails.MeasureLine'>AdmClient.controller.toolDetails.MeasureLine</span><br/><a href='source/MeasureLine.html#AdmClient-controller-toolDetails-MeasureLine-property-refs' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.toolDetails.MeasureLine-property-refs' class='name expandable'>refs</a> : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>[{ref: 'toolsGrid', selector: '#toolsGrid'}]</code></p><p>Overrides: <a href=\"#!/api/AdmClient.controller.MapConfiguration-property-refs\" rel=\"AdmClient.controller.MapConfiguration-property-refs\" class=\"docClass\">AdmClient.controller.MapConfiguration.refs</a></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-autoClearDrawLayerChanged' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-autoClearDrawLayerChanged' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-autoClearDrawLayerChanged' class='name expandable'>autoClearDrawLayerChanged</a>( <span class='pre'>box, newValue, oldValue, eOpts</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>box</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>newValue</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>oldValue</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>eOpts</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-changeConfiguration' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-changeConfiguration' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-changeConfiguration' class='name expandable'>changeConfiguration</a>( <span class='pre'>config</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-configurationPreviewPanelShow' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-configurationPreviewPanelShow' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-configurationPreviewPanelShow' class='name expandable'>configurationPreviewPanelShow</a>( <span class='pre'>panel, eOpts</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>panel</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>eOpts</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.toolDetails.MeasureLine'>AdmClient.controller.toolDetails.MeasureLine</span><br/><a href='source/MeasureLine.html#AdmClient-controller-toolDetails-MeasureLine-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.toolDetails.MeasureLine-method-init' class='name expandable'>init</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Overrides: <a href=\"#!/api/AdmClient.controller.MapConfiguration-method-init\" rel=\"AdmClient.controller.MapConfiguration-method-init\" class=\"docClass\">AdmClient.controller.MapConfiguration.init</a></p></div></div></div><div id='method-loadConfiguration' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-loadConfiguration' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-loadConfiguration' class='name expandable'>loadConfiguration</a>( <span class='pre'>id</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-mapPanelRender' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-mapPanelRender' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-mapPanelRender' class='name expandable'>mapPanelRender</a>( <span class='pre'>panel</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>panel</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-markExtent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-markExtent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-markExtent' class='name expandable'>markExtent</a>( <span class='pre'>btn</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>btn</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-panMap' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-panMap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-panMap' class='name expandable'>panMap</a>( <span class='pre'>btn</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>btn</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-renderConfiguration' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-renderConfiguration' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-renderConfiguration' class='name expandable'>renderConfiguration</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-saveConfiguration' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-saveConfiguration' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-saveConfiguration' class='name expandable'>saveConfiguration</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-selectConfiguration' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-selectConfiguration' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-selectConfiguration' class='name expandable'>selectConfiguration</a>( <span class='pre'>combo, records</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>combo</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>records</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-setAttribution' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-setAttribution' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-setAttribution' class='name expandable'>setAttribution</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setConfigText' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-setConfigText' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-setConfigText' class='name expandable'>setConfigText</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setConfigurationName' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/AdmClient.controller.MapConfiguration' rel='AdmClient.controller.MapConfiguration' class='defined-in docClass'>AdmClient.controller.MapConfiguration</a><br/><a href='source/MapConfiguration.html#AdmClient-controller-MapConfiguration-method-setConfigurationName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.MapConfiguration-method-setConfigurationName' class='name expandable'>setConfigurationName</a>( <span class='pre'>combo, e, eOpts</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>combo</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>e</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>eOpts</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-toolSelected' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.toolDetails.MeasureLine'>AdmClient.controller.toolDetails.MeasureLine</span><br/><a href='source/MeasureLine.html#AdmClient-controller-toolDetails-MeasureLine-method-toolSelected' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.toolDetails.MeasureLine-method-toolSelected' class='name expandable'>toolSelected</a>( <span class='pre'>chkBox, rowIndex, checked, eOpts</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>chkBox</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>rowIndex</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>checked</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>eOpts</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});