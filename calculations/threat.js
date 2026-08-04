/* Marine threat assessment: distinct from combat and built for bounty explanation. */
(function (V4) {
  'use strict';
  const threat = V4.engines.threat = V4.engines.threat || {};
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const anchors = [{ cr: 0, value: 0 }, { cr: 15, value: 15 }, { cr: 25, value: 25 }, { cr: 40, value: 40 }, { cr: 55, value: 55 }, { cr: 70, value: 70 }, { cr: 85, value: 85 }, { cr: 100, value: 100 }, { cr: 120, value: 120 }, { cr: 150, value: 150 }];
  threat.combatToDanger = function (rating) {
    for (let i = 0; i < anchors.length - 1; i += 1) {
      const low = anchors[i], high = anchors[i + 1];
      if (rating <= high.cr) return low.value + (rating - low.cr) / (high.cr - low.cr) * (high.value - low.value);
    }
    // Unbounded Marine combat-danger index. A rating remains meaningful after
    // Pirate King scale instead of being flattened into a 100-point ceiling.
    return anchors.at(-1).value + (rating - anchors.at(-1).cr);
  };
  threat.combineEvents = function (events) {
    const weights = [1, 0.65, 0.40, 0.25, 0.15];
    return events.map(event => event.govt || 0).sort((a, b) => b - a).reduce((sum, value, index) => sum + value * (weights[index] === undefined ? 0.1 : weights[index]), 0);
  };
  threat.calculate = function (c) {
    const intel = c.governmentIntelligence?.threatEffects || {};
    const world = c.worldProfile || {};
    const eventThreat = threat.combineEvents(c.accomplishments);
    const traitGovernment = c.traits.reduce((sum, trait) => sum + (trait.govt || 0), 0);
    const politicalDanger = Math.max(0, eventThreat * 0.55 + traitGovernment + (c.reputation.name === 'Revolutionary Threat' ? 25 : 0) + (c.reputation.name === 'Government Enemy' ? 15 : 0) + (c.destiny && c.destiny.name === 'World Government Target' ? 25 : 0) + (world.politicalDanger || 0) + (intel.political || 0));
    const influence = Math.max(0, c.mental.leadership * 0.55 + c.role.crewScore * 0.45 + (c.traits.some(trait => trait.name === 'Natural Leader') ? 8 : 0) + (world.influence || 0) + (intel.influence || 0));
    const criminalRecord = Math.max(0, eventThreat * 0.75 + c.accomplishments.length * 3 + (world.criminalRecord || 0));
    const strategicValue = Math.max(0, (c.traits.some(trait => trait.name === 'The Will of D.') ? 25 : 0) + (c.traits.some(trait => trait.name === 'Voice of All Things') ? 18 : 0) + (c.fruit && c.fruit.type === 'Mythical Zoan' ? 18 : 0) + (c.hasAwakened ? 15 : 0) + (c.role.name === 'Scientist' ? 15 : 0) + (c.role.name === 'Doctor' ? 8 : 0) + (world.strategicValue || 0) + (intel.strategic || 0));
    const volatility = Math.max(0, Math.abs(c.reputation.bountyMod - 1) * 100 + (c.reputation.name === 'Cruel Destroyer' ? 20 : 0) + (c.reputation.name === 'Marine Killer' ? 15 : 0) + (c.traits.some(trait => trait.name === 'Hotheaded') ? 8 : 0));
    const combatDanger = threat.combatToDanger(c.combatRating);
    // V5 Marine Threat is an open operational-priority score, not a percent.
    const total = Math.max(0, combatDanger * 0.62 + politicalDanger * 0.12 + influence * 0.09 + criminalRecord * 0.07 + strategicValue * 0.07 + volatility * 0.03);
    return { threat: total, total, combatDanger, politicalDanger, influence, criminalRecord, strategicValue, volatility, breakdown: { eventThreat, traitGovernment, combatRating: c.combatRating, combatDanger, politicalDanger, influence, criminalRecord, strategicValue, volatility, intelligence: intel, worldProfile: world.id || null } };
  };
}(window.OnePieceRollV4));

