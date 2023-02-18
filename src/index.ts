import rest from 'rest';
import xmlToJson from './interceptor';

import errorCodeInterceptor from 'rest/interceptor/errorCode';
import pathPrefixInterceptor from 'rest/interceptor/pathPrefix';
import mimeInterceptor from 'rest/interceptor/mime';
import retryInterceptor from 'rest/interceptor/retry';
import timeoutInterceptor from 'rest/interceptor/timeout';
import location from 'rest/interceptor/location';

export type Config = {
	timeout?: any;
	retry?: any;
};

export default function(config: Config) {

	var config = config || {};

	var restCall = rest
		.wrap(pathPrefixInterceptor, { prefix: 'https://www.boardgamegeek.com/xmlapi2/' })
		.wrap(location)
		.wrap(mimeInterceptor, { mime: 'text/xml', accept: 'text/xml' })
		.wrap(errorCodeInterceptor)
		.wrap(xmlToJson)
		.wrap(timeoutInterceptor, { timeout: config.timeout || 5000 })

	if (config.retry) {
		restCall = restCall.wrap(retryInterceptor, config.retry);
	}

	return function(path: string, params: any) {
		return restCall({
			path,
			params
		});
	};
}

