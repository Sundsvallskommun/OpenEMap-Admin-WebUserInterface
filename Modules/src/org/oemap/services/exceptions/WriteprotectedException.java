/*******************************************************************************
 * Written 2013 by Per Fahlén, Sweco Postion
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

package org.oemap.services.exceptions;

public class WriteprotectedException extends Exception {

	private static final long serialVersionUID = 3175351400323047123L;

	private String message = null;

	public WriteprotectedException() {
		this.message = "You are trying to write to a write protected template. Choose another template.";
	}

	public WriteprotectedException(String message) {
		this.message = message;
	}

	@Override
	public String getMessage() {
		return message;
	}
}
