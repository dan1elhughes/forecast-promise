const axios = require('axios');
const moment = require('moment');

class Forecast {
	constructor({ accountId, token }) {
		if (!accountId || !token) {
			throw new Error('Forecast module requires accountId and token to be configured.');
		}

		const baseURL = 'https://api.forecastapp.com/';
		const headers = {
			'Authorization': `Bearer ${token}`,
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
		];

		methods.forEach(([ name, dataLocation ]) => {
			const route = '/' + name.toLowerCase();
			const prop = dataLocation || name;
			this[name] = options => this._request(route, options).then(response => response.data[prop]);
		});
	}

	_request(relativeUrl, options = {}) {
		const params = stringifyDates(options);
		return this.instance.get(relativeUrl, { params });
	}
}

function stringifyDates(options) {
	const qs = {};

	if (options.startDate) {
		qs.start_date = toDateString(options.startDate);
	}

	if (options.endDate) {
		qs.end_date = toDateString(options.endDate);
	}

	return qs;
}

function toDateString(obj) {
	let date;

	if (typeof obj === 'string') {
		date = moment(obj);
		if (!date.isValid()) {
			throw new Error('Invalid date string; expecting ISO-8601 compatible format.');
		}
	} else if (obj instanceof Date) {
		// Check for bad date objects like: new Date('LOL');
		if (isNaN(+obj)) {
			throw new Error('Invalid date object; expecting non NaN date value.');
		}
		date = moment(obj);
	} else if (obj._isAMomentObject) {
		date = obj;
	}

	if (!date) {
		throw new Error('Invalid date; expecting a valid: ISO-8601 compatible date string, a Date object or a moment date object.');
	}

	return date.format('YYYY-MM-DD');
}

module.exports = Forecast;
