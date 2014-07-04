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

package org.oemap.services.modules.responsehandler;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import se.unlogic.hierarchy.foregroundmodules.rest.ResponseHandler;
import se.unlogic.webutils.http.HTTPUtils;

public class StringResponseHandler implements ResponseHandler<String> {
	@Override
	public Class<? extends String> getType() {

		return String.class;
	}

	@Override
	public void handleResponse(String content, HttpServletResponse res)
			throws IOException {
		HTTPUtils.sendReponse(content, "application/json", "ISO-8859-1", res);
	}

}
