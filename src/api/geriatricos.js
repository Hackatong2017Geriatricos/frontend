// import config from 'config';
import geriatricosMock from './mocks/geriatricos.json';

const obtener = () => {
  return new Promise(function(resolve, reject) {
    resolve(geriatricosMock);
  });
  // return fetch(
	// 	`${config.backend.baseUrl}/locales.json`,
	// 	{
	// 		method: 'GET',
	// 		headers: {
	// 			'Accept': 'application/json, text/plain, */*',
	// 			'Content-Type': 'application/json'
	// 		}
	// 	}
	// ).then(r => r.json())
  // .catch(() => (geriatricosMock));
};

export default {
  obtener
};
