/*******************************************************************************
 * Written 2013 by Per Fahlén, Sweco Postion
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

package org.oemap.services.interfaces;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.oemap.services.beans.Config;
import org.oemap.services.bl.OpenEmapBeanFactory;

import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse;
import se.unlogic.webutils.http.URIParser;

public interface ICRUD<T> {

	Object Create(HttpServletRequest req, HttpServletResponse res, User user,
			URIParser uriParser) throws Exception, Throwable;

	Object Read(HttpServletRequest req, HttpServletResponse res, User user,
			URIParser uriParser) throws Exception, Throwable;

	Object Update(HttpServletRequest req, HttpServletResponse res, User user,
			URIParser uriParser) throws Exception, Throwable;

	Object Delete(HttpServletRequest req, HttpServletResponse res, User user,
			URIParser uriParser) throws Exception, Throwable;

	boolean hasEnoughData(OpenEmapBeanFactory<T> factory, T bean,
			HttpServletResponse res) throws Exception, Throwable;

}
