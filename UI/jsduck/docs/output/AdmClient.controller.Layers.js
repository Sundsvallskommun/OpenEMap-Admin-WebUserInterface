Ext.data.JsonP.AdmClient_controller_Layers({"tagname":"class","name":"AdmClient.controller.Layers","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Layers.js","href":"Layers.html#AdmClient-controller-Layers"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.app.Controller","mixins":[],"requires":["AdmClient.view.settings.LayerSettings","AdmClient.view.settings.Layers"],"uses":[],"members":[{"name":"refs","tagname":"property","owner":"AdmClient.controller.Layers","id":"property-refs","meta":{"private":true}},{"name":"stores","tagname":"property","owner":"AdmClient.controller.Layers","id":"property-stores","meta":{"private":true}},{"name":"views","tagname":"property","owner":"AdmClient.controller.Layers","id":"property-views","meta":{"private":true}},{"name":"init","tagname":"method","owner":"AdmClient.controller.Layers","id":"method-init","meta":{"private":true}},{"name":"onAddClick","tagname":"method","owner":"AdmClient.controller.Layers","id":"method-onAddClick","meta":{"private":true}},{"name":"onDeleteClick","tagname":"method","owner":"AdmClient.controller.Layers","id":"method-onDeleteClick","meta":{"private":true}},{"name":"onEdit","tagname":"method","owner":"AdmClient.controller.Layers","id":"method-onEdit","meta":{"private":true}},{"name":"onSaveClick","tagname":"method","owner":"AdmClient.controller.Layers","id":"method-onSaveClick","meta":{"private":true}},{"name":"onSettingsClick","tagname":"method","owner":"AdmClient.controller.Layers","id":"method-onSettingsClick","meta":{"private":true}}],"code_type":"ext_define","id":"class-AdmClient.controller.Layers","component":false,"superclasses":["Ext.app.Controller"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.app.Controller<div class='subclass '><strong>AdmClient.controller.Layers</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/AdmClient.view.settings.LayerSettings' rel='AdmClient.view.settings.LayerSettings' class='docClass'>AdmClient.view.settings.LayerSettings</a></div><div class='dependency'><a href='#!/api/AdmClient.view.settings.Layers' rel='AdmClient.view.settings.Layers' class='docClass'>AdmClient.view.settings.Layers</a></div><h4>Files</h4><div class='dependency'><a href='source/Layers.html#AdmClient-controller-Layers' target='_blank'>Layers.js</a></div></pre><div class='doc-contents'><p>A controller to handle layer view.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-refs' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-property-refs' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-property-refs' class='name expandable'>refs</a> : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>[{ref: 'layers', selector: '#layers'}, {ref: 'wmslayers', selector: '#wmslayers'}]</code></p></div></div></div><div id='property-stores' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-property-stores' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-property-stores' class='name expandable'>stores</a> : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>['Layers']</code></p></div></div></div><div id='property-views' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-property-views' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-property-views' class='name expandable'>views</a> : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>['settings.Layers']</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-init' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-method-init' class='name expandable'>init</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onAddClick' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-method-onAddClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-method-onAddClick' class='name expandable'>onAddClick</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onDeleteClick' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-method-onDeleteClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-method-onDeleteClick' class='name expandable'>onDeleteClick</a>( <span class='pre'>gridview, rl, rowIndex, colIndex, e, record</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>gridview</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>rl</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>rowIndex</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>colIndex</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>e</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>record</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-onEdit' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-method-onEdit' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-method-onEdit' class='name expandable'>onEdit</a>( <span class='pre'>editor, e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>editor</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>e</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-onSaveClick' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-method-onSaveClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-method-onSaveClick' class='name expandable'>onSaveClick</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-onSettingsClick' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='AdmClient.controller.Layers'>AdmClient.controller.Layers</span><br/><a href='source/Layers.html#AdmClient-controller-Layers-method-onSettingsClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/AdmClient.controller.Layers-method-onSettingsClick' class='name expandable'>onSettingsClick</a>( <span class='pre'>gridview, rl, rowIndex, colIndex, e, record</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>gridview</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>rl</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>rowIndex</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>colIndex</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>e</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>record</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});