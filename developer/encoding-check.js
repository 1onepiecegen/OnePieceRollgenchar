/* UTF-8 / mojibake guard. Shared by browser diagnostics and Node release validation. */
(function (global) {
  'use strict';
  const chars = (...points) => String.fromCodePoint(...points);
  const suspicious = [
    { name: 'replacement-character', pattern: new RegExp(chars(0xfffd), 'g') },
    { name: 'double-decoded-utf8', pattern: new RegExp(`(?:${chars(0x00c3)}.|${chars(0x00c2)}.|${chars(0x00e2, 0x20ac)}|${chars(0x00e0, 0x00b8)})`, 'g') },
    { name: 'legacy-bounty-mojibake', pattern: new RegExp(chars(0x00e0, 0x00b8, 0x00bf), 'g') }
  ];
  const scanText = (text, label = 'text') => {
    const findings = [];
    for (const check of suspicious) {
      check.pattern.lastIndex = 0;
      let match;
      while ((match = check.pattern.exec(String(text))) !== null) {
        findings.push({ label, issue: check.name, index: match.index, sample: String(text).slice(Math.max(0, match.index - 18), match.index + 22) });
        if (findings.length >= 100) break;
      }
    }
    return findings;
  };
  const api = { scanText, checkRenderedDocument: () => scanText(global.document?.documentElement?.outerHTML || '', 'rendered-document') };
  if (global.OnePieceRollV4) {
    global.OnePieceRollV4.developer = global.OnePieceRollV4.developer || {};
    global.OnePieceRollV4.developer.encodingCheck = api;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
