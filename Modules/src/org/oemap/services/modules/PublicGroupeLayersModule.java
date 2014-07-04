package org.oemap.services.modules;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.oemap.services.beans.Layer;
import org.oemap.services.bl.OpenEmapBeanFactory;

import se.unlogic.hierarchy.core.beans.User;
import se.unlogic.hierarchy.core.interfaces.ForegroundModuleDescriptor;
import se.unlogic.hierarchy.core.interfaces.SectionInterface;
import se.unlogic.hierarchy.foregroundmodules.rest.AnnotatedRESTModule;
import se.unlogic.hierarchy.foregroundmodules.rest.RESTMethod;
import se.unlogic.hierarchy.foregroundmodules.rest.URIParam;
import se.unlogic.standardutils.dao.AnnotatedDAO;
import se.unlogic.standardutils.dao.AnnotatedDAOWrapper;
import se.unlogic.standardutils.dao.SimpleAnnotatedDAOFactory;
import se.unlogic.webutils.http.URIParser;

public class PublicGroupeLayersModule extends AnnotatedRESTModule {
	private AnnotatedDAOWrapper<Layer, Integer> layersDAO;
	private static final String CLASSNAME = PublicGroupeLayersModule.class.getName();
	private static Logger logger = Logger.getLogger(CLASSNAME);
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
		AnnotatedDAO<Layer> dao = daoFactory.getDAO(Layer.class);
		layersDAO = new AnnotatedDAOWrapper<Layer, Integer>(dao, "layerId",
				Integer.class);
	}

	@RESTMethod(alias = "groupelayers", method = "get")
	public String getLayers(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Exception, Throwable {
		logger.debug("entering [ alias: groupelayers method get ]");
		OpenEmapBeanFactory<Layer> layerFactory = new OpenEmapBeanFactory<Layer>();
		List<Layer> layers = layersDAO.getAll();
		logger.debug("exiting [ alias: groupelayers method get ] , " + layers);
		return layerFactory.createJSON(layers);
	}

	@RESTMethod(alias = "groupelayers/{id}", method = "get")
	public String getLayer(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser,
			@URIParam(name = "id") Integer id) throws Throwable {
		logger.debug("entering [ alias: groupelayers method get{"+id+"} ]");
		OpenEmapBeanFactory<Layer> layerFactory = new OpenEmapBeanFactory<Layer>();
		Layer layer = layersDAO.get(id);
		logger.debug("exiting [ alias: groupelayers method get ] , " + layer);
		return layerFactory.createJSON(layer);
	}
}