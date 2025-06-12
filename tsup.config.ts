import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    outDir: 'dist',
    dts: true,
    sourcemap: true,
    clean: true,
    skipNodeModulesBundle: true,
  },
  {
    entry: ['src/cli.ts'],
    format: ['esm'],
    outDir: 'dist/cli',
    clean: false,
    dts: false,
    banner: {
      js: '#!/usr/bin/env node',
    },
  }]);
