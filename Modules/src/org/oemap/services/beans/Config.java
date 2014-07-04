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

import se.unlogic.standardutils.dao.annotations.DAOManaged;
import se.unlogic.standardutils.dao.annotations.Key;
import se.unlogic.standardutils.dao.annotations.Table;
import se.unlogic.standardutils.xml.XMLElement;

@Table(name = "oemapadmin_config")
public class Config extends ConfigBase {

	@XMLElement
	@Key
	@DAOManaged(autoGenerated = true)
	private Integer configId;

	@XMLElement
	@DAOManaged
	private String name;

	@XMLElement
	@DAOManaged
	private String version;

	@XMLElement
	@DAOManaged
	private String maxExtent;

	@XMLElement
	@DAOManaged
	private String extent;

	@XMLElement
	@DAOManaged
	private String attribution;

	@XMLElement
	@DAOManaged
	private Boolean autoClearDrawLayer;

	@XMLElement
	@DAOManaged
	private String drawStyle;

	@XMLElement
	@DAOManaged
	private String tools;

	@XMLElement
	@DAOManaged
	private String layers;

	@XMLElement
	@DAOManaged
	private String resolutions;

	@XMLElement
	@DAOManaged
	private String units;

	@XMLElement
	@DAOManaged
	private String projection;

	@XMLElement
	@DAOManaged
	private String username;

	@XMLElement
	@DAOManaged
	private String options;
	
	@XMLElement
	@DAOManaged
	private String search;
	
	public JsonNode getSearch()  throws JsonProcessingException, IOException{
		return getJSONNode(search);
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public JsonNode getResolutions() throws JsonProcessingException,
			IOException {
		return getJSONNode(resolutions);
	}

	public void setResolutions(String resolutions) {
		this.resolutions = resolutions;
	}

	public Integer getConfigId() {
		return configId;
	}

	public void setConfigId(Integer configId) {
		this.configId = configId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public JsonNode getMaxExtent() throws JsonProcessingException, IOException {
		return getJSONNode(maxExtent);
	}

	public void setMaxExtent(String maxExtent) {
		this.maxExtent = maxExtent;
	}

	public JsonNode getExtent() throws JsonProcessingException, IOException {
		return getJSONNode(extent);
	}

	public void setExtent(String extent) {
		this.extent = extent;
	}

	public String getAttribution() {
		return attribution;
	}

	public void setAttribution(String attribution) {
		this.attribution = attribution;
	}

	public Boolean getAutoClearDrawLayer() {
		return autoClearDrawLayer;
	}

	public void setAutoClearDrawLayer(Boolean autoClearDrawLayer) {
		this.autoClearDrawLayer = autoClearDrawLayer;
	}

	public JsonNode getDrawStyle() throws JsonProcessingException, IOException {
		return getJSONNode(drawStyle);
	}

	public void setDrawStyle(String drawStyle) {
		this.drawStyle = drawStyle;
	}

	public JsonNode getTools() throws JsonProcessingException, IOException {
		return getJSONNode(tools);
	}

	public void setTools(String tools) {
		this.tools = tools;
	}

	public JsonNode getLayers() throws JsonProcessingException, IOException {
		return getJSONNode(layers);
	}

	public void setLayers(String layers) {
		this.layers = layers;
	}

	public String getUnits() {
		return units;
	}

	public void setUnits(String units) {
		this.units = units;
	}

	public String getProjection() {
		return projection;
	}

	public void setProjection(String projection) {
		this.projection = projection;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public JsonNode getOptions() throws JsonProcessingException, IOException {
		return getJSONNode(options);
	}

	public void setOptions(String options) {
		this.options = options;
	}

}