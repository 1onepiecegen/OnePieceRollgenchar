/* Dataset checks: duplicate IDs, missing references, source labels, and loadouts. */
(function (V4) {
  'use strict';
  const validator = V4.developer.canonValidation = V4.developer.canonValidation || {};
  validator.catalog = function () { return V4.database.catalog.validateAll(); };
  validator.career = function (character, before) {
    const errors = [], career = character.careerProgression;
    if (!career) return ['Missing career progression.'];
    if (before && (character.seed !== before.seed || character.race?.id !== before.race?.id || character.fruit?.id !== before.fruit?.id)) errors.push('Career action changed immutable identity or fruit without acquisition.');
    if (new Set(career.combatProgression.techniqueIds || []).size !== (career.combatProgression.techniqueIds || []).length) errors.push('Duplicate technique IDs in career progression.');
    if (career.fruitProgression?.fruitId && character.fruit?.id !== career.fruitProgression.fruitId) errors.push('Fruit progression does not match character fruit.');
    return errors;
  };
  validator.adapter = function () { const errors=[]; for (const profile of V4.database.combatProfiles || []) try { const normalized=V4.engines.combatantAdapter.fromProfile(profile), reference=(V4.database.characters||[]).find(character=>character.id===profile.characterId), expected=profile.weaponIds?.length?profile.weaponIds:(reference?.weaponIds||[]); if (!normalized.physical || !normalized.haki || !normalized.style) errors.push(`Adapter incomplete: ${profile.id}`); if ((normalized.loadout?.weapons||[]).length !== expected.length) errors.push(`Adapter lost a weapon reference: ${profile.id}`); if((profile.secondaryFruitIds||[]).length!==(normalized.secondaryFruits||[]).length) errors.push(`Adapter lost a secondary fruit: ${profile.id}`); } catch (error) { errors.push(error.message); } return errors; };
  validator.canonOnly = function () { const errors=[]; for (const name of ['fruits','combatProfiles','techniques','organizations','relationships','locations']) for (const entry of V4.database.catalog.bySource(name,'canon')) if (entry.source !== 'canon') errors.push(`Canon-only source leak: ${name}:${entry.id}`); return errors; };
  validator.progression = function (character) {
    return V4.engines.progression?.validateProgression
      ? V4.engines.progression.validateProgression(character)
      : ['Progression engine is unavailable.'];
  };
  validator.loadout = function (character) {
    const req = V4.engines.loadout.requirementsFor(character.style);
    const weapons = character.loadout?.weapons || [];
    const errors = [];
    // Layered progression validates named disciplines against their parent and
    // recorded route. The old flat-style gate is only meaningful for old saves.
    const styleAccess = character.combatProgression ? null : V4.engines.training?.styleAccess?.(character, character.style);
    if (styleAccess && !styleAccess.allowed) errors.push(`${character.style.name} lacks a valid access route.`);
    if (req && weapons.length < req.minimum) errors.push(`${character.style.name} has an incomplete loadout.`);
    if (req?.family && weapons.some(weapon => weapon.family !== req.family)) errors.push(`${character.style.name} has an incompatible weapon family.`);
    if (req?.subtype && weapons.some(weapon => weapon.subtype !== req.subtype)) errors.push(`${character.style.name} has an incompatible weapon subtype.`);
    if (new Set(weapons.filter(weapon => weapon.unique).map(weapon => weapon.id)).size !== weapons.filter(weapon => weapon.unique).length) errors.push('Loadout duplicates a unique weapon.');
    const threeSwordTraining = character.trainingResults?.find(result => result.id === 'three-sword-training');
    if (character.style?.id === 'three-sword-style' && !['three-sword-novice', 'three-sword-mastered'].includes(threeSwordTraining?.outcome)) errors.push('Three Sword Style is missing its Zoro training outcome.');
    if (character.style?.id === 'three-sword-style' && weapons.length !== 3) errors.push('Three Sword Style must carry exactly three blades.');
    for (const state of character.advancedStates || []) {
      if (state.id !== 'asura-nine-sword') continue;
      if (character.style?.id !== 'three-sword-style' || threeSwordTraining?.outcome !== 'three-sword-mastered') errors.push('Asura requires a mastered Three Sword Style foundation.');
      if (character.willpower < 88 || character.haki?.arm < 72 || character.mental?.battleIQ < 65) errors.push('Asura bypassed a required mastery threshold.');
    }
    if (character.hasAwakened && character.awakening && !character.awakening.eligible && !character.awakening.forced) errors.push('Awakening bypassed its eligibility gate.');
    return [...errors, ...validator.progression(character)];
  };
}(window.OnePieceRollV4));

