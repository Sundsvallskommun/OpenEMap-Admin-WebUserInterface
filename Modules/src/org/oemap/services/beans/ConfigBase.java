/*******************************************************************************
 * Written 2013 by Per Fahlén, Sweco Postion
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

package org.oemap.services.beans;

import java.io.IOException;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.ObjectMapper;

import se.unlogic.standardutils.xml.GeneratedElementable;

public class ConfigBase extends GeneratedElementable {

	private ObjectMapper mapper;

	public ConfigBase() {
		mapper = new ObjectMapper();
	}

	protected ObjectMapper getObjectMapper() {
		return mapper;
	}

	public JsonNode getJSONNode(String value) throws JsonProcessingException,
			IOException {
		if (value == null)
			return null;

		JsonNode node = mapper.readTree(value);
		return node;
	}
}
