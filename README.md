# Node Forecast promise API

A Forecast ([https://forecastapp.com](https://forecastapp.com)) API wrapper for Node.js. Forked from [inlight-media/node-forecast-api](https://github.com/inlight-media/node-forecast-api).

## Installation

Via npm:

```bash
$ npm install --save forecast-promise
```

# Getting started

You will need a Forecast account, accountId and personal access token.

To find your accountId and generate the token, log into Forecast and go to [Developers](https://id.getharvest.com/developers), then click _Create New Personal Access Token_.

# Usage

```js
const Forecast = require('forecast-promise');
const forecast = new Forecast({
	accountId: '12345',
	token: '54321.abc.1-EXAMPLETOKEN'
});
```

## People

```js
forecast.people().then(people => {
	console.log(people);
});
```

## Clients

```js
forecast.clients().then(clients => {
	console.log(clients);
});
```

## Projects

```js
forecast.projects().then(projects => {
	console.log(projects);
});
```

## Assignments

Assignments supports the following options (see below for more details):
- `startDate`
- `endDate`

```js
var options = {
	startDate: new Date(),
	endDate: new Date(2018, 11, 25)
};
forecast.assignments(options).then(assignments => {
	console.log(assignments);
});
```

Assignments can also be called without options and will use a default start and end date.

```js
forecast.assignments().then(assignments => {
	console.log(assignments);
});
```

## Milestones

Milestones supports the following options (see below for more details):
- `startDate`
- `endDate`

```js
var options = {
	startDate: new Date(),
	endDate: new Date(2018, 11, 25)
};
forecast.milestones(options).then(milestones => {
	console.log(milestones);
});
```

Milestones can also be called without options.

```js
forecast.milestones().then(milestones => {
	console.log(milestones);
});
```

### Options

* `startDate` - a native date object, a moment.js date object or an ISO-8601 compatible date string.
* `endDate` - a native date object, a moment.js date object or an ISO-8601 compatible date string.
