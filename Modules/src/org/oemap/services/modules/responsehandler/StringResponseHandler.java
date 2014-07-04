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
