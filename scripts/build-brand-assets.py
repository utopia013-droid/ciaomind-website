"""Build CIAOMIND's shared identity files and communication templates.

Uses the existing outlined symbol and letters. Arial is outlined for the descriptor.
Run from the repository root with Python, fontTools and Playwright installed.
"""
from pathlib import Path
import json
import re
import shutil
import zipfile
from html import escape
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "brand"
GREEN = "#1C4036"
CREAM = "#F7F5EF"
DESCRIPTOR = "CULTURE · INDUSTRY · INNOVATION"

def source_path(name):
    source = (ROOT / "lib" / "brand-paths.ts").read_text(encoding="utf-8")
    return re.search(r'export const ' + name + r' = "([^"]+)"', source).group(1)

def descriptor_path():
    font = TTFont("C:/Windows/Fonts/arial.ttf")
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = 13.5 / font["head"].unitsPerEm
    pen = SVGPathPen(glyphs)
    x = 132.0
    for letter in DESCRIPTOR:
        glyph = glyphs[cmap[ord(letter)]]
        glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, x, 89)))
        x += glyph.width * scale + 1.85
    return pen.getCommands()

def symbol(color, inverse=False):
    # The same nested silhouette used by the website motion identity.
    center = GREEN if inverse else "#FFFFFF"
    outer = "#FFFFFF" if inverse else color
    return f'<g><path fill="{outer}" d="{source_path("starPath")}"/><path fill="{center}" transform="translate(54 54) scale(.6) translate(-54 -54)" d="{source_path("starPath")}"/></g>'

def lettering(color, descriptor):
    return f'<g fill="{color}"><path transform="translate(8 18)" d="{source_path("ciaoPath")}"/><path transform="translate(194 -42)" d="{source_path("mindPath")}"/><g transform="translate(2 122) scale(1.663955) translate(-132.67236328125 -79.1650390625)"><path d="{descriptor}"/></g></g>'

def svg(content, width, height, title):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="{escape(title,quote=True)}">{content}</svg>'

