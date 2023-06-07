import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testMatch: ['**/tests/**/*.ts'],
  testEnvironment: "node",
  testTimeout: 30000,
};

export default config;
