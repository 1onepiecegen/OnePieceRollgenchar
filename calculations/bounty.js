/* Official bounty intelligence: public awareness plus a soft capture-cost floor. */
(function (V4) {
  'use strict';
  const bounty = V4.engines.bounty = V4.engines.bounty || {};
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const THREAT_ANCHORS = [
    { t: 0, b: 0 }, { t: 10, b: 1e7 }, { t: 30, b: 1e8 },
    { t: 50, b: 3e8 }, { t: 65, b: 7e8 }, { t: 80, b: 1.5e9 },
    { t: 92, b: 3e9 }, { t: 100, b: 5.656e9 }
  ];
  const CAPTURE_ANCHORS = [
    { danger: 0, amount: 0 }, { danger: 40, amount: 3e7 },
    { danger: 50, amount: 8e7 }, { danger: 60, amount: 1.6e8 },
    { danger: 65, amount: 2.4e8 }, { danger: 70, amount: 3.5e8 },
    { danger: 75, amount: 5e8 }, { danger: 80, amount: 7e8 },
    { danger: 85, amount: 9.5e8 }, { danger: 90, amount: 1.25e9 },
    { danger: 95, amount: 1.65e9 }, { danger: 100, amount: 2.2e9 }
  ];
  const AWARENESS = [
    { level: 'unknown', min: 0, multiplier: 0.20 },
    { level: 'rumored', min: 20, multiplier: 0.65 },
    { level: 'emerging', min: 38, multiplier: 0.85 },
    { level: 'known', min: 56, multiplier: 1.00 },
    { level: 'infamous', min: 74, multiplier: 1.10 },
    { level: 'world-famous', min: 90, multiplier: 1.20 }
  ];
  const interpolate = (anchors, key, value, amountKey) => {
    let low = anchors[0], high = anchors[anchors.length - 1];
    for (let index = 0; index < anchors.length - 1; index += 1) {
      if (value <= anchors[index + 1][key]) { low = anchors[index]; high = anchors[index + 1]; break; }
    }
    const fraction = clamp((value - low[key]) / ((high[key] - low[key]) || 1), 0, 1);
    return low[amountKey] + (high[amountKey] - low[amountKey]) * fraction;
  };
  const roundAmount = amount => {
    if (amount > 1e9) return Math.round(amount / 5e7) * 5e7;
    if (amount > 1e8) return Math.round(amount / 1e6) * 1e6;
    if (amount > 1e6) return Math.round(amount / 1e5) * 1e5;
    return Math.round(amount / 1e4) * 1e4;
  };
  const threatDerivedBase = threat => {
    // Beyond the final calibration anchor, bounties continue smoothly rather
    // than stopping at an artificial maximum. At threat 200 this lands near
    // 8.8B before public-record modifiers, not an arbitrary cap.
    const terminal = THREAT_ANCHORS.at(-1);
    if (threat > terminal.t) return terminal.b * Math.exp((threat - terminal.t) * 0.0045);
    let low = THREAT_ANCHORS[0], high = THREAT_ANCHORS[THREAT_ANCHORS.length - 1];
    for (let index = 0; index < THREAT_ANCHORS.length - 1; index += 1) {
      if (threat >= THREAT_ANCHORS[index].t && threat <= THREAT_ANCHORS[index + 1].t) {
        low = THREAT_ANCHORS[index]; high = THREAT_ANCHORS[index + 1]; break;
      }
    }
    const fraction = clamp((threat - low.t) / ((high.t - low.t) || 1), 0, 1);
    return low.b === 0 ? high.b * fraction * fraction : low.b * Math.pow(high.b / low.b, fraction);
  };

  bounty.assessAbilityExposure = function (c) {
    const events = c.accomplishments || [];
    const isPublicBattle = event => event.tags?.includes('public-battle') || /defeated|destroyed|attacked|survived a buster call|publicly humiliated|sank a marine warship/i.test(event.text || event.name || '');
    const isGovernmentRecord = event => /marine|impel down|celestial|government|wg |buster call/i.test(event.text || event.name || '');
    const publicBattle = events.some(isPublicBattle);
    const governmentRecord = events.some(isGovernmentRecord);
    const explicit = c.publicAbilityExposure || {};
    const reputationExposure = c.reputation?.tags?.includes('publicly-known-power') || ['Marine Killer', 'Government Enemy', 'Revolutionary Threat', 'Cruel Destroyer', 'Infamous Duelist'].includes(c.reputation?.name);
    const intelFacts = c.governmentIntelligence?.exposedInformation || [];
    return {
      fruit: explicit.fruit === true || (publicBattle && reputationExposure) || intelFacts.includes('devil-fruit') || intelFacts.includes('fruit-awakening'),
      haki: explicit.haki === true || (publicBattle && reputationExposure) || intelFacts.includes('haki-types') || intelFacts.includes('advanced-haki'),
      sensitiveTrait: explicit.sensitiveTrait === true || (governmentRecord && c.reputation?.tags?.includes('government-sensitive-identity')) || intelFacts.includes('government-sensitive-trait'),
      publicBattle,
      governmentRecord,
      reasons: [
        ...(publicBattle ? ['Public combat record'] : []),
        ...(governmentRecord ? ['Government incident record'] : []),
        ...(explicit.fruit || explicit.haki || explicit.sensitiveTrait ? ['Explicit ability-exposure record'] : []),
        ...(intelFacts.length ? ['Government intelligence report'] : [])
      ]
    };
  };

  bounty.assessAwareness = function (c) {
    let score = 5;
    const reasons = [];
    const visibleEvents = c.accomplishments || [];
    const governmentEvents = visibleEvents.filter(event => /marine|impel down|celestial|government|wg |buster call/i.test(event.text || event.name || ''));
    if (visibleEvents.length) {
      const visibility = clamp(visibleEvents.reduce((total, event) => total + Math.min(12, (event.govt || 0) * 0.24 + 2), 0), 0, 30);
      score += visibility;
      reasons.push(`${visibleEvents.length} recorded accomplishment${visibleEvents.length === 1 ? '' : 's'}`);
    }
    if (governmentEvents.length) {
      score += Math.min(24, governmentEvents.length * 8);
      reasons.push('Government or Marine incident on record');
    }
    const reputationScores = {
      'Government Enemy': 16, 'Marine Killer': 16, 'Revolutionary Threat': 18,
      'Cruel Destroyer': 11, 'Underworld Broker': 8, 'Known Smuggler': 5,
      'Infamous Duelist': 7, 'Minor Marine Concern': 4, 'Phantom': -14,
      'Heroic Protector': -2, 'Local Hero': -3, 'Rookie Pirate': -4,
      'Local Nuisance': -6, 'Independent Adventurer': -5, 'Treasure Seeker': -4,
      'Pirate Hunter': -7, 'Benevolent Pirate': -3
    };
    const reputationScore = reputationScores[c.reputation?.name] || 0;
    score += reputationScore;
    if (reputationScore) reasons.push(`Reputation: ${c.reputation.name}`);
    const roleScores = { Captain: 11, 'Vice Captain': 8, Combatant: 5, Sniper: 3, Spy: -10 };
    const roleScore = roleScores[c.role?.name] || 0;
    score += roleScore + clamp((c.threat?.influence || 0) * 0.20, 0, 16);
    if (roleScore > 0 || (c.threat?.influence || 0) >= 55) reasons.push(`Crew position and influence: ${c.role?.name || 'unknown role'}`);
    const legacyPossessionSignals = [
      [c.hasAwakened, 12, 'Awakened Devil Fruit is publicly associated with them'],
      [c.fruit?.type === 'Mythical Zoan', 8, 'Mythical Zoan identity is notable'],
      [c.haki?.hasAdvCoc, 10, 'Advanced Conqueror’s Haki has been witnessed'],
      [c.haki?.hasAdvObs || c.haki?.hasAdvArm, 6, 'Advanced Haki has been witnessed'],
      [c.traits?.some(trait => trait.name === 'The Will of D.' || trait.name === 'Voice of All Things'), 8, 'Government-sensitive trait is known']
    ];
    // Possession is not public knowledge. Only an explicit exposure record or
    // a public-combat/reputation route can reveal a rare ability to Marines.
    const exposure = bounty.assessAbilityExposure(c);
    const intelligence = c.governmentIntelligence;
    if (intelligence?.awarenessBonus) { score += intelligence.awarenessBonus; reasons.push(`Intelligence ${intelligence.status}: ${intelligence.coverage}% coverage / ${intelligence.reliability}% reliability`); }
    const rareSignals = [
      [c.hasAwakened && exposure.fruit, 12, 'Awakened Devil Fruit has a public exposure route'],
      [c.fruit?.type === 'Mythical Zoan' && exposure.fruit, 8, 'Mythical Zoan identity has a public exposure route'],
      [c.haki?.hasAdvCoc && exposure.haki, 10, 'Advanced Conqueror Haki has a public exposure route'],
      [(c.haki?.hasAdvObs || c.haki?.hasAdvArm) && exposure.haki, 6, 'Advanced Haki has a public exposure route'],
      [c.traits?.some(trait => trait.name === 'The Will of D.' || trait.name === 'Voice of All Things') && exposure.sensitiveTrait, 8, 'Government-sensitive trait has a public exposure record']
    ];
    for (const [present, value, reason] of rareSignals) if (present) { score += value; reasons.push(reason); }
    if (c.role?.name === 'Spy' || c.reputation?.name === 'Phantom') reasons.push('Secrecy limits reliable Marine intelligence');
    score = Math.round(clamp(score, 0, 100));
    const band = [...AWARENESS].reverse().find(entry => score >= entry.min) || AWARENESS[0];
    return { level: band.level, score, multiplier: band.multiplier, reasons, abilityExposure: exposure, intelligence };
  };

  bounty.calculate = function (c) {
    const threat = c.threat?.threat || 0;
    const baseThreatAmount = threatDerivedBase(threat);
    const modifiers = [];
    let threatDerivedAmount = baseThreatAmount;
    if (c.reputation?.bountyMod) { threatDerivedAmount *= c.reputation.bountyMod; modifiers.push({ label: `Reputation: ${c.reputation.name}`, multiplier: c.reputation.bountyMod }); }
    for (const trait of c.traits || []) if (trait.bountyMod) { threatDerivedAmount *= trait.bountyMod; if (trait.bountyMod !== 1) modifiers.push({ label: `Trait: ${trait.name}`, multiplier: trait.bountyMod }); }
    if (c.destiny?.bountyMult) { threatDerivedAmount *= c.destiny.bountyMult; modifiers.push({ label: `Destiny: ${c.destiny.name}`, multiplier: c.destiny.bountyMult }); }
    threatDerivedAmount = roundAmount(Math.max(30000, threatDerivedAmount));
    const publicAwareness = bounty.assessAwareness(c);
    const danger = c.threat?.combatDanger || 0;
    const terminalCapture = CAPTURE_ANCHORS.at(-1);
    const combatCaptureFloor = roundAmount(danger > terminalCapture.danger
      ? terminalCapture.amount * Math.exp((danger - terminalCapture.danger) * 0.006)
      : interpolate(CAPTURE_ANCHORS, 'danger', danger, 'amount'));
    const confidence = 1 + ((c.governmentIntelligence?.threatEffects?.combatConfidence || 0) / 100);
    const awarenessAdjustedFloor = roundAmount(combatCaptureFloor * publicAwareness.multiplier * confidence);
    const floorActivated = awarenessAdjustedFloor > threatDerivedAmount;
    const amount = Math.max(threatDerivedAmount, awarenessAdjustedFloor);
    const creatorBountyOverride = Number(c.creatorBountyOverride) > 0 ? Number(c.creatorBountyOverride) : null;
    const displayedAmount = creatorBountyOverride || amount;
    const majorReasons = [...publicAwareness.reasons];
    if (floorActivated) majorReasons.unshift(`${publicAwareness.level} combat assessment establishes a capture-cost floor`);
    else majorReasons.unshift('Marine threat and public record set the official assessment');
    const explanation = floorActivated
      ? 'Their political profile is limited, but their publicly known combat ability establishes a much higher minimum capture assessment.'
      : publicAwareness.level === 'unknown' || publicAwareness.level === 'rumored'
        ? 'Their actual combat ability may exceed the public record; the Government has only fragmentary information about them.'
        : 'The official bounty follows the Marine threat assessment, adjusted for public record and known danger.';
    return { amount, calculatedAmount: amount, calculatedBounty: amount, displayedAmount, displayedBounty: displayedAmount, creatorBountyOverride, threatDerivedAmount, combatCaptureFloor, awarenessAdjustedFloor, publicAwareness, modifiers, floorActivated, majorReasons, explanation, intelligenceConfidence: confidence };
  };
}(window.OnePieceRollV4));


