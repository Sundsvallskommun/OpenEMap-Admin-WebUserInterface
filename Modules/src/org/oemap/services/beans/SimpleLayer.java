/*******************************************************************************
 * Written 2013 by Per Fahlén, Sweco Postion
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

package org.oemap.services.beans;

import java.util.LinkedList;

public class SimpleLayer {

	private Integer layerID;

	private String name;

	private LinkedList<SimpleLayer> layers;

	public Integer getLayerID() {
		return layerID;
	}

	public void setLayerID(Integer layerID) {
		this.layerID = layerID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void addLayer(SimpleLayer layer) {
		if (layers == null)
			layers = new LinkedList<SimpleLayer>();
		layers.add(layer);
	}

}
