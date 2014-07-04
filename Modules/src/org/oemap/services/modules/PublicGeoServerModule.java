package org.oemap.services.modules;

/**
 * @author Joakim Gradin
 */
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.oemap.services.beans.settings.Server;
import org.oemap.services.bl.OpenEmapBeanFactory;

import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleDescriptor;
import se.unlogic.hierarchy.core.interfaces.SectionInterface;
import se.unlogic.hierarchy.foregroundmodules.rest.AnnotatedRESTModule;
import se.unlogic.hierarchy.foregroundmodules.rest.RESTMethod;
import se.unlogic.standardutils.dao.AnnotatedDAO;
import se.unlogic.standardutils.dao.AnnotatedDAOWrapper;
import se.unlogic.standardutils.dao.SimpleAnnotatedDAOFactory;
import se.unlogic.webutils.http.URIParser;

public class PublicGeoServerModule extends AnnotatedRESTModule {
	private AnnotatedDAOWrapper<Server, Integer> serversDAO;

	@Override
	public void init(ForegroundModuleDescriptor moduleDescriptor,
			SectionInterface sectionInterface, DataSource dataSource)
			throws Exception {
		super.init(moduleDescriptor, sectionInterface, dataSource);
	};

	@Override
	protected void createDAOs(DataSource dataSource) throws Exception {
		super.createDAOs(dataSource);
		SimpleAnnotatedDAOFactory daoFactory = new SimpleAnnotatedDAOFactory(
				dataSource);
		AnnotatedDAO<Server> dao = daoFactory.getDAO(Server.class);
		serversDAO = new AnnotatedDAOWrapper<Server, Integer>(dao, "ID",
				Integer.class);
	}

	/**
	 * 
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @return
	 * @throws Throwable
	 */
	@RESTMethod(alias = "servers", method = "get")
	public String Create(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Throwable {
		OpenEmapBeanFactory<Server> server = new OpenEmapBeanFactory<Server>();
		List<Server> servers = serversDAO.getAll();
		return server.createJSON(servers);
	}
}
