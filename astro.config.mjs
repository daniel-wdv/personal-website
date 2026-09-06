// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and OG tags. Update if the deployment URL changes.
  site: 'https://site.danielcarvalho-wd.workers.dev',
  vite: {
    plugins: [tailwindcss()]
  }
});