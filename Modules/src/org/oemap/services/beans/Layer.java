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

import org.codehaus.jackson.JsonProcessingException;

import se.unlogic.standardutils.dao.annotations.DAOManaged;
import se.unlogic.standardutils.dao.annotations.Key;
import se.unlogic.standardutils.dao.annotations.Table;
import se.unlogic.standardutils.xml.XMLElement;

/**
 * 
 * @author Per Fahl�n - Sweco Position AB Bean for layer in oemapadmin
 */

@Table(name = "oemapadmin_layers")
public class Layer extends ConfigBase {

	@XMLElement
	@DAOManaged(autoGenerated = true)
	@Key
	private Integer layerId;

	@XMLElement
	@DAOManaged
	private String name;

	@XMLElement
	@DAOManaged(dontUpdateIfNull = false)
	private String wms;

	@XMLElement
	@DAOManaged(dontUpdateIfNull = false)
	private String wfs;

	@XMLElement
	@DAOManaged
	private Integer serverId;

	@XMLElement
	@DAOManaged
	private Boolean isSearchable;

	@XMLElement
	@DAOManaged
	private String urlToMetadata;
	
	@XMLElement
	@DAOManaged
	private Boolean isGroupLayer;

	public Boolean getIsGroupLayer() {
		return isGroupLayer;
	}

	public void setIsGroupLayer(Boolean isGroupLayer) {
		this.isGroupLayer = isGroupLayer;
	}

	public String getUrlToMetadata() {
		return urlToMetadata;
	}

	public void setUrlToMetadata(String urlToMetadata) {
		this.urlToMetadata = urlToMetadata;
	}

	public Boolean getIsSearchable() {
		return isSearchable;
	}

	public void setIsSearchable(Boolean isSearchable) {
		this.isSearchable = isSearchable;
	}

	public Integer getLayerId() {
		return layerId;
	}

	public void setLayerId(Integer layerId) {
		this.layerId = layerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public org.codehaus.jackson.JsonNode getWms()
			throws JsonProcessingException, IOException {
		return getJSONNode(wms);
	}

	public void setWms(String wms) {
		this.wms = wms;
	}

	public org.codehaus.jackson.JsonNode getWfs()
			throws JsonProcessingException, IOException {
		return getJSONNode(wfs);
	}

	public void setWfs(String wfs) {
		this.wfs = wfs;
	}

	public Integer getServerId() {
		return serverId;
	}

	public void setServerId(Integer serverId) {
		this.serverId = serverId;
	}
	public String toString() {
		return "Layer {" + this.getName()+" : "+ this.getLayerId() +", " +this.getUrlToMetadata() + "}\n";
	}
}
