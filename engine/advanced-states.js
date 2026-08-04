/* Temporary high-cost manifestations; not ordinary base styles. */
(function (V4) {
  'use strict';
  const states = V4.engines.advancedStates = V4.engines.advancedStates || {};
  states.evaluate = function (rng, c) {
    const mastered = c.trainingResults?.some(result => result.outcome === 'three-sword-mastered');
    if (c.style?.id !== 'three-sword-style' || !mastered || c.willpower < 88 || c.haki.arm < 72 || c.mental.battleIQ < 65) return [];
    const preferredTraits = ['Iron Will', 'Battle Genius', 'Monster Constitution'];
    const traitBonus = c.traits.filter(trait => preferredTraits.includes(trait.name)).length * 0.15;
    const mentorBonus = c.mentor.name === 'Roronoa Zoro' ? 1.75 : 0.12;
    const chance = 0.012 * Math.pow(Math.min(c.willpower / 88, 1) * Math.min(c.haki.arm / 72, 1) * Math.min(c.mental.battleIQ / 65, 1) * mentorBonus * (1 + traitBonus), 4);
    const roll = rng.next();
    if (roll >= chance) return [];
    return [{ id: 'asura-nine-sword', name: 'Nine Sword Style: Asura', category: 'style-manifestation', source: 'canon', baseStyleId: 'three-sword-style', unlocked: true, mastery: Math.max(1, Math.min(100, Math.round(c.willpower * .35 + c.haki.arm * .25 + c.mental.battleIQ * .40))), unlock: { chance, roll, requirementsPassed: 6, requirementsTotal: 6 }, staticContribution: { combatMultiplier: 1.04 }, battleActivation: { burstMultiplier: 1.20, staminaCost: 34, hakiCost: 22, durationTurns: 2 }, limitations: ['Cannot be maintained for long', 'Consumes immense stamina', 'Requires extreme concentration'] }];
  };
}(window.OnePieceRollV4));

