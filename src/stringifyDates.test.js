const stringifyDates = require('./stringifyDates');

// Mocks the toDateString function to always return
// the input. It isn't the system under test in this
// file.
jest.mock('./toDateString', () => args => args);

describe('stringifyDates', () => {
	it('returns input as-is', () => {
		expect(stringifyDates({})).toEqual({});
	});

	it('converts the start date', () => {
		expect(stringifyDates({ startDate: 'someValue' })).toMatchObject({
			start_date: 'someValue',
		});
	});

	it('converts the end date', () => {
		const output = stringifyDates({ endDate: 'someValue' });

		expect(output).toMatchObject({
			end_date: 'someValue',
		});

		expect(Object.keys(output).length).toBe(1);
	});
});
