const axios = require('axios');
const Forecast = require('./index');

jest.mock('axios');

jest.mock('./toDateString', () => () => 'mock__dateString');

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

	it('calls requests on axios', async () => {
		const get = jest.fn().mockImplementation(async url => {
			if (url === '/whoami') {
				return {
					data: { current_user: 'mock__user' },
				};
			}

			return {
				data: {
					[url.substring(1)]: url,
				},
			};
		});

		const axiosMock = { get };

		const f = new Forecast(MOCK_CREDENTIALS, axiosMock);

		const whoAmI = await f.whoAmI();

		expect(whoAmI).toEqual('mock__user');

		const projects = await f.projects({
			startDate: 'mock__input',
			endDate: 'mock__input',
		});

		// Not mocking API response, just want to know the query went out
		expect(projects).toEqual('/projects');

		expect(get).toBeCalledTimes(2);
	});
});
