/* V5 presentation model for a Marine HQ intelligence filing. */
(function (V4) {
  'use strict';
  const report = V4.engines.marineReport = V4.engines.marineReport || {};
  const stars = count => '★'.repeat(count) + '☆'.repeat(5 - count);
  const classify = threat => threat >= 170 ? 5 : threat >= 120 ? 4 : threat >= 80 ? 3 : threat >= 40 ? 2 : 1;
  report.create = function (character) {
    const intel = character.governmentIntelligence?.combinedAssessment || character.governmentIntelligence || {};
    const value = character.threat?.threat || 0, level = classify(value);
    const known = intel.confirmedInformation || intel.exposedInformation || [];
    const hidden = intel.hiddenInformation || [];
    const rumors = intel.falseInformation || [];
    const response = value >= 170 ? ['Deploy Admiral-class forces only.', 'Do not permit isolated engagement.', 'Escalate immediately to Marine HQ.'] : value >= 120 ? ['Deploy an Admiral-class response if contact is confirmed.', 'Avoid engagement below Vice Admiral level.'] : value >= 80 ? ['Dispatch a Vice Admiral-led force.', 'Secure civilians and intelligence before pursuit.'] : value >= 40 ? ['Assign a Marine captain-led interception unit.', 'Confirm identity before escalating.'] : ['Maintain routine surveillance.', 'Detain only with local force superiority.'];
    const aliases = [...new Set([character.reputation?.name, character.destiny?.name].filter(Boolean))];
    const observedBattles = (character.accomplishments || []).filter(event => event.tags?.includes('public-battle') || /defeated|destroyed|attacked|sank|escaped/i.test(event.text || '')).map(event => event.text).slice(0, 4);
    const seed = Math.abs(Number(character.seed) || 0);
    const locations = ['an unnamed Grand Line route', 'a New World sea lane', 'an East Blue port', 'a civilian shipping corridor'];
    return { classification: stars(level), classificationLevel: level, threatPriority: stars(Math.min(5, Math.max(1, Math.ceil(value / 35)))), capturePriority: stars(Math.min(5, Math.max(1, Math.ceil((character.bounty?.publicAwareness?.score || 0) / 20)))), danger: value >= 170 ? 'EXISTENTIAL' : value >= 120 ? 'EXTREME' : value >= 80 ? 'SEVERE' : value >= 40 ? 'ELEVATED' : 'WATCHLIST', aliases, knownFacts: known, hiddenFacts: hidden, rumors, observedBattles, lastSeen: locations[seed % locations.length], response, evaluation: `Subject carries a Marine Threat of ${value.toFixed(1)}. Assessment confidence: ${intel.reliability || 0}%; dossier coverage: ${intel.coverage || 0}%.` };
  };
}(window.OnePieceRollV4));



