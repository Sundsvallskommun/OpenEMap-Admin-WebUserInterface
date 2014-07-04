/*******************************************************************************
 * Written 2013 by Per Fahl�n, Sweco Postion
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

public class OpenEmapAdminBase extends AnnotatedForegroundModule {
	
	@ModuleSetting
    @CheckboxSettingDescriptor(name = "Debug mode?", description = "This assumes Admin javascript sources at /OpenEMap-Admin-WebUserInterface.")
    protected boolean debug = false;
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "WMS Server", description = "Address to WMS Server.")
    protected String wmsServer = "";
	
	@ModuleSetting
    @TextFieldSettingDescriptor(name = "Alias for proxy", description = "Alias set in admin proxy.")
    protected String adminproxy = "adminproxy";
	

	@Override
	public ForegroundModuleResponse defaultMethod(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser)
			throws Exception, Throwable {

		Document doc = createDocument(req, uriParser);
		return new SimpleForegroundModuleResponse(doc,
				this.getDefaultBreadcrumb());
	}

	protected Document createDocument(HttpServletRequest req,
			URIParser uriParser) {

		Document doc = XMLUtils.createDomDocument();
		Element document = doc.createElement("Document");
		doc.appendChild(document);

		document.appendChild(RequestUtils.getRequestInfoAsXML(doc, req,
				uriParser));
		document.appendChild(moduleDescriptor.toXML(doc));

		XMLUtils.appendNewElement(doc, document, "debugAdmin", debug);
		XMLUtils.appendNewElement(doc, document, "wmsServer", wmsServer);
		XMLUtils.appendNewElement(doc, document, "adminproxy", adminproxy);
		
		return doc;
	}
	

}
