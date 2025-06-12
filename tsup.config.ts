import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],   // CLI entry
    format: ['esm', 'cjs'],
    outDir: 'dist',
    dts: true,
    sourcemap: true,
    clean: true,
    skipNodeModulesBundle: true,
  },
  {
    entry: ['src/cli.ts'],   // CLI entry
    format: ['esm', 'cjs'],
    outDir: 'dist/cli',
    clean: false,
    dts: false,
    banner: {
      js: '#!/usr/bin/env node',
    },
  }]);
