const express = require('express');
const app = express();
const createError = require('http-errors');
const PORT = process.env.PORT || 8000;
const path = require('path');

app.get('/api', (req, res, next) => {
	const packageJson = require(path.join(__dirname, 'package.json'));
	res
		.status(200)
		.json({ name: packageJson.name, version: packageJson.version });
});

app.get('/error', (req, res, next) => {
	console.log('hello');
	// const myCustomError = new Error('Not Found');
	// myCustomError.status = 404;
	// next(myCustomError);
	next(new Error('User password is not defined '));
});

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	err.status = err.status || 500;

	if (err.status === 500) {
		console.log(err);
	}

	if (process.env.NODE_ENV === 'production' && err.status === 500) {
		err.message = 'Something went wrong...';
	}
	res.status(err.status).json({ message: err.message });
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`app is running on ${PORT}`);
	});
}

module.exports = app;
