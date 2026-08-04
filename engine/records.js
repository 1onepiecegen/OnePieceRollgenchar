/* V5 personal records: local-only, separate from deterministic character generation. */
(function (V4) {
  'use strict';
  const records = V4.engines.records = V4.engines.records || {};
  const KEY = 'op-v5-personal-records';
  const modeKey = mode => mode === 'brutal-grand-line' ? 'brutal-grand-line' : 'standard-adventure';
  const readAll = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) { return {}; } };
  const read = mode => { const all=readAll(); if (all.standardAdventure || all.brutalGrandLine) return all[modeKey(mode) === 'brutal-grand-line' ? 'brutalGrandLine' : 'standardAdventure'] || {}; return all; };
  const write = (mode, value) => { const all=readAll(); const key=modeKey(mode) === 'brutal-grand-line' ? 'brutalGrandLine' : 'standardAdventure'; localStorage.setItem(KEY, JSON.stringify({ ...(all.standardAdventure || all.brutalGrandLine ? all : {}), [key]:value })); };
  const summary = character => ({ id: character.id, name: character.name || 'Unnamed Voyager', seed: character.displaySeed, combat: character.combatRating || 0, threat: character.threat?.threat || 0, bounty: character.bounty?.displayedAmount || character.bounty?.amount || 0, rarity: character.rarity?.probability || 1, tier: character.tier?.name || 'Unknown', mode:modeKey(character.generationMode), at: new Date().toISOString() });
  const swordUser = character => (character.loadout?.family || character.weapon?.family) === 'blade' || /sword/i.test(character.style?.name || '');
  records.observe = function (character) {
    if (!character || character.generationMode === 'unrestricted-sandbox') return read();
    const mode=modeKey(character.generationMode), current = read(mode), subject = summary(character);
    const fields = [['highestCombat', 'combat', (a, b) => a > b], ['highestThreat', 'threat', (a, b) => a > b], ['highestBounty', 'bounty', (a, b) => a > b], ['rarestRoll', 'rarity', (a, b) => a < b]];
    for (const [key, field, wins] of fields) if (!current[key] || wins(subject[field], current[key][field])) current[key] = subject;
    if (character.fruit && (!current.strongestFruitUser || subject.combat > current.strongestFruitUser.combat)) current.strongestFruitUser = subject;
    if (swordUser(character) && (!current.strongestSwordUser || subject.combat > current.strongestSwordUser.combat)) current.strongestSwordUser = subject;
    if (!character.fruit && (!current.strongestFruitless || subject.combat > current.strongestFruitless.combat)) current.strongestFruitless = subject;
    if (character.mentor?.tier === 'self-taught' && (!current.strongestSelfTaught || subject.combat > current.strongestSelfTaught.combat)) current.strongestSelfTaught = subject;
    if (!character.weapon && (!current.bestWeaponless || subject.combat > current.bestWeaponless.combat)) current.bestWeaponless = subject;
    if ((character.tier?.min || 0) <= 15 && (!current.strongestRookie || subject.combat > current.strongestRookie.combat)) current.strongestRookie = subject;
    current.totalObserved = (current.totalObserved || 0) + 1; current.updatedAt = subject.at; write(mode,current); return current;
  };
  records.get = read;
  records.getAll = readAll;
  records.reset = () => { localStorage.removeItem(KEY); return {}; };
}(window.OnePieceRollV4));

