export default {
  preset: 'ts-jest/presets/default-esm', // Usa el preset para ESM
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
