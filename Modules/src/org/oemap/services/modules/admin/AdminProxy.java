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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleDescriptor;
import se.unlogic.hierarchy.core.interfaces.SectionInterface;
import se.unlogic.hierarchy.foregroundmodules.AnnotatedForegroundModule;
import se.unlogic.webutils.http.HTTPUtils;
import se.unlogic.webutils.http.URIParser;

public class AdminProxy extends AnnotatedForegroundModule {
	
	public void init(ForegroundModuleDescriptor moduleDescriptor,
			SectionInterface sectionInterface, DataSource dataSource)
			throws Exception {
		super.init(moduleDescriptor, sectionInterface, dataSource);
	};

	@Override
	public se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse defaultMethod(
			HttpServletRequest req, 
			HttpServletResponse res, 
			User user, 
			URIParser uriParser) throws Throwable {
		
		String query = req.getQueryString().replace("url=", "");
		HttpURLConnection connection = null;
		try{
			URL url = new URL(query);
			connection = (HttpURLConnection)url.openConnection();
			connection.setUseCaches (false);
			
			InputStream is = connection.getInputStream();
			
			BufferedReader rd = new BufferedReader(new InputStreamReader(is));
		    String line;
		    StringBuffer response = new StringBuffer(); 
		    while((line = rd.readLine()) != null) {
		      response.append(line);
		    }
		    rd.close();
			
		    HTTPUtils.sendReponse(response.toString(), "application/xml", res);
			
		}catch(IOException ex){
			
		}
		
		return null;
	};

	
}
