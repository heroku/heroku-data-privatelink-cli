import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.unit.test.ts'],
    setupFiles: ['test/helpers/init.ts'],
    testTimeout: 30_000,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'html'],
    },
  },
})
