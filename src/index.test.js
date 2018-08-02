const axios = require('axios');
const Forecast = require('./index');

jest.mock('axios');

const MOCK_CREDENTIALS = {
	accountId: 'mock__accountId',
	token: 'mock__token',
};

describe('forecast-promise', () => {
	it('crashes with no input', () => {
		expect(() => new Forecast()).toThrow(
			'Forecast module requires accountId and token to be configured.'
		);
	});

	it('crashes with only one input', () => {
		expect(
			() => new Forecast({ accountId: MOCK_CREDENTIALS.accountId })
		).toThrow('Forecast module requires accountId and token to be configured.');

		expect(() => new Forecast({ token: MOCK_CREDENTIALS.token })).toThrow(
			'Forecast module requires accountId and token to be configured.'
		);
	});

	it('instantiates axios with valid input', () => {
		axios.create.mockImplementation(args => args);
		const f = new Forecast(MOCK_CREDENTIALS);

		expect(f.instance).toEqual({
			baseURL: 'https://api.forecastapp.com/',
			headers: {
				Authorization: `Bearer ${MOCK_CREDENTIALS.token}`,
				'Forecast-Account-Id': MOCK_CREDENTIALS.accountId,
				'User-Agent': 'https://www.npmjs.com/package/forecast-promise',
			},
		});
	});
});
