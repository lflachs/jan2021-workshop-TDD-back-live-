const app = require('../../app');
const agent = require('supertest').agent(app);
const client = require('../../config/db');
const path = require('path');
const packageJson = require(path.join(__dirname, '../../package.json'));

afterAll(async () => {
	console.log('After All');
	await client.$disconnect();
});
beforeEach(async () => {
	console.log('beforeEach');
});
afterEach(async () => {
	console.log('After Each');
});

describe('API Endpoints', () => {
	it('GET /api should return the name and the api version', async () => {
		const response = await agent
			.get('/api')
			.expect(200)
			.expect('content-type', /json/);
		expect(response.body).toBeDefined();
		expect(response.body.version).toBe(packageJson.version);
		expect(response.body.name).toBe(packageJson.name);
	});
	it('GET /404 should return a 404 status and a Not found message', async () => {
		const response = await agent
			.get('/404')
			.expect(404)
			.expect('content-type', /json/);
		expect(response.body).toBeDefined();
		expect(response.body.message).toBe('Not Found');
	});
});
