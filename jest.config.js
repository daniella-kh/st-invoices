module.exports = {
	// A path to a module which exports an async function that is triggered once before all test suites
	//globalSetup: "./test/jest.setup.js",

	// A path to a module which exports an async function that is triggered once after all test suites
	//globalTeardown: "./test/jest.teardown.js",

	// The test environment that will be used for testing
	"testEnvironment": "node",
	"setupFilesAfterEnv": [ './tests/jest.setup.js' ],
	"coverageReporters": [
		"lcov",
		"text-summary"
	],
	"collectCoverage": true,
	"coverageThreshold": {
		"global": {
			"branches": 90,
			"functions": 90,
			"statements": 90
		},
	}
};
