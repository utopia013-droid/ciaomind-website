# CIAOMIND website — end-to-end acceptance standard

Do not mark a task DONE on code commit alone.

## Scope matrix
Locales: zh, it, en, fr, de, es, pt, ja.
Routes for each locale: /, /about/, /services/, /news/, /news/milan-roundtable-2026/, /team/, /contact/, /privacy/, /terms/.
Minimum 8 × 9 = 72 localized URLs, plus root redirect, sitemap.xml, robots.txt, header and footer links.

## Required acceptance loop
1. Define scope and factual source of truth. No invented company locations, partnerships, customers, approvals, or revenue.
2. Trace every navigation link and reverse link (header, footer, news article→news, CTA→contact, privacy, terms, language switch preserving current route, home logo). Check links on desktop and mobile.
3. Check complete visible text in selected language: hero, cards, article body, dates, form labels, alerts, SEO title/description, structured data, hreflang and accessible labels. Flag untranslated text.
4. Run lint/typecheck/build; fix failures; confirm Vercel latest commit READY and production alias assigned.
5. Smoke-test all 72 URLs: HTTP status, no redirect loops, correct language, no missing resources. Test contact mailto composition, navigation and language persistence without sending real messages.
6. Check legal facts: registered office Como; Ferrara correspondence address not an established company branch. Do not publish a private residence or imply an official office without confirmation.
7. Recheck the public www.ciaomind.com URLs after deployment, not only preview. Log exact failures, fix and rerun until pass.
8. Report four separate states: source committed, build READY, public live verified, full content/function QA passed. Never conflate them.

## Known follow-ups
- Ensure all eight-language homepage and news cards use localized article headlines.
- Translate static English section labels on strategic pages and news date/gallery captions.
- Check Italian/Chinese legacy team, legal and contact sections for consistency with strategic pages.
- Review public disclosure and correct labeling of Ferrara address.
- Verify sitemap and metadata for all language variants.
- Confirm contact form is mailto-only and does not imply server-side delivery.

## Evidence
Record deployment ID, commit SHA, URL, timestamp, HTTP status and screenshot/observations for each route. If live access is unavailable, mark as UNVERIFIED rather than PASSED.
