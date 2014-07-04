/**
 * @author Joakim Gradin
 */
package org.oemap.services.modules.admin;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.oemap.services.beans.Config;
import org.oemap.services.bl.OpenEmapBeanFactory;
import org.oemap.services.exceptions.WriteprotectedException;
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

public class AdminConfigModule extends AnnotatedRESTModule {
	private AnnotatedDAOWrapper<Config, Integer> configDAO;

	@Override
	protected void createDAOs(DataSource dataSource) throws Exception {
		super.createDAOs(dataSource);
		SimpleAnnotatedDAOFactory daoFactory = new SimpleAnnotatedDAOFactory(
				dataSource);
		AnnotatedDAO<Config> dao = daoFactory.getDAO(Config.class);
		configDAO = new AnnotatedDAOWrapper<Config, Integer>(dao, "configId",
				Integer.class);
	}

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

	/**
	 * 
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @param id
	 * @return
	 * @throws Throwable
	 */
	@RESTMethod(alias = "config/{id}", method = "get")
	public String retriveConfig(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser,
			@URIParam(name = "id") Integer id) throws Throwable {
		Config config = configDAO.get(id);
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		String json = configFactory.createJSON(config);
		return json;
	}

	/**
	 * 
	 * @param req
	 * @param res
	 * @param user
	 * @param uriParser
	 * @param id
	 * @return
	 * @throws Throwable
	 */
	@RESTMethod(alias = "config/{id}", method = "put")
	public String updateConfig(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser, @URIParam(name = "id") Integer id)
			throws Throwable {
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		try {
			Config config = configFactory.createBean(Config.class, req);
			config.setUsername(user.getUsername());
			if (isWriteProtected(config)) {
				throw new WriteprotectedException();
			}
			configDAO.update(config);
		} catch (SQLException x) {
			configFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		return configFactory.getRestResponseObject();
	}

	@RESTMethod(alias = "config", method = "post")
	public String createConfig(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser)
			throws Throwable {
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		Config config = configFactory.createBean(Config.class, req);
		try {
			if (config.getConfigId() != null)
				config.setConfigId(null);

			config.setUsername(user.getUsername());

			if (isWriteProtected(config)) {
				throw new WriteprotectedException();
			}
			configDAO.add(config);
		} catch (SQLException x) {
			configFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		return configFactory.getRestResponseObject();
	}

	@RESTMethod(alias = "config/{id}", method = "delete")
	public String deleteConfig(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser, @URIParam(name = "id") Integer id)
			throws Throwable {
		OpenEmapBeanFactory<Config> configFactory = new OpenEmapBeanFactory<Config>();
		try {
			Config config = configDAO.get(id);
			if (isWriteProtected(config)) {
				throw new WriteprotectedException();
			}
			configDAO.delete(config);
		} catch (Exception x) {
			configFactory.setRestResponseObject(false, 0, x.getMessage());
		}
		return configFactory.getRestResponseObject();
	}

	/**
	 * 
	 * @param config
	 * @return
	 */
	public boolean isWriteProtected(Config config) {
		return config.getName().toLowerCase().equals("default") ? true : false;
	}
}
