const toDateString = require('./toDateString');

module.exports = options => {
	const qs = Object.assign(options);

	if (options.startDate) {
		qs.start_date = toDateString(options.startDate);
		delete qs.startDate;
	}

	if (options.endDate) {
		qs.end_date = toDateString(options.endDate);
		delete qs.endDate;
	}

	if (options.starting) {
		qs.starting = toDateString(options.starting);
	}

	if (options.ending) {
		qs.ending = toDateString(options.ending);
	}

	return qs;
};
