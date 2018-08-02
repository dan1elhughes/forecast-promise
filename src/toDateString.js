const moment = require('moment');

module.exports = obj => {
	let date;

	if (typeof obj === 'string') {
		date = moment(obj);
		if (!date.isValid()) {
			throw new Error(
				'Invalid date string; expecting ISO-8601 compatible format.'
			);
		}
	} else if (obj instanceof Date) {
		// Check for bad date objects like: new Date('LOL');
		if (isNaN(+obj)) {
			throw new Error('Invalid date object; expecting non NaN date value.');
		}
		date = moment(obj);
	} else if (obj && obj._isAMomentObject) {
		date = obj;
	}

	if (!date) {
		throw new Error(
			'Invalid date; expecting a valid: ISO-8601 compatible date string, a Date object or a moment date object.'
		);
	}

	return date.format('YYYY-MM-DD');
};
