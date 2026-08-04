/* Present-ability combat engine. Potential is deliberately excluded. */
(function (V4) {
  'use strict';
  const combat = V4.engines.combat = V4.engines.combat || {};
  const clamp = function (value, min, max) { return Math.max(min, Math.min(max, value)); };

  combat.physicalFactor = function (c) {
    const geometricMean = Math.pow(Math.max(1, c.physical.strength) * Math.max(1, c.physical.speed) * Math.max(1, c.physical.durability) * Math.max(1, c.physical.stamina), 0.25);
    return 0.2 + (geometricMean / 100) * 1.3;
  };
  combat.weaponFactor = function (c, gradeScores) {
    if (!c.weapon) return 0.5 + (c.style.power / 100) * 0.5;
    const gradeScore = (gradeScores[c.weapon.grade] || 50) / 100;
    const handling = clamp(c.physical.strength * 0.35 / 100 + c.physical.speed * 0.25 / 100 + c.physical.stamina * 0.20 / 100 + c.willpower * 0.20 / 100, 0.20, 1);
    // A weapon path should reward several competencies without treating one
    // merely-average value as a compounding failure across the entire build.
    const effectiveness = gradeScore * 0.30 + c.weaponSkill * 0.30 + c.styleCompat * 0.25 + handling * 0.15;
    return 0.40 + effectiveness * 0.60;
  };
  combat.fruitFactor = function (c) {
    if (!c.fruit) return 0.75;
    let factor = (0.35 + (c.fruit.power / 100) * 0.65) * (0.3 + c.mastery * 0.7);
    if (c.hasAwakened) factor *= 1 + (c.fruit.awk / 100) * 0.5;
    return factor;
  };
  combat.hakiFactor = function (c) {
    let factor = (0.55 + c.haki.obs / 100 * 0.45) * (0.55 + c.haki.arm / 100 * 0.45);
    if (c.haki.hasCoc) factor *= 1.15;
    if (c.haki.hasAdvCoc) factor *= 1.10;
    if (c.haki.hasAdvObs) factor *= 1.06;
    if (c.haki.hasAdvArm) factor *= 1.06;
    if (c.haki.hasAdvObs && c.haki.hasAdvArm && c.haki.hasAdvCoc) factor *= 1.25;
    return factor;
  };
  combat.techniqueFactor = function (c) {
    return 0.75 + ((c.mental.battleIQ * 0.5 + c.mental.creativity * 0.3 + c.mental.knowledge * 0.2) / 100) * 0.45;
  };
  combat.progressionFactor = function (c) {
    const progression = c.combatProgression;
    if (!progression) return { total: 1, foundation: 1, discipline: 1, techniques: 1, advancedStates: 1 };
    const foundation = 0.94 + (progression.foundation?.mastery || 50) / 100 * 0.12;
    // Only the primary discipline contributes to the present combat rating.
    // Retained secondary disciplines support techniques, story, and future systems.
    const primaryDiscipline = progression.disciplines?.find(entry => entry.primary)
      || progression.disciplines?.find(entry => entry.id === progression.primaryDisciplineId)
      || progression.disciplines?.[0];
    const discipline = primaryDiscipline ? 0.98 + primaryDiscipline.mastery / 100 * 0.04 : 1;
    const techniques = 1 + Math.min(0.025, (progression.techniques?.length || 0) * 0.005);
    const advancedStates = (c.advancedStates || []).reduce((factor, state) => factor * (state.staticContribution?.combatMultiplier || 1), 1);
    return { total: foundation * discipline * techniques * advancedStates, foundation, discipline, techniques, advancedStates };
  };
  combat.calculate = function (c, gradeScores) {
    const physical = combat.physicalFactor(c);
    const weapon = combat.weaponFactor(c, gradeScores);
    const fruit = combat.fruitFactor(c);
    const haki = combat.hakiFactor(c);
    const technique = combat.techniqueFactor(c);
    const progression = combat.progressionFactor(c);
    const willpower = 0.9 + (c.willpower / 100) * 0.2;
    const baseRaw = physical * weapon * fruit * haki * technique * progression.total * willpower;
    const synergy = clamp(1 + c.synergyBonus / 100, 0.55, 2.0);
    const destiny = c.destiny && c.destiny.combatMult ? c.destiny.combatMult : 1;
    const traits = 1 + c.traits.reduce((sum, trait) => sum + trait.power, 0) / 400;
    const raw = baseRaw * synergy * destiny * traits;
    const maxRaw = 1.13;
    let rating = raw <= maxRaw ? Math.pow(Math.max(raw, 0) / maxRaw, 1.1) * 100 : 100 + (raw - maxRaw) * 29.4;
    // V5 deliberately has no displayed combat ceiling. The nonlinear normal
    // range keeps ordinary rolls readable; exceptional builds continue on a
    // linear tail rather than collapsing at a maximum score.
    rating = Math.max(1, rating);
    return { rating: rating, raw: raw, breakdown: { physical, weapon, fruit, haki, technique, progression: progression.total, progressionDetail: progression, willpower, baseRaw, synergy, destiny, traits, raw, maxRaw, rating } };
  };
}(window.OnePieceRollV4));