def scene(width, height, lockup, label=None):
    # Communication artwork uses consistent margins and one shared master.
    centered = height > width
    mark_width = min(width * .76, height * 2.5)
    if centered:
        mark_width = width * .8
    mark_height = mark_width * 146 / 500
    x = (width - mark_width) / 2
    y = (height - mark_height) / 2
    art = f'<rect width="{width}" height="{height}" fill="{GREEN}"/>'
    art += f'<g transform="translate({x:.3f} {y:.3f}) scale({mark_width/500:.6f})">{lockup}</g>'
    art += f'<text x="{width*.08}" y="{height*.92}" fill="#FFFFFF" font-family="Arial,sans-serif" font-size="{max(16,width*.018)}">ciaomind.com</text>'
    return svg(art,width,height,label or "CIAOMIND communication cover")

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    d = descriptor_path()
    geometry = {
        "viewBox": "0 0 500 146",
        "descriptor": DESCRIPTOR,
        "descriptorPath": d,
        "ciaoTransform": "translate(8 18)",
        "mindTransform": "translate(194 -42)",
        "colors": {"green": GREEN, "cream": CREAM, "white": "#FFFFFF"}
    }
    (ROOT / "lib" / "brand-signature.json").write_text(json.dumps(geometry,indent=2)+"\n",encoding="utf-8")
    masters = {}
    for name,color,inverse in [("green",GREEN,False),("inverse","#FFFFFF",True),("mono","#000000",False)]:
        mark = symbol(color,inverse) + lettering(color,d)
        masters[name] = mark
        (OUT / f"ciaomind-lockup-{name}.svg").write_text(svg(mark,500,146,"CIAOMIND — "+DESCRIPTOR),encoding="utf-8")
        stacked = symbol(color,inverse) + f'<g fill="{color}"><path d="{source_path("ciaoPath")}"/><path d="{source_path("mindPath")}"/></g>'
        (OUT / f"ciaomind-stacked-{name}.svg").write_text(svg(stacked,300,108,"CIAOMIND stacked signature"),encoding="utf-8")
        icon = svg(symbol(color,inverse),108,108,"CIAOMIND symbol")
        (OUT / f"ciaomind-icon-{name}.svg").write_text(icon,encoding="utf-8")
        centered = f'<g transform="translate(246 12)">{symbol(color,inverse)}</g><g fill="{color}"><path transform="translate(-12 140)" d="{source_path("ciaoPath")}"/><path transform="translate(174 80)" d="{source_path("mindPath")}"/><g transform="translate(60 234) scale(1.630) translate(-132.67236328125 -79.1650390625)"><path d="{d}"/></g></g>'
        (OUT / f"ciaomind-centered-{name}.svg").write_text(svg(centered,600,270,"CIAOMIND centered signature"),encoding="utf-8")
    covers = [
        ("ciaomind-social",1200,630),
        ("ciaomind-avatar",1080,1080),
        ("ciaomind-post",1080,1350),
        ("ciaomind-story",1080,1920),
        ("ciaomind-presentation-cover",1920,1080),
        ("ciaomind-video-endcard",1920,1080),
        ("ciaomind-wide-cover",1920,640)
    ]
    for name,w,h in covers:
        if name == "ciaomind-avatar":
            content=f'<rect width="1080" height="1080" fill="{GREEN}"/><g transform="translate(270 270) scale(5)">{symbol("#FFFFFF",True)}</g>'
            art=svg(content,w,h,"CIAOMIND avatar")
        else:
            art=scene(w,h,masters["inverse"])
        (OUT / f"{name}.svg").write_text(art,encoding="utf-8")
    preview = svg(f'<rect width="1200" height="420" fill="{CREAM}"/><g transform="translate(50 130)">{masters["green"]}</g><rect x="640" width="560" height="420" fill="{GREEN}"/><g transform="translate(666 130) scale(.93)">{masters["inverse"]}</g>',1200,420,"CIAOMIND green and white signatures")
    (OUT / "ciaomind-preview.svg").write_text(preview,encoding="utf-8")
    email = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>CIAOMIND email signature</title></head><body style="font-family:Arial,sans-serif;color:{GREEN};background:white"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="padding:12px 0 14px"><a href="https://www.ciaomind.com"><img src="https://www.ciaomind.com/brand/ciaomind-lockup-green.png" width="250" height="73" alt="CIAOMIND"></a></td></tr><tr><td style="font-size:12px;line-height:1.8">CIAOMIND S.B. S.R.L.<br><a href="https://www.ciaomind.com" style="color:{GREEN}">ciaomind.com</a> · <a href="mailto:info@ciaomind.com" style="color:{GREEN}">info@ciaomind.com</a></td></tr></table></body></html>'''
    (OUT / "ciaomind-email-signature.html").write_text(email,encoding="utf-8")
    letterhead=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>CIAOMIND letterhead</title><style>@page{{size:A4;margin:20mm}}body{{margin:0;color:{GREEN};font:12pt Arial,sans-serif}}header{{padding-bottom:12mm;border-bottom:1px solid #ccd4cc}}header svg{{width:78mm;height:auto}}main{{min-height:200mm}}footer{{font-size:8pt;line-height:1.7;border-top:1px solid #ccd4cc;padding-top:4mm}}@media screen{{body{{max-width:170mm;margin:20mm auto}}main{{min-height:200mm}}}}</style></head><body><header>{svg(masters["green"],500,146,"CIAOMIND")}</header><main contenteditable="true" aria-label="Letter content"></main><footer>CIAOMIND S.B. S.R.L. · P. IVA 04260950136 · REA CO - 431951<br>ciaomind.com · info@ciaomind.com</footer></body></html>'''
    (OUT / "ciaomind-letterhead.html").write_text(letterhead,encoding="utf-8")
    with sync_playwright() as p:
        browser=p.chromium.launch(channel="msedge",headless=True)
        page=browser.new_page(device_scale_factor=1)
        for asset in OUT.glob("*.svg"):
            if asset.name == "ciaomind-icon.svg":
                continue
            text=asset.read_text(encoding="utf-8")
            match=re.search(r'width="(\d+)" height="(\d+)"',text)
            if not match:
                continue
            w,h=map(int,match.groups())
            factor=4 if asset.name.startswith(("ciaomind-lockup-","ciaomind-centered-","ciaomind-stacked-","ciaomind-icon-")) else 1
            page.set_viewport_size({"width":w*factor,"height":h*factor})
            page.set_content('<html><head><style>html,body{margin:0;background:transparent}svg{display:block;width:100vw;height:100vh}</style></head><body>'+text+'</body></html>')
            page.screenshot(path=str(asset.with_suffix(".png")),omit_background=True)
        page.goto((OUT / "ciaomind-letterhead.html").as_uri())
        page.pdf(path=str(OUT / "ciaomind-letterhead.pdf"),format="A4",print_background=True,prefer_css_page_size=True)
        browser.close()
    shutil.copyfile(OUT/"ciaomind-stacked-green.png",OUT/"ciaomind-logo.png")
    shutil.copyfile(OUT/"ciaomind-icon-green.png",OUT/"ciaomind-icon.png")
    for png in OUT.glob("*.png"):
        with Image.open(png) as image:
            image.save(png.with_suffix(".webp"),"WEBP",lossless=True,method=6)
    manifest={
        "version":"2026-11-19-r3","name":"CIAOMIND","descriptor":DESCRIPTOR,
        "master":"/brand/ciaomind-lockup-green.svg",
        "webMaster":"/brand/ciaomind-stacked-green.svg",
        "formats":["SVG","PNG","WebP"],
        "clearSpace":"Keep at least one quarter of the symbol width around the complete signature.",
        "variants":["horizontal-full-width-descriptor","stacked-ciao-over-mind","centered","symbol"],
        "colors":geometry["colors"],
        "covers":[{"file":f"/brand/{n}.png","width":w,"height":h} for n,w,h in covers],
        "templates":["/brand/ciaomind-email-signature.html","/brand/ciaomind-letterhead.html","/brand/ciaomind-letterhead.pdf"]
    }
    (OUT/"brand-manifest.json").write_text(json.dumps(manifest,indent=2)+"\n",encoding="utf-8")
    (OUT/"READ_ME.txt").write_text("CIAOMIND identity kit | 2026-11-19-r3\n\nMaster identity: the existing CIAOMIND symbol and outlined serif lettering.\nDescriptor: CULTURE · INDUSTRY · INNOVATION\nHorizontal / opening: descriptor beneath and aligned with the complete symbol + name.\nStacked / page header and footer: CIAO above MIND, without descriptor.\n\nUse green on a light background and the inverse signature on solid deep green.\nUse the symbol for small avatars. Keep one quarter of the symbol width as clear space.\nPreserve the aspect ratio and the full CIAOMIND name.\n\nSVG, PNG and lossless WebP are provided.\nPNG files are transparent unless they are communication covers. SVG files are editable vectors.\nPresentation and video covers are 1920 x 1080. Social post is 1080 x 1350. Story is 1080 x 1920.\nWide cover is a general layout, to be adapted to each channel's current crop.\n\nEmail signature is supplied as HTML. Letterhead is supplied as editable printable HTML and A4 PDF.\nOpening assets does not change an account profile or a previously published document.\n\nCurrent source and usage guidance: https://www.ciaomind.com/en/brand/\n",encoding="utf-8")
    with zipfile.ZipFile(OUT/"ciaomind-brand-kit.zip","w",zipfile.ZIP_DEFLATED) as archive:
        for asset in sorted(OUT.iterdir()):
            if asset.is_file() and asset.suffix in [".svg",".png",".webp",".html",".pdf",".json",".txt"]:
                archive.write(asset,asset.name)
    print(json.dumps({"assets":len(list(OUT.iterdir())),"zip_bytes":(OUT/"ciaomind-brand-kit.zip").stat().st_size}))

if __name__ == "__main__":
    main()
