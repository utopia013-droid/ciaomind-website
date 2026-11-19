const { test } = require('node:test');
const assert = require('node:assert/strict');
const { moneyMinor, sourceUrl, candidateScore, canEdit, canApprove, stageAllowed } = require('../lib/business-os.ts');

test('money uses exact cents and rejects signs, exponent, separators and hidden precision', () => {
  assert.equal(moneyMinor('125.50'), 12550);
  assert.equal(moneyMinor('0.01'), 1);
  assert.equal(moneyMinor('9999999999.99'), 999999999999);
  for (const value of ['-1', '+1', '1e3', '1,00', '1.001', 'NaN', '01.00', '', ' 1', '10000000000']) assert.throws(() => moneyMinor(value));
});
test('viewer and missing membership cannot write; contributors cannot approve', () => {
  for (const role of [undefined, 'viewer', 'admin', '']) { assert.equal(canEdit(role), false); assert.equal(canApprove(role), false); }
  assert.equal(canEdit('contributor'), true);
  assert.equal(canApprove('contributor'), false);
  assert.equal(canApprove('manager'), true);
});
test('stages cannot skip and require approved rights, compliance and evidence', () => {
  assert.equal(stageAllowed('prospect', 'contract', []), false);
  assert.equal(stageAllowed('prospect', 'discovery', []), true);
  assert.equal(stageAllowed('discovery', 'quote', [{ kind: 'rights', status: 'approved', amount_minor: 0 }, { kind: 'compliance', status: 'submitted', amount_minor: 0 }]), false);
  assert.equal(stageAllowed('discovery', 'quote', [{ kind: 'rights', status: 'approved', amount_minor: 0 }, { kind: 'compliance', status: 'approved', amount_minor: 0 }]), true);
  assert.equal(stageAllowed('contract', 'delivery', [{ kind: 'contract', status: 'submitted', amount_minor: 100 }]), false);
});
test('collection requires positive approved contract and enough approved receipts', () => {
  const contract = { kind: 'contract', status: 'approved', amount_minor: 10000 };
  assert.equal(stageAllowed('acceptance', 'collected', []), false);
  assert.equal(stageAllowed('acceptance', 'collected', [contract, { kind: 'receipt', status: 'submitted', amount_minor: 10000 }]), false);
  assert.equal(stageAllowed('acceptance', 'collected', [contract, { kind: 'receipt', status: 'approved', amount_minor: 9999 }]), false);
  assert.equal(stageAllowed('acceptance', 'collected', [contract, { kind: 'receipt', status: 'approved', amount_minor: 6000 }, { kind: 'receipt', status: 'approved', amount_minor: 4000 }]), true);
});
test('candidate score is explicit rule arithmetic and sources require HTTPS without credentials', () => {
  assert.equal(candidateScore({ sector: true, region: false, capability: true, officialSource: false }), 60);
  assert.equal(candidateScore({ sector: true, region: true, capability: true, officialSource: true }), 100);
  assert.equal(sourceUrl('https://example.org/source'), 'https://example.org/source');
  for (const url of ['javascript:alert(1)', 'http://example.org', 'https://user:password@example.org']) assert.throws(() => sourceUrl(url));
});
