import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  target: 'node18',
  clean: true,
  outDir: 'dist',
  minify: false,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
