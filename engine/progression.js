/* V4.3 layered combat progression: foundation -> discipline -> techniques -> advanced states. */
(function (V4) {
  'use strict';
  const progression = V4.engines.progression = V4.engines.progression || {};
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const styles = () => V4.database.catalog?.styles || V4.database.styles || [];
  const byId = id => styles().find(entry => entry.id === id) || null;
  const average = values => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);

  progression.hasFoundation = (c, id) => c.combatProgression?.foundation?.id === id;
  progression.hasDiscipline = (c, id) => (c.combatProgression?.disciplines || []).some(entry => entry.id === id && entry.unlocked);
  progression.hasTechnique = (c, id) => (c.combatProgression?.techniques || []).some(entry => entry.id === id && entry.unlocked);
  progression.hasAdvancedState = (c, id) => (c.combatProgression?.advancedStates || []).some(entry => entry.id === id && entry.unlocked);

  progression.evaluateFoundationCandidates = c => styles().filter(style => style.progressionType === 'foundation' && style.baseRollable !== false);
  progression.selectFoundation = function (rng, c, options) {
    let pool = progression.evaluateFoundationCandidates(c);
    if (options?.sourcePool) pool = pool.filter(style => style.source === options.sourcePool);
    if (options?.allowedFoundationIds?.length) pool = pool.filter(style => options.allowedFoundationIds.includes(style.id));
    if (options?.locked) {
      const locked = byId(options.locked) || pool.find(style => style.name === options.locked);
      if (locked?.progressionType === 'foundation') return { foundation: locked, accessRoute: 'locked' };
    }
    if (!pool.length) throw new Error('Sandbox foundation/source filter has no valid options.');
    const preferred = pool.filter(style =>
      (style.type === 'sword' && c.mentor.spec.includes('sword')) ||
      (style.type === 'shoot' && c.mentor.spec.includes('shoot')) ||
      (style.type === 'martial' && c.mentor.spec.includes('martial')) ||
      (style.id === 'heavy-weapon-fighting' && c.mentor.spec.includes('brawl')) ||
      (style.id === 'combat-technology' && c.mentor.spec.includes('science')) ||
      (style.id === 'sky-combat' && ['Skypiean', 'Sky Islander', 'Birkan'].includes(c.race.name))
    );
    const foundation = rng.pick(preferred.length && rng.chance(0.65) ? preferred : pool);
    const accessRoute = preferred.includes(foundation) ? 'mentor-or-background' : 'natural-foundation';
    return { foundation, accessRoute };
  };
  progression.foundationMastery = c => Math.round(clamp(
    average([c.physical.strength, c.physical.speed, c.physical.stamina, c.mental.battleIQ, c.willpower]) +
    (c.mentor.tier === 'legendary' ? 8 : c.mentor.tier === 'elite' ? 4 : 0), 20, 95
  ));
  progression.weaponMastery = c => !c.weapon ? 0 : Math.round(clamp(
    c.weaponSkill * 100 * 0.65 + average([c.physical.strength, c.physical.speed, c.mental.battleIQ, c.willpower]) * 0.35, 1, 100
  ));
  progression.bodyControl = c => Math.round(clamp(average([c.physical.speed, c.physical.stamina, c.mental.battleIQ, c.willpower]), 1, 100));

  function requirementsFor(c, style, weaponMastery, disciplineMastery) {
    const req = style.accessRequirements || {};
    const checks = {};
    const addCheck = (id, threshold, actual) => {
      if (threshold === undefined || threshold === null) return;
      checks[id] = { passed: actual >= threshold, actual, threshold };
    };
    addCheck('battleIQ', req.minimumBattleIQ, c.mental.battleIQ);
    addCheck('speed', req.minimumSpeed, c.physical.speed);
    addCheck('strength', req.minimumStrength, c.physical.strength);
    addCheck('stamina', req.minimumStamina, c.physical.stamina);
    addCheck('willpower', req.minimumWillpower, c.willpower);
    addCheck('weaponMastery', req.minimumWeaponMastery, weaponMastery);
    addCheck('disciplineMastery', req.minimumDisciplineMastery, disciplineMastery);
    addCheck('bodyControl', req.minimumBodyControl, progression.bodyControl(c));
    addCheck('armament', req.minimumArmament, c.haki.arm);
    const mentorRoute = !req.allowedMentorTags?.length || req.allowedMentorTags.some(tag => c.mentor.spec.includes(tag));
    const namedMentorRoute = !req.allowMentorNames?.length || req.allowMentorNames.includes(c.mentor.name);
    const raceRoute = !req.allowedRaces?.length || req.allowedRaces.includes(c.race.name);
    const equipmentRoute = !style.weaponRequirements?.family || c.weapon?.family === style.weaponRequirements.family;
    const activeChecks = Object.values(checks);
    return { checks, mentorRoute, namedMentorRoute, raceRoute, equipmentRoute, passed: activeChecks.filter(check => check.passed).length, total: activeChecks.length };
  }
  progression.evaluateDisciplineUnlocks = function (rng, c, options = {}) {
    const foundation = c.combatProgression.foundation;
    const weaponMastery = progression.weaponMastery(c);
    const results = [];
    let unlocked = [];
    let candidates = styles().filter(style => style.progressionType === 'discipline' && style.parentIds.includes(foundation.id));
    const disciplineSourcePool = options.disciplineSourcePool || options.sourcePool;
    if (disciplineSourcePool) candidates = candidates.filter(style => style.source === disciplineSourcePool);
    if (options.allowedDisciplineIds?.length) candidates = candidates.filter(style => options.allowedDisciplineIds.includes(style.id));
    if (options.lockedDiscipline) {
      const style = candidates.find(candidate => candidate.id === options.lockedDiscipline || candidate.name === options.lockedDiscipline);
      if (!style) throw new Error('Sandbox discipline is not available from the selected foundation/source filter.');
      const trainingResult = style.id === 'three-sword-style'
        ? { id: 'three-sword-training', attempted: true, unlocked: true, forced: true, route: 'sandbox-forced', outcome: 'three-sword-novice', unlockedStyleId: style.id, masteryFloor: 35, styleEfficiency: 0.78, requirementsPassed: 0, requirementsTotal: 6, explanation: 'Sandbox override selected Three Sword Style.' }
        : { id: `${style.id}-training`, attempted: true, unlocked: true, forced: true, accessRoute: 'sandbox-forced', outcome: 'discipline-unlocked', unlockedStyleId: style.id, requirementsPassed: 0, requirementsTotal: 0, explanation: `Sandbox override selected ${style.name}.` };
      return { results: [trainingResult], primary: { style, mastery: Math.round(clamp(progression.foundationMastery(c) * 0.72, 20, 92)), accessRoute: 'sandbox-forced', trainingResult }, unlocked: [{ style, mastery: Math.round(clamp(progression.foundationMastery(c) * 0.72, 20, 92)), accessRoute: 'sandbox-forced', trainingResult }] };
    }
    for (const style of candidates) {
      if (style.id === 'three-sword-style') {
        const result = V4.engines.training.threeSwordAttempt(rng, c);
        results.push(result);
        if (result.unlockedStyleId) {
          const unlockedStyle = byId(result.unlockedStyleId);
          if (unlockedStyle) unlocked.push({ style: unlockedStyle, mastery: Math.round(clamp(result.masteryFloor || 35, 1, 100)), accessRoute: result.route, trainingResult: result });
        }
        continue;
      }
      const audit = requirementsFor(c, style, weaponMastery, 0);
      const independent = !audit.mentorRoute && !audit.raceRoute && !!style.accessRequirements?.rareIndependentChance && audit.passed >= audit.total - 1;
      const eligible = audit.equipmentRoute && audit.raceRoute && audit.namedMentorRoute && (audit.mentorRoute || independent);
      const requirementRatio = audit.total ? audit.passed / audit.total : 1;
      const chance = eligible ? clamp(0.07 + requirementRatio * 0.16 + (audit.mentorRoute ? 0.16 : 0) + (independent ? style.accessRequirements.rareIndependentChance : 0), 0, 0.42) : 0;
      const roll = rng.next();
      const success = eligible && roll < chance;
      const accessRoute = style.id === 'fishman-karate' ? 'fishman'
        : style.id === 'electro' ? 'mink'
        : style.id === 'cyborg-tech' ? 'cyborg'
        : style.id === 'dial-combat' ? 'cultural'
        : (style.tags || []).includes('government') && (c.mentor.spec.includes('government') || c.mentor.spec.includes('assassin')) ? 'government-trained'
        : c.mentor.spec.includes('science') ? 'technological'
        : audit.mentorRoute ? 'mentor-trained'
        : independent ? 'independent' : 'requirements-not-met';
      const result = { id: style.id + '-training', attempted: eligible, unlocked: success, parentId: foundation.id, outcome: success ? 'discipline-unlocked' : eligible ? 'foundation-retained' : 'not-attempted', chance, roll, requirementsPassed: audit.passed, requirementsTotal: audit.total, checks: audit.checks, accessRoute, explanation: success ? `Unlocked ${style.name} through ${accessRoute}.` : eligible ? `Attempted ${style.name} but retained the broader ${foundation.name} foundation.` : null };
      results.push(result);
      if (success) unlocked.push({ style, mastery: Math.round(clamp(progression.foundationMastery(c) * 0.72 + requirementRatio * 18, 20, 92)), accessRoute, trainingResult: result });
    }
    // A Zoro partial-training result can grant Two Sword Style in the same pass
    // that the normal Two Sword discipline route succeeds. Keep both attempts in
    // the audit, but retain one canonical discipline record for the character.
    unlocked = [...unlocked].sort((a, b) => b.style.power - a.style.power || b.mastery - a.mastery);
    const seenDisciplineIds = new Set();
    unlocked = unlocked.filter(entry => {
      if (seenDisciplineIds.has(entry.style.id)) return false;
      seenDisciplineIds.add(entry.style.id);
      return true;
    });
    const primary = unlocked[0] || null;
    return { results, primary, unlocked };
  };
  progression.evaluateTechniqueUnlocks = function (rng, c) {
    const techniques = [];
    for (const discipline of c.combatProgression.disciplines || []) {
      const candidates = styles().filter(style => style.progressionType === 'technique' && style.parentIds.includes(discipline.id));
      for (const style of candidates) {
        const audit = requirementsFor(c, style, c.combatProgression.weaponMastery, discipline.mastery);
        const eligible = audit.equipmentRoute && audit.raceRoute && audit.namedMentorRoute && audit.passed === audit.total;
        const chance = eligible ? clamp(0.10 + discipline.mastery / 100 * 0.24, 0, 0.36) : 0;
        const roll = rng.next();
        const unlocked = eligible && roll < chance;
        if (unlocked) techniques.push({ id: style.id, mastery: Math.round(clamp(discipline.mastery * 0.68 + c.willpower * 0.18, 1, 95)), parentDisciplineId: discipline.id, unlocked: true, accessRoute: discipline.accessRoute, unlock: { attempted: true, chance, roll, requirementsPassed: audit.passed, requirementsTotal: audit.total, outcome: 'technique-unlocked' } });
      }
    }
    return techniques;
  };
  progression.evaluateAdvancedStates = function (rng, c) {
    const states = V4.engines.advancedStates.evaluate(rng, c);
    return states;
  };
  progression.create = function (rng, c, options) {
    const selected = progression.selectFoundation(rng, c, options);
    const mastery = progression.foundationMastery(c);
    return { foundation: { id: selected.foundation.id, mastery, accessRoute: selected.accessRoute, unlocked: true }, disciplines: [], techniques: [], advancedStates: [], trainingResults: [], weaponMastery: 0, primaryDisciplineId: null, migratedFromFlatStyle: false, _foundationStyle: selected.foundation };
  };
  progression.finalizeDisciplines = function (rng, c, options = {}) {
    const result = progression.evaluateDisciplineUnlocks(rng, c, options);
    c.combatProgression.trainingResults.push(...result.results);
    c.trainingResults = c.combatProgression.trainingResults;
    const santoryu = result.results.find(entry => entry.id === 'three-sword-training');
    c.santoryuAudit = santoryu || null;
    if (result.primary) {
      c.combatProgression.disciplines = result.unlocked.map((entry, index) => ({ id: entry.style.id, mastery: entry.mastery, accessRoute: entry.accessRoute, unlocked: true, primary: index === 0 }));
      c.combatProgression.primaryDisciplineId = result.primary.style.id;
      return result.primary.style;
    }
    return c.combatProgression._foundationStyle;
  };
  progression.finalizeMastery = function (rng, c) {
    c.combatProgression.weaponMastery = progression.weaponMastery(c);
    c.combatProgression.techniques = progression.evaluateTechniqueUnlocks(rng, c);
    c.advancedStates = progression.evaluateAdvancedStates(rng, c);
    c.combatProgression.advancedStates = c.advancedStates.map(state => ({ id: state.id, mastery: state.mastery, accessRoute: 'advanced-manifestation', unlocked: true }));
    delete c.combatProgression._foundationStyle;
  };
  progression.validateProgression = function (c) {
    const errors = [], p = c.combatProgression;
    if (!p?.foundation?.id || byId(p.foundation.id)?.progressionType !== 'foundation') errors.push('Missing valid combat foundation.');
    for (const discipline of p?.disciplines || []) { const entry = byId(discipline.id); if (!entry || entry.progressionType !== 'discipline' || !entry.parentIds.includes(p.foundation.id)) errors.push(`Discipline ${discipline.id} lacks a valid foundation.`); }
    for (const technique of p?.techniques || []) if (!p.disciplines.some(discipline => discipline.id === technique.parentDisciplineId)) errors.push(`Technique ${technique.id} lacks its parent discipline.`);
    for (const state of p?.advancedStates || []) { const entry = byId(state.id); if (!entry || !entry.parentIds.some(parent => p.disciplines.some(discipline => discipline.id === parent))) errors.push(`Advanced state ${state.id} lacks its parent discipline.`); }
    if (c.style?.id === 'three-sword-style' && !p.trainingResults.some(result => result.id === 'three-sword-training' && ['three-sword-novice', 'three-sword-mastered'].includes(result.outcome))) errors.push('Three Sword Style lacks a recorded training result.');
    if (p.techniques.some(technique => technique.id === 'life-return') && !progression.hasDiscipline(c, 'rokushiki')) errors.push('Life Return lacks Rokushiki.');
    if (p.advancedStates.some(state => state.id === 'asura-nine-sword') && !progression.hasDiscipline(c, 'three-sword-style')) errors.push('Asura lacks Three Sword Style.');
    return errors;
  };
  progression.inferLegacy = function (c) {
    if (c.combatProgression) return c;
    const style = c.style || byId('brawling');
    const entry = byId(style.id) || styles().find(candidate => candidate.name === style.name);
    const foundationId = entry?.progressionType === 'foundation' ? entry.id : entry?.parentIds?.[0] || 'brawling';
    c.combatProgression = { foundation: { id: foundationId, mastery: Math.round(c.styleCompat ? c.styleCompat * 70 : 50), accessRoute: 'legacy-inferred', unlocked: true }, disciplines: entry?.progressionType === 'discipline' ? [{ id: entry.id, mastery: 50, accessRoute: 'legacy-inferred', unlocked: true, primary: true }] : [], techniques: [], advancedStates: (c.advancedStates || []).map(state => ({ id: state.id, mastery: state.mastery || 0, accessRoute: 'legacy-inferred', unlocked: true })), trainingResults: c.trainingResults || [], weaponMastery: Math.round((c.weaponSkill || 0) * 100), primaryDisciplineId: entry?.progressionType === 'discipline' ? entry.id : null, migratedFromFlatStyle: true };
    return c;
  };
}(window.OnePieceRollV4));

