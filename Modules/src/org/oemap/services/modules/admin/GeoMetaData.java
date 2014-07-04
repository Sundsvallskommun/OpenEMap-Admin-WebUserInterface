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

package org.oemap.services.modules.admin;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.oemap.services.bl.Metadata;

import se.unlogic.hierarchy.core.annotations.ModuleSetting;
import se.unlogic.hierarchy.core.annotations.TextFieldSettingDescriptor;
import se.unlogic.hierarchy.core.annotations.WebPublic;
import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse;
import se.unlogic.hierarchy.foregroundmodules.AnnotatedForegroundModule;
import se.unlogic.webutils.http.HTTPUtils;
import se.unlogic.webutils.http.URIParser;

public class GeoMetaData extends AnnotatedForegroundModule {
	
	 @ModuleSetting
     @TextFieldSettingDescriptor(name = "CSW Katalogtjänst", description = "Sökväg till extern katalogtjänst", required = true)
     protected String cswAdress = null;
	 
	 @Override
	 public ForegroundModuleResponse defaultMethod(HttpServletRequest req, HttpServletResponse res, User user, URIParser uriParser) throws Exception ,Throwable {
		 HTTPUtils.sendReponse("I'm running", "plain/text", res);
		 return null;
			
	 };
	
	@WebPublic(alias="getabstractbyid")
	public ForegroundModuleResponse getAbstractById(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser)
			throws Exception, Throwable {
		String mdId = uriParser.get(2);
		HTTPUtils.sendReponse(Metadata.getAbstractById(mdId, cswAdress).toString(), "application/json", "ISO-8859-1", res);
		
		return null;
	}
	@WebPublic(alias="getmetadatabyid")
	public ForegroundModuleResponse getMetaDataById(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser)
			throws Exception, Throwable {
		System.out.println("cswURL");
		String mdId = uriParser.get(2);
		HTTPUtils.sendReponse(Metadata.getMetadataByIdAsJSON(mdId, cswAdress).toString(), "application/json", "ISO-8859-1", res);
		
		return null;
	}

}