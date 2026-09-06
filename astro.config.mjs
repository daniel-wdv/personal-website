// @ts-check
import { defineConfig, sharpImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and OG tags. Update if the deployment URL changes.
  site: 'https://site.danielcarvalho-wd.workers.dev',

  // Everything is prerendered; there is no server to answer Astro's on-demand
  // /_image endpoint at runtime.
  output: 'static',

  // Pin the image service explicitly. Left to its own devices the build can
  // fall back to passthrough, which ships the original files and writes
  // /_image URLs into the HTML that 404 on static hosting. Naming sharp here
  // makes a missing dependency fail the build instead of degrading silently.
  image: {
    service: sharpImageService(),
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
