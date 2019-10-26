const toDateString = require('./toDateString');

module.exports = options => {
	const qs = {};

	if (options.startDate) qs.start_date = toDateString(options.startDate);

	if (options.endDate) {
		qs.end_date = toDateString(options.endDate);
	}

	if (options.personId) {
		qs.person_id = options.personId;
	}

	return qs;
};
