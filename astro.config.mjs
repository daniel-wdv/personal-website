// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and OG tags. Update if the deployment URL changes.
  site: 'https://site.danielcarvalho-wd.workers.dev',

  // Everything is prerendered; there is no server to answer Astro's on-demand
  // /_image endpoint at runtime.
  output: 'static',

  // Nothing goes through astro:assets: every image is pre-rendered by
  // scripts/generate-brand-assets.py and referenced from src/config/images.ts.
  // Passthrough guarantees the build never reaches for sharp, which does not
  // run in our host's build environment.
  image: {
    service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
