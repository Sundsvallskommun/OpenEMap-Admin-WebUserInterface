package org.oemap.services.modules;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.oemap.services.beans.Config;
import org.oemap.services.bl.OpenEmapBeanFactory;
import org.oemap.services.modules.responsehandler.StringResponseHandler;

import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleDescriptor;
import se.unlogic.hierarchy.core.interfaces.SectionInterface;
import se.unlogic.hierarchy.foregroundmodules.rest.AnnotatedRESTModule;
import se.unlogic.hierarchy.foregroundmodules.rest.RESTMethod;
import se.unlogic.hierarchy.foregroundmodules.rest.URIParam;
import se.unlogic.standardutils.dao.AnnotatedDAO;
import se.unlogic.standardutils.dao.AnnotatedDAOWrapper;
import se.unlogic.standardutils.dao.SimpleAnnotatedDAOFactory;
import se.unlogic.webutils.http.HTTPUtils;
import se.unlogic.webutils.http.URIParser;

public class PublicConfigModule extends AnnotatedRESTModule {

	private AnnotatedDAOWrapper<Config, Integer> configDAO;

	public void init(ForegroundModuleDescriptor moduleDescriptor,
			SectionInterface sectionInterface, DataSource dataSource)
			throws Exception {

		addResponseHandler(new StringResponseHandler());
		super.init(moduleDescriptor, sectionInterface, dataSource);
	}
	
	@Override
	public se.unlogic.hierarchy.core.interfaces.ForegroundModuleResponse defaultMethod(HttpServletRequest req, HttpServletResponse res, User user, URIParser uriParser) throws Throwable {
		List<Config> config = configDAO.getAll();
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		String json = configFactory.createJSON(config);
		HTTPUtils.sendReponse(json, res);
		return null;
	};

	@Override
	protected void createDAOs(DataSource dataSource) throws Exception {
		super.createDAOs(dataSource);
		SimpleAnnotatedDAOFactory daoFactory = new SimpleAnnotatedDAOFactory(
				dataSource);
		AnnotatedDAO<Config> dao = daoFactory.getDAO(Config.class);
		configDAO = new AnnotatedDAOWrapper<Config, Integer>(dao, "configId",
				Integer.class);
	}

	@RESTMethod(alias = "config/{id}", method = "get")
	public String getConfig(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser, @URIParam(name = "id") Integer id)
			throws Throwable {
		Config config = configDAO.get(id);
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		String json = configFactory.createJSON(config);
		return json;
	}
}
