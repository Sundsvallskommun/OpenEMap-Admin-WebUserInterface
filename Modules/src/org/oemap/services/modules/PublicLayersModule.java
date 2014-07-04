package org.oemap.services.modules;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

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

public class PublicLayersModule extends AnnotatedRESTModule {
	private AnnotatedDAOWrapper<Layer, Integer> layersDAO;

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

	@RESTMethod(alias = "layers", method = "get")
	public String getLayers(HttpServletRequest req, HttpServletResponse res,
			User user, URIParser uriParser) throws Exception, Throwable {
		OpenEmapBeanFactory<Layer> layerFactory = new OpenEmapBeanFactory<Layer>();
		List<Layer> layers = layersDAO.getAll();
		return layerFactory.createJSON(layers);
	}

	@RESTMethod(alias = "layers/{id}", method = "get")
	public String getLayersById(HttpServletRequest req,
			HttpServletResponse res, User user, URIParser uriParser,
			@URIParam(name = "id") Integer id) throws Throwable {
		OpenEmapBeanFactory<Layer> layerFactory = new OpenEmapBeanFactory<Layer>();
		Layer layer = layersDAO.get(id);
		return layerFactory.createJSON(layer);
	}
}
