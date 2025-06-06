import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8', // Or 'c8'
      reporter: ['text', 'html'],
      all: true,
      include: ['src/**/*.ts'],
    },
  },
});
