import interceptor from 'rest/interceptor';
import parser from 'xml2json';

export default interceptor({
	success: (response) => {
		return {
			...response,
			entity: parser.toJson(response.entity, {
				object: true
			})
		}
	}
});

