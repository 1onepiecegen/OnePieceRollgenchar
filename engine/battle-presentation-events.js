/* Adds display-only structure to deterministic battle events. No random draw or combat value is changed. */
(function (V4) {
  'use strict';
  const battle = V4.engines.battle;
  if (!battle || battle._presentationEventsWrapped) return;
  const originalStep = battle.step;
  const byName = session => new Map([[session.f1.name, session.f1], [session.f2.name, session.f2]]);
  const hakiTypes = fighter => {
    const haki = fighter?.combatant?.haki || {};
    return [haki.hasAdvCoc ? 'Advanced Conqueror’s' : haki.hasCoc ? 'Conqueror’s' : null, haki.hasAdvArm ? 'Advanced Armament' : haki.arm ? 'Armament' : null, haki.hasAdvObs ? 'Future Sight' : haki.obs ? 'Observation' : null].filter(Boolean);
  };
  const powerClass = scale => ({ light:'light', standard:'standard', heavy:'heavy', finisher:'finisher', catastrophic:'ultimate' }[scale] || 'standard');
  const explanation = event => {
    if (event.element === 'magma' && event.affinity?.bestAgainst === 'fire') return 'MAGMA OVERWHELMS FLAME — extreme heat and physical magma mass overpower this fire defense.';
    if (event.element === 'darkness' && event.message?.includes('NULLIFIED')) return 'DARKNESS PULL — Devil Fruit defenses are suppressed on contact.';
    if (event.outcome === 'logia-phase') return 'LOGIA BODY — the attack passed through an elemental body.';
    if (event.contact && event.affinity?.bestAgainst === 'fruit-energy') return 'LOGIA BODY NEGATED — Haki or darkness made contact.';
    return null;
  };
  battle.step = function (session, playerAction) {
    const result = originalStep(session, playerAction);
    const fighters = byName(session);
    let active = null;
    for (const event of result.events) {
      const attacker = fighters.get(event.attacker), defender = fighters.get(event.defender);
      event.sequenceId = `${result.summary.seed}:${event.turn}:${result.events.indexOf(event)}`;
      event.actorId = attacker?.combatant?.id || null;
      event.targetId = defender?.combatant?.id || null;
      event.powerClass = powerClass(event.scale);
      event.hakiTypes = hakiTypes(attacker);
      event.defenderHakiTypes = hakiTypes(defender);
      if (event.phase === 'decision') active = event;
      if (event.phase === 'telegraph') {
        event.type = 'attack-telegraph'; event.actionId = active?.action || 'style'; event.actionName = event.technique;
        event.actionCategory = active?.action || 'style'; event.elementIds = event.element ? [event.element] : (active?.element ? [active.element] : []);
        event.isSignature = !String(event.technique || '').startsWith('Combat Art:') && !String(event.technique || '').startsWith('Devil Fruit:');
        event.isAwakened = !!attacker?.combatant?.awakening?.hasAwakened || !!attacker?.combatant?.hasAwakened;
      } else if (event.phase === 'counter-window') {
        event.type = 'defense-telegraph'; event.result = 'reading'; event.observationActive = !!defender?.combatant?.haki?.obs;
      } else if (event.phase === 'resolution') {
        event.type = 'defense-result'; event.result = ({guard:'guard',dodged:'dodge',countered:'counter','logia-phase':'logia-phase',hit:'hit',miss:'miss'}[event.outcome] || event.outcome || 'hit');
        event.effectiveness = event.result === 'guard' ? 38 : event.result === 'counter' ? 28 : event.result === 'dodge' ? 100 : 0;
        if (!event.targetId && event.result === 'guard') event.targetId = event.actorId;
      } else if (event.phase === 'impact') {
        event.type = 'impact'; event.critical = ['finisher','catastrophic'].includes(event.scale) || (event.damage || 0) >= 65;
        event.actionCategory = active?.action || 'style'; event.elementIds = event.element ? [event.element] : (active?.element ? [active.element] : []); event.element = event.element || active?.element || null; event.elementResult = event.outcome; event.hakiClash = !!attacker?.combatant?.haki?.hasAdvCoc && !!defender?.combatant?.haki?.hasAdvCoc;
        event.statusApplied = (event.damage || 0) >= 52 ? 'Staggered' : null;
        event.impactLevel = event.critical ? 'legendary-impact' : ['heavy','finisher','catastrophic'].includes(event.scale) ? 'major-impact' : 'minor-impact';
      } else {
        event.type = event.phase;
      }
      event.presentationExplanation = explanation(event);
    }
    const history = result.actionHistory[result.actionHistory.length - 1];
    if (history && history.turn === result.turn) history.events = result.events.map(event => ({ ...event }));
    return result;
  };
  battle._presentationEventsWrapped = true;
}(window.OnePieceRollV4));
