import rest from 'rest';
import interceptor from './interceptor';

var errorCodeInterceptor = require('rest/interceptor/errorCode');
var pathPrefixInterceptor = require('rest/interceptor/pathPrefix');
var mimeInterceptor = require('rest/interceptor/mime');
var retryInterceptor = require('rest/interceptor/retry');
var timeoutInterceptor = require('rest/interceptor/timeout');

export type Config = {
	timeout?: any;
	retry?: any;
};

export default function(config: Config) {

	var config = config || {};

	var restCall = rest
		.wrap(pathPrefixInterceptor, { prefix: 'https://www.boardgamegeek.com/xmlapi2/' })
		.wrap(mimeInterceptor, { mime: 'text/xml', accept: 'text/xml' })
		.wrap(errorCodeInterceptor)
		.wrap(interceptor)
		.wrap(timeoutInterceptor, { timeout: config.timeout || 5000 });

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

