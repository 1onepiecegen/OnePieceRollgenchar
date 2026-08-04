/* Marine information layer: what the Government knows is separate from actual power. */
(function (V4) {
  'use strict';
  const intelligence = V4.engines.intelligence = V4.engines.intelligence || {};
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const SOURCES = [
    'eyewitness report', 'Marine encounter report', 'captured associate', 'Government spy',
    'newspaper or public battle', 'intercepted Den Den Mushi transmission', 'betrayal', 'anonymous informant'
  ];
  const factsFor = c => {
    const facts = ['approximate-combat-capability', 'crew-structure'];
    if (c.race?.name && c.race.name !== 'Human') facts.push('race');
    if (c.race?.name === 'Lunarian') facts.push('lunarian-race');
    if (c.fruit) facts.push('devil-fruit');
    if (c.hasAwakened) facts.push('fruit-awakening');
    if (c.weapon || c.loadout?.weaponCount) facts.push('weapon-loadout');
    if (c.haki?.obs || c.haki?.arm || c.haki?.hasCoc) facts.push('haki-types');
    if (c.haki?.hasAdvObs || c.haki?.hasAdvArm || c.haki?.hasAdvCoc) facts.push('advanced-haki');
    if (c.combatProgression?.disciplines?.length) facts.push('disciplines');
    if (c.advancedStates?.length) facts.push('advanced-states');
    if (c.mentor?.name && c.mentor.name !== 'Self-Taught') facts.push('mentor');
    if ((c.accomplishments || []).some(event => (event.govt || 0) >= 35)) facts.push('political-objectives');
    if (c.traits?.some(trait => ['The Will of D.', 'Voice of All Things'].includes(trait.name))) facts.push('government-sensitive-trait');
    return facts;
  };
  const sourceProfile = source => ({
    'eyewitness report': [30, 64], 'Marine encounter report': [54, 86], 'captured associate': [62, 70],
    'Government spy': [78, 94], 'newspaper or public battle': [50, 76],
    'intercepted Den Den Mushi transmission': [58, 80], 'betrayal': [84, 82], 'anonymous informant': [42, 48]
  }[source] || [35, 60]);
  intelligence.allFacts = factsFor;
  intelligence.derive = function (rng, c, options = {}) {
    const actualFacts = factsFor(c);
    const forced = options.status && options.status !== 'derived' ? options.status : null;
    const publicSignals = (c.accomplishments?.length || 0) * 0.018 + (c.role?.name === 'Captain' ? 0.04 : 0) + (c.reputation?.name === 'Government Enemy' || c.reputation?.name === 'Revolutionary Threat' ? 0.08 : 0) + (c.reputation?.name === 'Marine Killer' ? 0.05 : 0);
    const chance = clamp(0.025 + publicSignals, 0.01, 0.50);
    if (!forced && !rng.chance(chance)) return { leakEvent: false, status: 'no-intelligence', source: null, reliability: 0, coverage: 0, exposedInformation: [], hiddenInformation: actualFacts, falseInformation: [], reasons: ['No actionable new intelligence report reached Marine command.'], awarenessBonus: 0, threatEffects: {} };
    const status = forced || (rng.chance(0.02) ? 'false-report' : 'partial-leak');
    const source = options.source || (status === 'full-dossier' ? 'Government spy' : status === 'false-report' ? 'anonymous informant' : rng.pick(SOURCES));
    const [baseCoverage, baseReliability] = sourceProfile(source);
    const presets = {
      none: [0, 0], 'minor-rumors': [22, 42], 'partial-leak': [55, 72], 'major-leak': [78, 86], 'full-dossier': [100, 100], 'false-report': [70, 22]
    };
    const [coverageBase, reliabilityBase] = presets[status] || [baseCoverage, baseReliability];
    const coverage = Number.isFinite(options.coverage) ? clamp(options.coverage, 0, 100) : status === 'full-dossier' ? 100 : clamp(coverageBase + (forced ? 0 : rng.roll(-10, 10)), 0, 100);
    const reliability = Number.isFinite(options.reliability) ? clamp(options.reliability, 0, 100) : status === 'full-dossier' ? 100 : clamp(reliabilityBase + (forced ? 0 : rng.roll(-12, 12)), 0, 100);
    const count = Math.min(actualFacts.length, Math.max(0, Math.ceil(actualFacts.length * coverage / 100)));
    const exposedInformation = options.exposedInformation?.length ? options.exposedInformation.filter(fact => actualFacts.includes(fact)) : [...actualFacts].sort(() => rng.next() - 0.5).slice(0, count);
    const falseInformation = status === 'false-report' ? ['exaggerated-combat-capability', 'unverified-political-objectives'] : (options.falseInformation || []);
    const hiddenInformation = actualFacts.filter(fact => !exposedInformation.includes(fact));
    const awarenessBonus = clamp(coverage * 0.20 + reliability * 0.15, 0, 35);
    const threatEffects = {
      combatConfidence: exposedInformation.some(fact => ['approximate-combat-capability', 'advanced-haki', 'fruit-awakening', 'advanced-states'].includes(fact)) ? Math.round(8 + reliability * 0.10) : 0,
      strategic: exposedInformation.includes('lunarian-race') ? 15 : exposedInformation.includes('race') ? 5 : 0,
      political: exposedInformation.some(fact => ['political-objectives', 'government-sensitive-trait'].includes(fact)) ? Math.round(8 + reliability * 0.12) : 0,
      influence: exposedInformation.includes('crew-structure') ? Math.round(coverage * 0.10) : 0
    };
    const reason = status === 'false-report' ? 'An unverified report may exaggerate their actual danger.' : `${source[0].toUpperCase()}${source.slice(1)} supplied a ${coverage}% coverage report.`;
    return { leakEvent: status !== 'none', status, source, reliability, coverage, exposedInformation, hiddenInformation, falseInformation, reasons: [reason], awarenessBonus, threatEffects, leakChance: chance };
  };

  intelligence.assess = function (rng, c, options = {}) {
    const facts = factsFor(c);
    const events = c.accomplishments || [];
    const governmentIncidents = events.filter(event => /marine|impel|celestial|government|buster call/i.test(event.text || event.name || '')).length;
    const publicBattles = events.filter(event => event.tags?.includes('public-battle') || /defeated|destroyed|attacked|sank/i.test(event.text || event.name || '')).length;
    const world = c.worldProfile || {};
    const role = c.role?.name;
    const famousWeapon = (c.loadout?.weapons || []).some(weapon => weapon.named || weapon.unique || weapon.grade === 'Supreme');
    const rareRace = c.race?.name && c.race.name !== 'Human';
    const secrecy = role === 'Spy' || c.reputation?.name === 'Phantom' ? 18 : 0;
    let baselineScore = 4 + events.length * 4 + governmentIncidents * 8 + publicBattles * 5;
    baselineScore += role === 'Captain' ? 14 : role === 'Vice Captain' ? 8 : 0;
    baselineScore += (world.influence || 0) * 0.45 + (world.politicalDanger || 0) * 0.25;
    baselineScore += c.crewQuality?.id === 'legendary' ? 16 : c.crewQuality?.id === 'veteran' ? 7 : 0;
    baselineScore += ['Government Enemy', 'Revolutionary Threat', 'Marine Killer'].includes(c.reputation?.name) ? 12 : 0;
    baselineScore += rareRace ? 4 : 0; baselineScore += famousWeapon ? 3 : 0;
    baselineScore += (c.threat?.combatDanger || 0) * 0.20 + Math.min(12, Math.log10(Math.max(1, c.bounty?.amount || 1)) - 6);
    baselineScore -= secrecy;
    if (['pirate-king', 'wg-nightmare'].includes(world.id)) baselineScore = Math.max(baselineScore, 85);
    else if (world.id === 'emperor') baselineScore = Math.max(baselineScore, 68);
    const baselineCoverage = Math.round(clamp(baselineScore, 0, 100));
    const baselineReliability = Math.round(clamp(35 + baselineCoverage * 0.52 + governmentIncidents * 4 - secrecy * 0.4, 20, 98));
    const baselineCount = Math.min(facts.length, Math.ceil(facts.length * baselineCoverage / 100));
    const baselineFacts = facts.slice(0, baselineCount);
    const baselineDossier = { coverage: baselineCoverage, reliability: baselineReliability, exposedInformation: baselineFacts, hiddenInformation: facts.filter(fact => !baselineFacts.includes(fact)), reasons: ['Established Marine dossier derived from public records, notoriety, and visible activity.'] };
    let leakChance = 0.01 + events.length * 0.010 + governmentIncidents * 0.035 + publicBattles * 0.018;
    leakChance += role === 'Captain' ? 0.07 : role === 'Vice Captain' ? 0.035 : 0;
    leakChance += (c.threat?.combatDanger || 0) / 100 * 0.12 + (world.influence || 0) / 100 * 0.12;
    leakChance += c.crewQuality?.id === 'legendary' ? 0.10 : c.crewQuality?.id === 'veteran' ? 0.04 : 0;
    leakChance += ['Government Enemy', 'Revolutionary Threat'].includes(c.reputation?.name) ? 0.10 : c.reputation?.name === 'Marine Killer' ? 0.055 : 0;
    leakChance += rareRace ? 0.02 : 0; leakChance += famousWeapon ? 0.015 : 0; leakChance -= secrecy * 0.008;
    if (world.id === 'emperor') leakChance = Math.max(leakChance, 0.42);
    if (world.id === 'world-power') leakChance = Math.max(leakChance, 0.28);
    if (['pirate-king', 'wg-nightmare'].includes(world.id)) leakChance = Math.max(leakChance, 0.55);
    leakChance = clamp(leakChance, 0.01, 0.80);
    const forced = options.status && options.status !== 'derived';
    const leakEvents = [];
    if (forced) leakEvents.push(intelligence.derive(rng, c, options));
    else if (rng.chance(leakChance)) {
      leakEvents.push(intelligence.derive(rng, c, { status: 'partial-leak' }));
      if (leakChance >= 0.42 && rng.chance((leakChance - 0.35) * 0.6)) leakEvents.push(intelligence.derive(rng, c, { status: 'major-leak' }));
    }
    const confirmed = [...new Set([...baselineFacts, ...leakEvents.flatMap(event => event.exposedInformation || [])])];
    const falseInformation = [...new Set(leakEvents.flatMap(event => event.falseInformation || []))];
    const coverage = Math.round(clamp(Math.max(baselineCoverage, ...leakEvents.map(event => event.coverage || 0)), 0, 100));
    const reliability = Math.round(clamp(leakEvents.length ? Math.max(baselineReliability, ...leakEvents.map(event => event.reliability || 0)) : baselineReliability, 0, 100));
    const hiddenInformation = facts.filter(fact => !confirmed.includes(fact));
    const threatEffects = leakEvents.reduce((total, event) => ({ combatConfidence: total.combatConfidence + (event.threatEffects?.combatConfidence || 0), strategic: total.strategic + (event.threatEffects?.strategic || 0), political: total.political + (event.threatEffects?.political || 0), influence: total.influence + (event.threatEffects?.influence || 0) }), { combatConfidence: 0, strategic: 0, political: 0, influence: 0 });
    const combinedAssessment = { coverage, reliability, confirmedInformation: confirmed, suspectedInformation: [], falseInformation, hiddenInformation, awarenessBonus: Math.round(clamp((coverage - 15) * .16 + leakEvents.length * 4, 0, 35)), threatEffects, reasons: [...baselineDossier.reasons, ...leakEvents.flatMap(event => event.reasons || [])] };
    return { baselineDossier, leakEvents, combinedAssessment, leakEvent: leakEvents.length > 0, status: leakEvents.length ? leakEvents.at(-1).status : 'baseline-only', source: leakEvents.at(-1)?.source || 'established Marine dossier', coverage, reliability, exposedInformation: confirmed, hiddenInformation, falseInformation, reasons: combinedAssessment.reasons, awarenessBonus: combinedAssessment.awarenessBonus, threatEffects, leakChance };
  };
}(window.OnePieceRollV4));

