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

package org.oemap.services.bl;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.sun.org.apache.xerces.internal.impl.xpath.regex.RegularExpression;
//...
//... 
 

public class Metadata {
 
	
/*
 * This method returns mdAbstract as json object	
 */
public static JsonNode getAbstractById(String mdId, String cswAdress) throws JsonProcessingException, IOException, ParserConfigurationException, SAXException, XPathExpressionException{
	ObjectMapper mapper = null;
	 mapper = new ObjectMapper();
	 mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
	 JsonNode abstrJSON = null;
	 

	 String cswGetRecordById = 	 "request=GetRecordById&"
			 					+"service=CSW&version=2.0.2&"
			 					+"elementSetName=full&"
			 					+"id=" + mdId;
	 
	 URL cswURL = new URL(cswAdress + cswGetRecordById);
	 System.out.println(cswURL);
	 //Validate UUID
	 Boolean validUUID = isUUID(mdId);

	if (validUUID){
		Document  mdDocument = getRecordByID(cswURL);
		Node node = mdDocument.getDocumentElement();
		
		if(node.hasChildNodes()){
			XPath abstractXP = XPathFactory.newInstance().newXPath();
			String expression = "//*[name()='dct:abstract']";
			NodeList nodeList = (NodeList) abstractXP.evaluate(expression, mdDocument, XPathConstants.NODESET);//

			
			String abs = nodeList.item(0).getTextContent().toString();
			String jsonString = "{\"abstract\":\"" + abs.trim() + "\"}";
						abstrJSON = mapper.readTree(jsonString);
		}else {
			return mapper.readTree("{\"Error\":\"Could not find record with UUID:" + mdId + "\"}");
		}
				
	} else {
		  abstrJSON = mapper.readTree("{\"Error\":\"Invalid UUID\"}");
	}
	
	
	return abstrJSON;

}

public static JsonNode getMetadataByIdAsJSON(String mdId, String cswAdress) throws IOException{
	ObjectMapper mapper = null;
	 mapper = new ObjectMapper();
	 
	 mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
	
	 String cswGetRecordById =   "request=GetRecordById&"
			 					+"service=CSW&"
			 					+"version=2.0.2&"
			 					+"elementSetName=full&"
			 					+"id=" + mdId
			 					+"&outputFormat=application/json"
			 					+"&outputSchema=http://www.isotc211.org/2005/gmd";
	 
	 
	 //Validate UUID
	 Boolean validUUID = isUUID(mdId);

	if (validUUID){
			URL cswURL = new URL(cswAdress + cswGetRecordById);
			URLConnection cswConnection = cswURL.openConnection();
			
			InputStream cswResponse = cswConnection.getInputStream();
			
			JsonNode metadataJSON = mapper.readTree(cswResponse);
		 
			cswResponse.close();
		 
		return metadataJSON;
	}else{
		return mapper.readTree("{\"Error\":\"Invalid UUID\"}");
	}

}



private static Boolean isUUID(String expression)
{
    if (expression != null)
    {
        RegularExpression uuidRegEx = new RegularExpression("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}");

        return uuidRegEx.matches(expression);
    }
    return false;
}

private static Document getRecordByID(URL cswURL) throws ParserConfigurationException, SAXException  {
	 Document mdDoc = null;
	
	try {
		
		URLConnection cswConnection = cswURL.openConnection();
		InputStream cswResponse = cswConnection.getInputStream();
		
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		
		mdDoc = dBuilder.parse(cswResponse);
		
	} catch (ParserConfigurationException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (SAXException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	
	return mdDoc;
	
}

}
