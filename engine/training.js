/* Generic rare-discipline training outcomes. */
(function (V4) {
  'use strict';
  const training = V4.engines.training = V4.engines.training || {};
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  training.styleAccess = function (c, style) {
    if (style.baseRollable === false) return { allowed: false, route: 'advanced-only' };
    if (style.name === 'Electro') return { allowed: c.race.name === 'Mink', route: c.race.name === 'Mink' ? 'mink' : 'invalid' };
    if (style.name === 'Fishman Karate') return { allowed: c.race.name === 'Fishman' || c.mentor.name === 'Jinbe', route: c.race.name === 'Fishman' ? 'fishman' : c.mentor.name === 'Jinbe' ? 'mentor' : 'invalid' };
    if (style.name === 'Cyborg Tech') return { allowed: c.race.name === 'Cyborg' || c.mentor.spec.includes('science'), route: c.race.name === 'Cyborg' ? 'cyborg' : c.mentor.spec.includes('science') ? 'science-mentor' : 'invalid' };
    return { allowed: true, route: 'open' };
  };
  training.threeSwordAttempt = function (rng, c) {
    const technique = V4.engines.loadout.techniqueAttributes(c);
    const zoroStudent = c.mentor.name === 'Roronoa Zoro';
    // Santoryu is evaluated after training: Zoro can develop coordination far
    // beyond the student's initial score, while jaw conditioning remains harsh.
    const measures = {
      strength: c.physical.strength,
      stamina: c.physical.stamina,
      willpower: c.willpower,
      battleIQ: c.mental.battleIQ,
      coordination: clamp(technique.coordination + (zoroStudent ? 12 : 0) + (zoroStudent && c.willpower >= 80 ? 3 : 0), 0, 100),
      jawStrength: clamp(technique.jawStrength + (zoroStudent ? 6 : 0), 0, 100)
    };
    const thresholds = { strength: 70, stamina: 65, willpower: 70, battleIQ: 55, coordination: 70, jawStrength: 78 };
    const checks = Object.fromEntries(Object.entries(thresholds).map(([key, threshold]) => [key, measures[key] >= threshold]));
    const passed = Object.values(checks).filter(Boolean).length;
    const failed = Object.entries(checks).filter(([, passedCheck]) => !passedCheck).map(([key]) => key);
    const largestShortfall = Math.max(0, ...failed.map(key => thresholds[key] - measures[key]));
    const independentCandidate = !zoroStudent && passed === 6 && c.willpower >= 88 && c.physical.potential >= 80 && (c.mentor.spec.includes('sword') || c.mentor.tier === 'self-taught');
    const eligible = zoroStudent || independentCandidate;
    const exceptionalCandidate = zoroStudent && passed === 5 && largestShortfall <= 20 && (c.luck >= 70 || c.physical.potential >= 78 || c.willpower >= 80 || c.traits?.some(trait => ['Iron Will', 'Monster Constitution'].includes(trait.name)));
    const chance = zoroStudent && passed === 6 ? 0.64 : exceptionalCandidate ? 0.14 : independentCandidate ? 0.07 : 0;
    const roll = rng.next();
    const mastered = zoroStudent && passed === 6 && roll < 0.24;
    const novice = !mastered && ((zoroStudent && passed === 6 && roll < chance) || (exceptionalCandidate && roll < chance) || (independentCandidate && roll < chance));
    const partial = zoroStudent && !mastered && !novice && passed >= 4;
    const route = zoroStudent ? 'zoro-mentored' : independentCandidate ? 'independent-sword-discipline' : null;
    const independentGates = { fullRequirements: !zoroStudent && passed === 6, willpower: c.willpower >= 88, potential: c.physical.potential >= 80, swordDiscipline: c.mentor.spec.includes('sword') || c.mentor.tier === 'self-taught', eligible: independentCandidate };
    return { id: 'three-sword-training', mentorId: zoroStudent ? 'roronoa-zoro' : null, route, attempted: eligible, outcome: mastered ? 'three-sword-mastered' : novice ? 'three-sword-novice' : partial ? 'two-sword-foundation' : eligible ? 'failed' : 'not-attempted', unlockedStyleId: (mastered || novice) ? 'three-sword-style' : partial ? 'two-sword-style' : null, masteryFloor: mastered ? 65 : novice ? 35 : null, masteryCeiling: mastered ? 90 : novice ? 55 : null, styleEfficiency: mastered ? 1 : novice ? (independentCandidate ? 0.70 : 0.78) : 1, staminaMultiplier: mastered ? 1 : novice ? (independentCandidate ? 1.35 : 1.25) : 1, advancedStateEligible: mastered, requirementsPassed: passed, requirementsTotal: 6, successChance: chance, roll: roll, requirements: checks, measures, thresholds, largestShortfall, exceptionalCandidate, independentCandidate, independentGates, explanation: mastered ? "Survived Zoro's brutal training and mastered the three-katana discipline." : novice && independentCandidate ? "Developed a dangerous, self-taught Three Sword form through exceptional will, but cannot sustain it efficiently." : novice ? "Survived the initial Three Sword training, but can only sustain an inefficient novice form." : partial ? "Could not safely complete the mouth-held blade training, but retained a dual-wielding foundation." : eligible ? "Attempted Three Sword Style but failed to stabilize the demanding three-blade discipline." : null };
  };
  training.rollBaseStyle = function (rng, c, options) {
    const styles = V4.database.catalog.styles || [];
    const byId = id => styles.find(style => style.id === id);
    if (options?.locked) { const locked = styles.find(style => style.id === options.locked || style.name === options.locked); if (locked && !locked.advancedState) return { style: locked, trainingResults: [] }; }
    const result = training.threeSwordAttempt(rng, c);
    if (result.unlockedStyleId) return { style: byId(result.unlockedStyleId), trainingResults: [result], santoryuAudit: result };
    const pool = styles.filter(style => !style.advancedState && style.id !== 'three-sword-style' && training.styleAccess(c, style).allowed);
    const preferred = pool.filter(style => c.mentor.spec.includes(style.type));
    return { style: rng.pick(preferred.length && rng.chance(0.65) ? preferred : pool), trainingResults: result.attempted ? [result] : [], santoryuAudit: result };
  };
}(window.OnePieceRollV4));

