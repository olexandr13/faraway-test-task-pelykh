import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testMatch: ['/**/*.test.ts'],
  testEnvironment: "node",
  testTimeout: 30000,
};

export default config;
