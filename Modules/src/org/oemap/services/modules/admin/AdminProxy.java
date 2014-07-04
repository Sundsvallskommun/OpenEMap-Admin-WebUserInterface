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

import se.unlogic.hierarchy.core.annotations.CheckboxSettingDescriptor;
import se.unlogic.hierarchy.core.annotations.ModuleSetting;
import se.unlogic.hierarchy.core.annotations.TextFieldSettingDescriptor;
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
