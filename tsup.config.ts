import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	sourcemap: true,
	dts: true,
	format: ['esm', 'cjs'],
	env: {
		NODE_ENV: 'production',
	},
});
