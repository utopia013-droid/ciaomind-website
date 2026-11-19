# CIAOMIND identity presentation

Reference capture made on 2026-11-19 from [Wellington College China](https://www.wellingtoncollege.cn/zh_cn/). The official group identity and its homepage header were inspected. Reference scope covers identity composition and communication hierarchy.

## Observed reference

The group uses a compact emblem on the left and a multi-level uppercase wordmark on the right, with consistent alignment and a quiet header area. The official logo is reused within the school network presentation.

Firecrawl extracted Euclid-Circular-A and SourceHanSansCN as page typefaces. These are reference website body fonts. The extracted white background and dark text reflect the page presentation. No private brand manual was available during this capture.

## CIAOMIND application

The implementation retains the existing four-point CIAOMIND symbol and serif letter outlines. The shared signature places the symbol on the left, the full CIAOMIND name on one line and an explanatory line beneath it.

The explanatory line chosen for this version is CULTURE · INDUSTRY · INNOVATION. This is a CIAOMIND implementation decision based on the product vision.

Main colours are deep green #1C4036, warm white #F7F5EF and white #FFFFFF. Exact proportions are defined by the source paths and generated signature geometry. Clear space is one quarter of the symbol width, proposed as the CIAOMIND usage rule.

The website header, footer and opening identity use the same component. Open Graph, structured organisation data, icon variants and exported communications use the corresponding generated files.

## Media formats

- Horizontal signature for website, documents and email.
- Centered signature for covers and formal compositions.
- Symbol for avatars and small icons.
- Web sharing image at 1200 × 630.
- Social portrait at 1080 × 1350 and vertical story at 1080 × 1920.
- Presentation and video end card at 1920 × 1080.
- General wide cover at 1920 × 640, to be adapted to a channel's current crop.
- Email signature HTML and A4 letterhead HTML/PDF.

The formats above are CIAOMIND production choices. Current platform-specific safe areas should be checked when applying them to an external account.

## Shared production source

The shape source is lib/brand-paths.ts. The builder scripts/build-brand-assets.py generates lib/brand-signature.json and public/brand assets. The descriptor uses outlined Arial geometry, with no font file included in the kit.

Run the builder from the repository root with the existing Python fontTools and Playwright dependencies and a local Arial installation. Rendering uses a separate headless browser session. The downloadable kit is public/brand/ciaomind-brand-kit.zip.

Website resources are available at /[lang]/brand/ in eight languages. The footer provides the entry.

## Application status

The website and reusable communication assets are covered by this release. External social account profile changes and updates to previously distributed documents are tracked separately by channel and document.


### Latest user correction — 2026-11-19
Opening only: align the descriptor below the full symbol + horizontal CIAOMIND group. Header/footer after entry: restore the compact CIAO-over-MIND lockup. This overrides the earlier all-surfaces horizontal website decision; exported horizontal communication assets remain available.
