import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/todo/',
  test: {
    environment: 'jsdom',
  },
});