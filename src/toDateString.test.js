const toDateString = require('./toDateString');

describe('toDateString', () => {
	it('throws without input', () => {
		expect(() => toDateString()).toThrow(
			'Invalid date; expecting a valid: ISO-8601 compatible date string, a Date object or a moment date object.'
		);
	});

	it('throws on invalid string input', () => {
		const warn = jest
			.spyOn(global.console, 'warn')
			.mockImplementation(() => {});

		expect(() => toDateString('Invalid')).toThrow(
			'Invalid date string; expecting ISO-8601 compatible format.'
		);

		// Moment deprecation warning
		expect(warn).toHaveBeenCalled();
	});

	it('works on valid string input', () => {
		expect(toDateString('01-31-2000')).toBe('2000-01-31');
	});

	it('throws on invalid Date input', () => {
		expect(() => toDateString(new Date('Invalid'))).toThrow(
			'Invalid date object; expecting non NaN date value.'
		);
	});

	it('works on valid Date input', () => {
		expect(toDateString(new Date('01-31-2000'))).toBe('2000-01-31');
	});

	it('accepts any moment-ish object', () => {
		const input = {
			_isAMomentObject: true,
			format: jest.fn().mockReturnValue('mocked value'),
		};

		expect(toDateString(input)).toBe('mocked value');

		expect(input.format).toHaveBeenCalledWith('YYYY-MM-DD');
	});
});
