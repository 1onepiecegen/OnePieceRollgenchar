/* V5.2 fruit, preset, and experimental battle acceptance checks. */
(function (V4) {
  'use strict';
  const validation = V4.developer.v52Validation = V4.developer.v52Validation || {};
  validation.run = function ({ generate, derive } = {}) {
    const errors = [];
    const fruits = V4.database.fruits || [];
    const profiles = V4.database.combatProfiles || [];
    const elements = new Set((V4.database.elements || []).map(entry => entry.id));
    const expansion = V4.database.fruitExpansion || {};
    if ((expansion.added || 0) < 100) errors.push(`Fruit expansion added only ${expansion.added || 0} entries.`);
    if ((V4.database.fruitBatchV53?.added || 0) < 20) errors.push('V5.3 fruit batch did not load completely.');
    for (const fruit of fruits) {
      for (const element of fruit.elementTags || []) if (!elements.has(element)) errors.push(`Unknown fruit affinity ${fruit.id}:${element}`);
      if (fruit.rarityTier === 'anomaly' && fruit.rollWeight > .01) errors.push(`Anomaly fruit is too common: ${fruit.id}`);
    }
    const goose = fruits.find(entry => entry.id === 'tori-tori-no-mi-model-lunar-abyssal-goose-goddess');
    if (!goose || goose.source !== 'fan' || goose.rollWeight > .001) errors.push('Goose fruit rarity/source contract failed.');
    const blackbeard = profiles.find(entry => entry.characterId === 'marshall-d-teach');
    if (!blackbeard || blackbeard.fruitId !== 'yami-yami-no-mi' || !blackbeard.secondaryFruitIds?.includes('gura-gura-no-mi')) errors.push('Blackbeard dual-fruit profile failed.');
    const magmaFire = V4.database.elementChart.multiplier('magma', 'fire');
    const firePhysical = V4.database.elementChart.multiplier('fire', 'physical');
    if (magmaFire <= 1 || firePhysical !== 1) errors.push('Magma/flame specificity failed.');
    let adapterErrors = 0, battleErrors = 0, presetErrors = 0;
    const adapted = [];
    for (const profile of profiles) {
      try { adapted.push(V4.engines.combatantAdapter.fromProfile(profile)); } catch (error) { adapterErrors++; errors.push(error.message); }
    }
    for (let index = 0; index + 1 < adapted.length; index += 2) {
      try {
        const first = V4.engines.battle.simulate(adapted[index], adapted[index + 1]);
        const second = V4.engines.battle.simulate(adapted[index], adapted[index + 1]);
        if (JSON.stringify(first.log) !== JSON.stringify(second.log)) battleErrors++;
      } catch (error) { battleErrors++; errors.push(error.message); }
    }
    if (adapted.length >= 2) {
      try {
        const session = V4.engines.battle.createSession(adapted[0], adapted[1], { playerIndex: 0 });
        while (!session.done) V4.engines.battle.step(session, 'style');
        if (!session.done || session.summary.turns < 1 || session.summary.turns > 30) battleErrors++;
      } catch (error) { battleErrors++; errors.push(error.message); }
    }
    if (typeof generate === 'function') for (const preset of V4.database.sandboxPresets || []) {
      try {
        const profile = profiles.find(entry => entry.id === preset.combatProfileId);
        const built = V4.engines.presetBuilder.apply(generate((730000000 + presetErrors) | 0), profile);
        if (typeof derive === 'function') derive(built);
        if (built.presetOf?.combatProfileId !== profile.id || built.id === profile.characterId) presetErrors++;
      } catch (error) { presetErrors++; errors.push(error.message); }
    }
    return {
      pass: !errors.length && !adapterErrors && !battleErrors && !presetErrors,
      errors, adapterErrors, battleErrors, presetErrors,
      counts: { fruits: fruits.length, expansion: expansion.added || 0, canonAdded: expansion.canon || 0, fanAdded: expansion.fan || 0, v53Batch: V4.database.fruitBatchV53?.added || 0, profiles: profiles.length, presets: (V4.database.sandboxPresets || []).length, elements: elements.size }
    };
  };
}(window.OnePieceRollV4));

