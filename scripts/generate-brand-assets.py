#!/usr/bin/env python3
"""
Generates the favicon set and the Open Graph share image.

These are committed as static files rather than built at deploy time, so the
site has no image-generation dependency. Re-run this only when the palette or
the portrait changes:

    python3 scripts/generate-brand-assets.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
PORTRAIT = ROOT / "src" / "assets" / "daniel.png"

# Mirrors src/styles/global.css.
BG = (11, 17, 20)
SURFACE = (17, 26, 30)
TEXT = (230, 237, 240)
MUTED = (143, 163, 171)
ACCENT = (47, 179, 163)

SANS_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"


def rounded_tile(size: int) -> Image.Image:
    """A teal-bordered dark tile with a centred DC monogram."""
    scale = 4  # supersample, then downscale, for clean edges at small sizes
    px = size * scale
    img = Image.new("RGBA", (px, px), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    radius = int(px * 0.22)
    draw.rounded_rectangle([0, 0, px - 1, px - 1], radius=radius, fill=BG)
    draw.rounded_rectangle(
        [0, 0, px - 1, px - 1],
        radius=radius,
        outline=ACCENT,
        width=max(1, int(px * 0.055)),
    )

    font = ImageFont.truetype(SANS_BOLD, int(px * 0.46))
    left, top, right, bottom = draw.textbbox((0, 0), "DC", font=font)
    draw.text(
        ((px - (right - left)) / 2 - left, (px - (bottom - top)) / 2 - top),
        "DC",
        font=font,
        fill=ACCENT,
    )

    return img.resize((size, size), Image.LANCZOS)


def circular(image: Image.Image, size: int) -> Image.Image:
    """Centre-crop to a square, resize, and mask to a circle."""
    w, h = image.size
    side = min(w, h)
    image = image.crop(
        ((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2)
    ).resize((size, size), Image.LANCZOS)

    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size * 4 - 1, size * 4 - 1], fill=255)
    image.putalpha(mask.resize((size, size), Image.LANCZOS))
    return image


def build_favicons() -> None:
    for size, name in [(32, "favicon-32.png"), (180, "apple-touch-icon.png")]:
        rounded_tile(size).save(PUBLIC / name)

    icon = rounded_tile(64)
    icon.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("favicons written")


def build_og_image() -> None:
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Accent rule down the left edge.
    draw.rectangle([0, 0, 11, H], fill=ACCENT)

    name = ImageFont.truetype(SANS_BOLD, 92)
    role = ImageFont.truetype(MONO, 30)
    tag = ImageFont.truetype(MONO, 26)

    x = 96
    draw.text((x, 214), "FULLSTACK ENGINEER", font=role, fill=ACCENT)
    draw.text((x, 268), "Daniel", font=name, fill=TEXT)
    draw.text((x, 366), "Carvalho", font=name, fill=TEXT)
    draw.text((x, 486), "site.danielcarvalho-wd.workers.dev", font=tag, fill=MUTED)

    # Portrait, ringed in the accent colour to match the hero.
    size = 300
    portrait = circular(Image.open(PORTRAIT).convert("RGBA"), size)
    px, py = W - size - 96, (H - size) // 2
    ring = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(ring).ellipse(
        [px - 5, py - 5, px + size + 4, py + size + 4], outline=ACCENT, width=5
    )
    img.paste(portrait, (px, py), portrait)
    img.paste(ring, (0, 0), ring)

    img.save(PUBLIC / "og.png", optimize=True)
    print(f"og.png written ({(PUBLIC / 'og.png').stat().st_size // 1024}K)")


def build_site_images() -> None:
    """
    Pre-render every image the site uses, at 1x and 2x of its display size.

    Astro's build-time image pipeline needs sharp, which does not run in our
    host's build environment; left to itself the build silently falls back to
    passthrough and writes /_image URLs that 404 in production. Generating the
    derivatives here instead means what we test locally is exactly what ships.
    Keep the sizes in sync with src/config/images.ts.
    """
    out = PUBLIC / "img"
    out.mkdir(exist_ok=True)

    # name, source, display width, aspect (w/h). Square crops are rendered as
    # circles by CSS, so cropping here avoids any object-fit surprises.
    specs = [
        ("daniel", PORTRAIT, 160, 1 / 1),
        ("luis", ROOT / "src/assets/luis-gestoso.png", 56, 1 / 1),
        ("joao", ROOT / "src/assets/joao-neves.png", 56, 1 / 1),
        ("dog", ROOT / "src/assets/dog.jpg", 260, 3 / 4),
    ]

    for name, source, width, aspect in specs:
        original = Image.open(source).convert("RGB")
        for scale in (1, 2):
            w = width * scale
            h = round(w / aspect)

            # Centre-crop to the target aspect before resizing.
            ow, oh = original.size
            if ow / oh > aspect:
                cw = round(oh * aspect)
                box = ((ow - cw) // 2, 0, (ow + cw) // 2, oh)
            else:
                ch = round(ow / aspect)
                top = round((oh - ch) * 0.35)  # bias upward: faces sit high
                box = (0, top, ow, top + ch)

            frame = original.crop(box).resize((w, h), Image.LANCZOS)
            path = out / f"{name}-{w}.webp"
            frame.save(path, "WEBP", quality=82, method=6)
            print(f"  {path.name:18} {w}x{h}  {path.stat().st_size // 1024}K")


if __name__ == "__main__":
    build_favicons()
    build_og_image()
    build_site_images()
