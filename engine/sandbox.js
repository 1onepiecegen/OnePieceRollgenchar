/* DOM-free Sandbox invariants. UI code supplies the constructed character and request. */
(function (V4) {
  'use strict';
  const sandbox = V4.engines.sandbox = V4.engines.sandbox || {};
  sandbox.validateFinal = function (character, request, tiers) {
    const errors = [];
    const tierIndex = id => tiers.findIndex(tier => tier.id === id);
    const finalIndex = tierIndex(character.tier?.id);
    const minIndex = request.selected.minimumTierId ? tierIndex(request.selected.minimumTierId) : -1;
    const targetIndex = request.selected.targetTierId ? tierIndex(request.selected.targetTierId) : -1;
    if (minIndex >= 0 && finalIndex < minIndex) errors.push('Final tier is below the requested minimum.');
    if (targetIndex >= 0) { const target = tiers[targetIndex], upper = tiers[targetIndex + 1]?.min ?? Infinity; if (!target || character.combatRating < target.min || character.combatRating >= upper) errors.push('Final Combat Rating is outside the requested exact target tier.'); }
    const customCombat = Number(request.selected.customCombatRating);
    if (request.selected.customCombatRating !== undefined && request.selected.customCombatRating !== '' && (!Number.isFinite(customCombat) || customCombat < 1)) errors.push('Custom Combat Rating is invalid.');
    if (customCombat > 0 && (character.combatRating < customCombat || character.combatRating >= customCombat + 1)) errors.push('Final Combat Rating is outside the requested custom target band.');
    if (request.overrides.mentor?.locked === 'none' && character.mentor?.name !== 'Self-Taught') errors.push('No Mentor lock was not preserved.');
    if (request.overrides.fruit?.locked === null && character.fruit) errors.push('No Devil Fruit lock was not preserved.');
    if ((character.fruits?.length || (character.fruit ? 1 : 0)) > 1 && character.generationMode !== 'unrestricted-sandbox') errors.push('Only Unrestricted Sandbox may have more than one fruit.');
    return errors;
  };
}(window.OnePieceRollV4));

