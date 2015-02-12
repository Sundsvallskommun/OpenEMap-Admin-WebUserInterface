/******************************************************************************
Copyright Härnösands kommun(C) 2014  <name of author>

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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

package org.oemap.services.modules;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import se.unlogic.hierarchy.core.annotations.CheckboxSettingDescriptor;
import se.unlogic.hierarchy.core.annotations.ModuleSetting;
import se.unlogic.hierarchy.core.annotations.TextFieldSettingDescriptor;
import se.unlogic.hierarchy.core.beans.SimpleForegroundModuleResponse;
import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse;
import se.unlogic.hierarchy.foregroundmodules.AnnotatedForegroundModule;
import se.unlogic.standardutils.xml.XMLUtils;
import se.unlogic.webutils.http.RequestUtils;
import se.unlogic.webutils.http.URIParser;


public class UserMap extends AnnotatedForegroundModule {
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "Open eMap CSS file", description = "Absolut sökväg till Open eMap CSS fil")
    protected String openEMapCSSFile = "http://localhost/OpenEMap-WebUserInterface/resources/css/OpenEMap.css";

	@ModuleSetting
    @TextFieldSettingDescriptor(name = "OpenEMap javascript", description = "Absolut sökväg till OpenEMap javascript")
    protected String openEMapScript = "http://localhost/OpenEMap-WebUserInterface/release/OpenEMap-1.5.0/OpenEMap-1.5.0-debug.js";

	@ModuleSetting
	@CheckboxSettingDescriptor(name = "Debug mode?", description = "This assumes Open eMap javascript sources at /OpenEMap-WebUserInterface.")
	protected boolean debug = false;
	
	
	@Override
	public ForegroundModuleResponse defaultMethod(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser)
			throws Exception, Throwable {

		Document doc = createDocument(req, uriParser);
		return new SimpleForegroundModuleResponse(doc,
				this.getDefaultBreadcrumb());
	}

	protected Document createDocument(HttpServletRequest req, URIParser uriParser) {
		Document doc = XMLUtils.createDomDocument();
		Element document = doc.createElement("Document");
		doc.appendChild(document);

		document.appendChild(RequestUtils.getRequestInfoAsXML(doc, req,
				uriParser));
		document.appendChild(moduleDescriptor.toXML(doc));
		
		XMLUtils.appendNewElement(doc, document, "openEMapCSSFile", openEMapCSSFile);
		XMLUtils.appendNewElement(doc, document, "openEMapScript", openEMapScript);
		XMLUtils.appendNewElement(doc, document, "debug", debug);
		
		return doc;
	}
}
