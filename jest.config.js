/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/test'],
	testMatch: ['**/*.test.ts'],
	collectCoverageFrom: [
		'nodes/**/*.ts',
		'credentials/**/*.ts',
		'!**/*.d.ts',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	moduleFileExtensions: ['ts', 'js', 'json'],
	transform: {
		'^.+\\.ts$': ['ts-jest', {
			tsconfig: {
				module: 'commonjs',
				target: 'ES2021',
				esModuleInterop: true,
				skipLibCheck: true,
			},
		}],
	},
	moduleNameMapper: {
		'^n8n-workflow$': '<rootDir>/node_modules/n8n-workflow',
	},
	testTimeout: 30000,
};
