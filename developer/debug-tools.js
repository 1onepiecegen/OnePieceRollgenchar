/* Seed lookup, roll history, and engine breakdown inspection. */
(function (V4) {
  'use strict';
  const debugTools = V4.developer.debugTools = V4.developer.debugTools || {};
  debugTools.runtimeAuthority = function () {
    const modularFacade = typeof V4.engines.generator?.generate === 'function';
    const inlineAdapter = typeof V4.legacy?.generateCharacter === 'function';
    return {
      generatorPath: modularFacade && inlineAdapter ? 'modular facade -> inline compatibility adapter' : modularFacade ? 'modular facade' : inlineAdapter ? 'inline compatibility adapter' : 'unavailable',
      modularFacade,
      inlineAdapter,
      standardUiGenerator: 'modular facade -> inline compatibility adapter',
      sandboxGenerator: 'modular facade -> inline compatibility adapter',
      manualSeedGenerator: 'modular facade -> inline compatibility adapter',
      distributionGenerator: 'modular facade -> inline compatibility adapter',
      battleCalculations: 'inline compatibility implementation',
      careerProgression: typeof V4.engines.career?.ensure === 'function' ? 'external V5.1 career state' : 'unavailable',
      combatantAdapter: typeof V4.engines.combatantAdapter?.normalize === 'function' ? 'external V5.1 adapter' : 'unavailable',
      persistentGenerationState: 'none (gameplay); saved-character IDs are non-gameplay metadata',
      duplicateFunctionNames: ['generateCharacter', 'calculateSynergy', 'calculateCombatRating', 'calculateThreatRating', 'calculateBounty'],
      inlineLegacyCallable: inlineAdapter,
      note: 'The external facade is the UI entry point. Inline compatibility functions remain callable until their fixed-seed parity migration is complete; standard generation no longer reads or writes persistent pity state.'
    };
  };

  debugTools.gameplaySnapshot = function (character) {
    const copy = JSON.parse(JSON.stringify(character));
    delete copy.id; delete copy.generatedAt; delete copy.name; delete copy.buildId; delete copy.sandbox;
    return JSON.stringify(copy);
  };
  debugTools.contaminationTest = function (seed) {
    if (typeof V4.engines.generator?.generate !== 'function') throw new Error('Generator facade is unavailable.');
    const chosenSeed = Number(seed ?? 1732050807) | 0;
    const snapshot = character => debugTools.gameplaySnapshot(character);
    const baseline = snapshot(V4.engines.generator.generate({}, chosenSeed));
    for (let index = 0; index < 100; index += 1) V4.engines.generator.generate({}, (chosenSeed + index + 1) | 0);
    const afterHistory = snapshot(V4.engines.generator.generate({}, chosenSeed));
    const results = [{ case: 'baseline vs 100 unrelated standard rolls', pass: baseline === afterHistory }];
    for (const pity of [[0, 0], [12, 22], [99, 99]]) {
      localStorage.setItem('op-mentor-pity', String(pity[0])); localStorage.setItem('op-weapon-pity', String(pity[1]));
      results.push({ case: `legacy localStorage values mentor=${pity[0]}, weapon=${pity[1]}`, pass: baseline === snapshot(V4.engines.generator.generate({}, chosenSeed)) });
    }
    const adapter = typeof V4.legacy?.generateCharacter === 'function' ? snapshot(V4.legacy.generateCharacter({}, chosenSeed)) : null;
    results.push({ case: 'modular facade vs inline adapter', pass: adapter !== null && baseline === adapter });
    return { seed: chosenSeed >>> 0, pass: results.every(result => result.pass), results, reloadEquivalent: 'The active generator contains no pity reads; a fresh page with any legacy pity keys yields the same snapshot.' };
  };
}(window.OnePieceRollV4));

