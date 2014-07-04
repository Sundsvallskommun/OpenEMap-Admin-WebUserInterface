/******************************************************************************
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
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

package org.oemap.services.modules;

import java.io.BufferedReader;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import se.unlogic.hierarchy.core.annotations.ModuleSetting;
import se.unlogic.hierarchy.core.annotations.TextFieldSettingDescriptor;
import se.unlogic.hierarchy.core.annotations.WebPublic;
import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse;
import se.unlogic.hierarchy.foregroundmodules.AnnotatedForegroundModule;
import se.unlogic.webutils.http.HTTPUtils;
import se.unlogic.webutils.http.URIParser;


public class GeoSearchModule extends AnnotatedForegroundModule{

	private static final long serialVersionUID = 7384942734185482358L;
	
	// implementing of abstract method - no meaning in this module
	@Override
	public ForegroundModuleResponse defaultMethod(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser)
			throws Exception, Throwable {
		
		// TODO Auto-generated method stub
		return null;
	}
	
	@ModuleSetting
	@TextFieldSettingDescriptor(name = "Fastighetssök", description = "Sökväg till extern fastighetssök", required = true)
	protected String mappingParameterName = "";
	
	// this endpoint lives under search in OH administration
	@WebPublic(alias = "lm")
	public ForegroundModuleResponse getRegisterenheter(HttpServletRequest req, HttpServletResponse res, User user, URIParser uriParser) throws Exception {
		String content = "";
		System.out.println(req.getRequestURL());
 		if (req.getRequestURL().indexOf("enhetsomraden") > -1 && 
				req.getRequestURL().indexOf("registerenheter") > 1 ){
			int idx = req.getRequestURL().indexOf("registerenheter");
			String tail = "/" + req.getRequestURL().substring(idx);
			content = GetRemoteContent(this.mappingParameterName  + tail, req);
		}
		else if (req.getRequestURL().indexOf("enhetsomraden") > -1) 
			content = GetRemoteContent(this.mappingParameterName + "/enhetsomraden?" + req.getQueryString(), req);
		else if (req.getRequestURL().indexOf("registerenheter") > -1){
			content = GetRemoteContent(this.mappingParameterName + "/registerenheter?" + req.getQueryString(), req);
		}
		else if(req.getRequestURL().indexOf("/addresses") > -1){
			content = GetRemoteContent(this.mappingParameterName + "/addresses?" + req.getQueryString(), req);
		}
		else if (req.getRequestURL().indexOf("/placenames") > -1){
			content = GetRemoteContent(this.mappingParameterName + "/placenames?" + req.getQueryString(), req);
		}
		
		HTTPUtils.sendReponse(content,  "application/json;charset=ISO-8859-1", "ISO-8859-1", res);
		
		return null;
	}
	
	
	String GetRemoteContent(String url, HttpServletRequest req) throws Exception{
		URL configMapsURL = new URL(url);
		URLConnection connection = configMapsURL.openConnection();
		BufferedReader inData = new BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
		String content = "";
		String line;
		while ((line = inData.readLine()) != null)
			content += line;
		return content;
	}
}
