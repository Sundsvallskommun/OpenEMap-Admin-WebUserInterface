/*******************************************************************************
 * Written 2013 by Per Fahlén, Sweco Postion
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

package org.oemap.services.bl;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ObjectNode;
import org.oemap.services.beans.RestResponseObject;

public class OpenEmapBeanFactory<T> {

	private ObjectMapper mapper;
	private RestResponseObject response;

	public OpenEmapBeanFactory() throws InstantiationException,
			IllegalAccessException {
		mapper = new ObjectMapper();
		response = new RestResponseObject();
	};

	public void setRestResponseObject(boolean success, Integer id,
			String message) throws JsonGenerationException,
			JsonMappingException, IOException {
		response.setId(id);
		response.setMessage(message);
		response.setSuccess(success);
	}

	public String getRestResponseObject() throws JsonGenerationException,
			JsonMappingException, IOException {
		return this.getJSON(response);
	}

	@SuppressWarnings({ "unchecked" })
	public T createBean(Class c, HttpServletRequest req)
			throws JsonProcessingException, IOException,
			ClassNotFoundException, InstantiationException,
			IllegalAccessException, IllegalArgumentException,
			InvocationTargetException {
		ObjectNode json = (ObjectNode) this.mapper.readTree(req
				.getInputStream());

		Iterator<String> it = json.getFieldNames();

		String current;
		HashMap<String, Object> jsonNodes = new HashMap<String, Object>();
		try {
			while ((current = it.next()) != null) {
				JsonNode node = json.get(current);
				if (node.isObject()) {
					if (!jsonNodes.containsKey(node))
						jsonNodes.put(current.toLowerCase(), node.toString());
				} else if (node.isArray()) {
					if (!jsonNodes.containsKey(node))
						jsonNodes.put(current.toLowerCase(), node.toString());
				} else {
					if (!jsonNodes.containsKey(node))
						jsonNodes.put(current.toLowerCase(), node.toString()); // fix
																				// correct
																				// datatype
				}
			}
		} catch (NoSuchElementException ex) {
		}

		Object o = c.newInstance();

		Method[] methods = o.getClass().getMethods();

		for (Method method : methods) {
			if (method.getName().startsWith("set")) {
				String methodName = method.getName().substring(3).toLowerCase();

				Object value = jsonNodes.get(methodName);
				if (value == null || value.equals("null"))
					continue;
				if (((String) value).matches("[+-]?\\d+")) {
					method.invoke(o, Integer.parseInt((String) value));
					continue;
				} else if (value == "true" || value == "false") {
					Boolean b = Boolean.valueOf(((String) value).toUpperCase());
					method.invoke(o, b);
					continue;
				} else {
					String val = (String) value;
					if (val.startsWith("\""))
						val = val.substring(1);
					if (val.endsWith("\""))
						val = val.substring(0, val.length() - 1);
					method.invoke(o, val);
				}
			}
		}
		return (T) o;
	}

	public String getJSON(RestResponseObject response)
			throws JsonGenerationException, JsonMappingException, IOException {
		return this.mapper.writeValueAsString(response);
	}

	public String createJSON(T bean) throws JsonGenerationException,
			JsonMappingException, IOException {
		return this.mapper.writeValueAsString(bean);
	}

	public String createJSON(List<T> beans) throws JsonGenerationException,
			JsonMappingException, IOException {
		return this.mapper.writeValueAsString(beans);
	}
}
