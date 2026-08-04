/* V4.5.3 Sandbox integrity tests. Construction is injected so this module stays DOM-free. */
(function (V4) {
  'use strict';
  const validation = V4.developer.sandboxValidation = V4.developer.sandboxValidation || {};
  validation.checkCrewFruitContinuity = function (characters, mode) {
    if (mode !== 'unique') return [];
    const ids = new Set(), errors = [];
    for (const character of characters) if (character.fruit?.id) { if (ids.has(character.fruit.id)) errors.push(`Duplicate Saved Crew fruit: ${character.fruit.name}`); ids.add(character.fruit.id); }
    return errors;
  };
  validation.runTierTargets = function ({ tiers, buildsPerTier, construct }) {
    const results = [], total = Math.max(1, buildsPerTier || Math.ceil(10000 / tiers.length));
    for (const tier of tiers) {
      let passed = 0, failed = 0, samples = [];
      for (let index = 0; index < total; index += 1) {
        try {
          const character = construct(tier, (700000000 + tier.min * 100000 + index) | 0);
          const upper = tiers[tiers.indexOf(tier) + 1]?.min ?? Infinity;
          if (character.combatRating < tier.min || character.combatRating >= upper) throw new Error('outside target band');
          passed++;
        } catch (error) { failed++; if (samples.length < 5) samples.push({ seed:(700000000 + tier.min * 100000 + index) | 0, error:error.message }); }
      }
      results.push({ tier: tier.name, passed, failed, samples });
    }
    return { total: results.reduce((sum, result) => sum + result.passed + result.failed, 0), passed: results.every(result => result.failed === 0), results };
  };
}(window.OnePieceRollV4));

