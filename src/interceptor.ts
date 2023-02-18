import interceptor from 'rest/interceptor';
import parser from 'xml2json';

export default interceptor({
	success: (response) => {
		console.info('XML to JSON', response.headers);
		const contentType = response.headers['Content-Type'];
		if (typeof contentType === 'string' && contentType.startsWith('text/xml')) {
			const json = parser.toJson(response.entity, {
				object: true
			});

			response = {
				...response,
				headers: {
					...response.headers,
					'Content-Type': 'application/json'
				},
				entity: JSON.stringify(json)
			};
		}

		return response;
	}
});

