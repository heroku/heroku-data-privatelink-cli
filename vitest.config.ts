import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/*.d.ts'],
      include: ['src/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    disableConsoleIntercept: true,
    include: ['test/**/*.unit.test.ts'],
    setupFiles: ['test/helpers/init.ts'],
    testTimeout: 30_000,
  },
})
