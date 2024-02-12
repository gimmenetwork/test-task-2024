import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { vi } from 'vitest';

import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), viteCommonjs()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        conditions: process.env.VITEST ? ['node'] : [],
    },
});
