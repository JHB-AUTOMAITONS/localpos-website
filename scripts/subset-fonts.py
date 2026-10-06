"""
Builds the trimmed web fonts in src/assets/fonts/ from the Fontsource packages.

Why: the stock "latin-ext" files cost ~40 KB just to draw the rupee sign. We keep each family's Latin
subset (trimmed to what the site uses) and add a tiny file that contains only the rupee glyph (U+20B9).

Run only when fonts change (needs `pip install fonttools brotli`):
    python scripts/subset-fonts.py
"""
from io import BytesIO
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

root = Path(__file__).resolve().parent.parent
pkgs = root / "node_modules" / "@fontsource-variable"
out = root / "src" / "assets" / "fonts"
out.mkdir(parents=True, exist_ok=True)

# Basic Latin + Latin-1, typographic punctuation, euro/trademark, minus. No other scripts.
LATIN = "U+0020-007E,U+00A0-00FF,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+20AC,U+2122,U+2212"
RUPEE = "U+20B9"

# (folder, latin file, latin-ext file, weight range actually used on the site)
FAMILIES = {
    "figtree": ("figtree", "figtree-latin-wght-normal.woff2", "figtree-latin-ext-wght-normal.woff2", (400, 800)),
    "bricolage-grotesque": ("bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2", "bricolage-grotesque-latin-ext-wght-normal.woff2", (500, 800)),
    # JetBrains Mono has no rupee glyph, so it gets no rupee file: the CSS font stack falls back to Figtree for U+20B9.
    "jetbrains-mono": ("jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2", None, (400, 700)),
}


def make(src: Path, dest: Path, unicodes: str, weights: tuple) -> None:
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "calt", "tnum", "ccmp", "locl", "mark", "mkmk"]
    opts.notdef_outline = True
    opts.name_IDs = [1, 2]
    opts.drop_tables += ["DSIG"]
    # Keep the variable axis, but only across the weights the site uses.
    font = TTFont(str(src), lazy=False)
    font = instancer.instantiateVariableFont(font, {"wght": weights})
    buf = BytesIO()
    font.flavor = None
    font.save(buf)
    buf.seek(0)
    font = subset.load_font(buf, opts, lazy=False)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(unicodes))
    sub.subset(font)
    subset.save_font(font, str(dest), opts)
    print(f"{dest.name}: {dest.stat().st_size / 1024:.1f} KB  (wght {weights[0]}-{weights[1]})")


for folder, latin, ext, weights in FAMILIES.values():
    base = pkgs / folder / "files"
    make(base / latin, out / f"{folder}-latin.woff2", LATIN, weights)
    if ext:
        make(base / ext, out / f"{folder}-rupee.woff2", RUPEE, weights)
