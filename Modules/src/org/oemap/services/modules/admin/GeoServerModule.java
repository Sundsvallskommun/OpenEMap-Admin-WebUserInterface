/*******************************************************************************
 * Written 2013 by Per Fahlén, Sweco Postion
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Affero General Public License
 * which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/agpl-3.0.html
 ******************************************************************************/

package org.oemap.services.modules.admin;

import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.oemap.services.beans.settings.Server;
import org.oemap.services.bl.OpenEmapBeanFactory;
import org.oemap.services.modules.responsehandler.StringResponseHandler;
import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleDescriptor;
import se.unlogic.hierarchy.core.interfaces.SectionInterface;
import se.unlogic.hierarchy.foregroundmodules.rest.AnnotatedRESTModule;
import se.unlogic.hierarchy.foregroundmodules.rest.RESTMethod;
import se.unlogic.standardutils.dao.AnnotatedDAO;
import se.unlogic.standardutils.dao.AnnotatedDAOWrapper;
import se.unlogic.standardutils.dao.SimpleAnnotatedDAOFactory;
import se.unlogic.webutils.http.URIParser;

public class GeoServerModule extends AnnotatedRESTModule {

	private AnnotatedDAOWrapper<Server, Integer> serversDAO;

	@Override
	public void init(ForegroundModuleDescriptor moduleDescriptor,
			SectionInterface sectionInterface, DataSource dataSource)
			throws Exception {
		addResponseHandler(new StringResponseHandler());
		super.init(moduleDescriptor, sectionInterface, dataSource);
	}

	@Override
	protected void createDAOs(DataSource dataSource) throws Exception {
		super.createDAOs(dataSource);
		SimpleAnnotatedDAOFactory daoFactory = new SimpleAnnotatedDAOFactory(
				dataSource);
		AnnotatedDAO<Server> dao = daoFactory.getDAO(Server.class);
		serversDAO = new AnnotatedDAOWrapper<Server, Integer>(dao, "ID",
				Integer.class);
	}

	@RESTMethod(alias = "servers", method = "post")
	// @WebPublic(alias = "servers", method = "POST", requireLogin = true)
	public String Create(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Throwable {

		OpenEmapBeanFactory<Server> server = new OpenEmapBeanFactory<Server>();
		Server geoSetting = server.createBean(Server.class, req);

		if (geoSetting.getID() != null && geoSetting.getID().equals(0))
			geoSetting.setId(null);
		try {
			serversDAO.add(geoSetting);
		} catch (SQLException x) {
			server.setRestResponseObject(false, 0, x.getMessage());
		}
		res.setStatus(201);
		return server.getRestResponseObject();
	}

	@RESTMethod(alias = "servers", method = "put")
	// @WebPublic(alias = "servers", method = "PUT", requireLogin = true)
	public String Update(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Throwable {

		OpenEmapBeanFactory<Server> server = new OpenEmapBeanFactory<Server>();
		Server geoSetting = server.createBean(Server.class, req);
		try {
			serversDAO.update(geoSetting);
		} catch (SQLException x) {
			server.setRestResponseObject(false, 0, x.getMessage());
		}
		res.setStatus(204);
		return server.getRestResponseObject();
	}

	@RESTMethod(alias = "servers", method = "delete")
	// @WebPublic(alias = "servers", method = "DELETE", requireLogin = true)
	public String Delete(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Exception, Throwable {

		OpenEmapBeanFactory<Server> server = new OpenEmapBeanFactory<Server>();
		Server geoSetting = server.createBean(Server.class, req);
		try {
			serversDAO.delete(geoSetting);
		} catch (SQLException x) {
			res.setStatus(400);
			server.setRestResponseObject(true, geoSetting.getID() == null ? 0
					: geoSetting.getID(), x.getMessage());
		}
		res.setStatus(204);
		return server.getRestResponseObject();
	}
}