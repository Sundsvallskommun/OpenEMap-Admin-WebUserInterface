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


package org.oemap.services.modules.admin;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.oemap.services.beans.settings.SearchServer;
import org.oemap.services.bl.OpenEmapBeanFactory;
import org.oemap.services.interfaces.ICRUD;
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

public class GeoSearchServerModule extends AnnotatedRESTModule implements
		ICRUD<SearchServer> {

	private AnnotatedDAOWrapper<SearchServer, Integer> searchServersDAO;

	@Override
	protected void createDAOs(DataSource dataSource) throws Exception {
		super.createDAOs(dataSource);
		SimpleAnnotatedDAOFactory daoFactory = new SimpleAnnotatedDAOFactory(
				dataSource);
		AnnotatedDAO<SearchServer> dao = daoFactory.getDAO(SearchServer.class);
		searchServersDAO = new AnnotatedDAOWrapper<SearchServer, Integer>(dao,
				"ID", Integer.class);
	}

	public void init(ForegroundModuleDescriptor moduleDescriptor,
			SectionInterface sectionInterface, DataSource dataSource)
			throws Exception {
		addResponseHandler(new StringResponseHandler());
		super.init(moduleDescriptor, sectionInterface, dataSource);
	}

	@RESTMethod(alias = "server", method = "post")
	// @WebPublic(alias = "server", method = "server", requireLogin = true)
	public String Create(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Throwable {

		OpenEmapBeanFactory<SearchServer> searchServerFactory = new OpenEmapBeanFactory<SearchServer>();
		SearchServer searchServer = searchServerFactory.createBean(
				SearchServer.class, req);
		try {
			if (searchServer.getId().equals(0))
				searchServer.setId(null);
			searchServersDAO.add(searchServer);
		} catch (SQLException x) {
			searchServerFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		return searchServerFactory.getRestResponseObject();
	}

	@RESTMethod(alias = "server", method = "get")
	// @WebPublic(alias = "server", method = "server", requireLogin = true)
	public String Read(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Throwable {
		OpenEmapBeanFactory<SearchServer> searchServerFactory = new OpenEmapBeanFactory<SearchServer>();
		List<SearchServer> servers = searchServersDAO.getAll();
		return searchServerFactory.createJSON(servers);
	}

	@RESTMethod(alias = "server", method = "put")
	// @WebPublic(alias = "server", method = "PUT", requireLogin = true)
	public String Update(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Exception, Throwable {

		OpenEmapBeanFactory<SearchServer> searchServerFactory = new OpenEmapBeanFactory<SearchServer>();
		SearchServer searchServer = searchServerFactory.createBean(
				SearchServer.class, req);

		try {
			if (hasEnoughData(searchServerFactory, searchServer, res))
				searchServersDAO.update(searchServer);
		} catch (SQLException x) {
			searchServerFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		return searchServerFactory.getRestResponseObject();

	}

	@RESTMethod(alias = "server", method = "delete")
	// @WebPublic(alias = "server", method = "DELETE", requireLogin = true)
	public String Delete(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Exception, Throwable {

		OpenEmapBeanFactory<SearchServer> searchServerFactory = new OpenEmapBeanFactory<SearchServer>();
		SearchServer searchServer = searchServerFactory.createBean(
				SearchServer.class, req);

		try {
			if (hasEnoughData(searchServerFactory, searchServer, res))
				searchServersDAO.delete(searchServer);
		} catch (SQLException x) {
			res.setStatus(400);
			searchServerFactory.setRestResponseObject(false, 0, x.getMessage());
			return searchServerFactory.getRestResponseObject();
		}
		res.setStatus(204);
		searchServerFactory.setRestResponseObject(true, 0, "");
		return searchServerFactory.getRestResponseObject();
	}

	@Override
	public boolean hasEnoughData(OpenEmapBeanFactory<SearchServer> factory,
			SearchServer bean, HttpServletResponse res) throws Exception,
			Throwable {
		if (bean.getId() == 0) {
			res.setStatus(500);
			factory.setRestResponseObject(false, 0,
					"No searchServerID provided in request");
			return false;
		}
		return true;
	}
}
