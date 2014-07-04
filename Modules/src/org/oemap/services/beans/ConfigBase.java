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
