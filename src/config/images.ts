/**
 * Pre-rendered images, produced by scripts/generate-brand-assets.py.
 *
 * We deliberately do not use astro:assets here. Its build-time pipeline needs
 * sharp, which does not run in our host's build environment, and Astro silently
 * degrades to a passthrough service that ships the originals and writes
 * /_image URLs that 404 in production. Committing the derivatives keeps the
 * deployed output identical to what we test locally.
 *
 * To add or resize an image: edit the specs in the script, re-run it, and
 * update the matching entry here.
 */
type Img = {
  src: string;
  srcset: string;
  sizes: string;
  width: number;
  height: number;
};

function pair(name: string, base: number, aspect = 1): Img {
  const retina = base * 2;
  return {
    src: `/img/${name}-${retina}.webp`,
    srcset: `/img/${name}-${base}.webp ${base}w, /img/${name}-${retina}.webp ${retina}w`,
    sizes: `${base}px`,
    width: retina,
    height: Math.round(retina / aspect),
  };
}

export const images = {
  portrait: pair("daniel", 160),
  luis: pair("luis", 56),
  joao: pair("joao", 56),
  dog: pair("dog", 260, 3 / 4),
} as const;

export type ImageKey = keyof typeof images;
