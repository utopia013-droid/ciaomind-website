const assert = require('node:assert/strict');
const { test } = require('node:test');
const { createLocalizedSeo } = require('../lib/seo-urls.ts');
const locales = ['zh','it','en','fr','de','es','pt','ja'];
const paths = ['', 'about','services','team','contact','news','privacy','terms','vision','network','videos','brand','news/milan-roundtable-2026'];
test('104 unique canonical URLs and reciprocal hreflang sets', () => {
  const seo = createLocalizedSeo('https://www.ciaomind.com', locales);
  const seen = new Set();
  for (const path of paths) for (const lang of locales) {
    const a = seo.alternates(lang, path);
    const expected = `https://www.ciaomind.com/${lang}/${path ? path + '/' : ''}`;
    assert.equal(a.canonical, expected);
    assert.equal(a.languages[lang === 'zh' ? 'zh-CN' : lang], expected);
    assert.equal(a.languages['x-default'], seo.url('en',path));
    assert.equal(Object.keys(a.languages).length, 9);
    for (const l of locales) assert.equal(a.languages[l === 'zh' ? 'zh-CN' : l], seo.url(l,path));
    assert(!seen.has(expected)); seen.add(expected);
  }
  assert.equal(seen.size, 104);
  assert.equal(seo.url('it','/news/'),'https://www.ciaomind.com/it/news/');
});
