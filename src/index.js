const axios = require('axios');
const stringifyDates = require('./stringifyDates');

class Forecast {
	constructor({ accountId, token } = {}) {
		if (!accountId || !token) {
			throw new Error(
				'Forecast module requires accountId and token to be configured.'
			);
		}

		const baseURL = 'https://api.forecastapp.com/';
		const headers = {
			Authorization: `Bearer ${token}`,
			'Forecast-Account-Id': accountId,
			'User-Agent': 'https://www.npmjs.com/package/forecast-promise',
		};

		this.instance = axios.create({
			baseURL,
			headers,
		});

		const methods = [
			['whoAmI', 'current_user'],
			['clients'],
			['people'],
			['projects'],
			['assignments'],
			['milestones'],
			['roles'],
		];

		methods.forEach(([name, dataLocation]) => {
			const route = '/' + name.toLowerCase();
			const prop = dataLocation || name;
			this[name] = options =>
				this._request(route, options).then(response => response.data[prop]);
		});
	}

	_request(relativeUrl, options = {}) {
		const params = stringifyDates(options);
		return this.instance.get(relativeUrl, { params });
	}
}

module.exports = Forecast;
