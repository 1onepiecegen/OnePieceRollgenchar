/* V5 first living-world layer: persistent territory, pursuit, rival, and event log. */
(function (V4) {
  'use strict';
  const world = V4.engines.livingWorld = V4.engines.livingWorld || {};
  const KEY = 'op-v5-living-worlds';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) { return {}; } };
  const write = value => localStorage.setItem(KEY, JSON.stringify(value));
  const rng = seed => { let state = (Number(seed) || 1) >>> 0; return () => ((state = Math.imul(state ^ state >>> 15, 1 | state)) ^ state + Math.imul(state ^ state >>> 7, 61 | state)) >>> 0; };
  const identity = character => character.id || character.buildId || `seed-${character.seed}`;
  const crewRoles = ['Navigator', 'Shipwright', 'Doctor', 'Cook', 'Sniper', 'Musician', 'Lookout'];
  const normalize = (state, character) => {
    if (typeof state.territory === 'string') state.territory = { name: state.territory, control: 45, standing: 'Unsettled' };
    if (typeof state.rival === 'string') state.rival = { name: state.rival, objective: 'test the crew’s claim to the route', pressure: 35 };
    state.crew = state.crew || crewRoles.filter(role => role !== character.role?.name).slice(0, 3).map((role, index) => ({ role, status: index === 0 ? 'trusted' : 'recruit' }));
    state.pursuer = state.pursuer || { unit: (character.threat?.threat || 0) >= 120 ? 'Marine HQ pursuit detachment' : (character.threat?.threat || 0) >= 60 ? 'Vice Admiral-led pursuit detail' : 'regional Marine patrol', pressure: Math.round((character.threat?.threat || 0) * .5) };
    return state;
  };
  world.ensure = function (character) {
    const all = read(), id = identity(character); if (all[id]) { all[id] = normalize(all[id], character); write(all); return all[id]; }
    const roll = rng(character.seed), territories = ['a quiet East Blue harbor', 'a Grand Line trade route', 'a New World island passage', 'a storm-worn independent port'];
    const rivals = ['a rival pirate crew', 'a bounty-hunter flotilla', 'a local underworld broker', 'a Marine intelligence officer'];
    const territory = territories[roll() % territories.length], rival = rivals[roll() % rivals.length];
    const state = normalize({ id, turn: 0, territory: { name: territory, control: 35 + roll() % 31, standing: 'Unsettled' }, rival: { name: rival, objective: 'test the crew’s claim to the route', pressure: 25 + roll() % 36 }, marineHeat: Math.round((character.threat?.threat || 0) * .65), crewMorale: 60 + roll() % 31, history: ['A new name begins to circulate across the sea.'] }, character);
    all[id] = state; write(all); return state;
  };
  world.advance = function (character) {
    const all = read(), id = identity(character), state = all[id] || world.ensure(character), roll = rng((Number(character.seed) || 1) + state.turn * 7919), events = [
      { text: 'A rival crew tests the crew’s resolve at sea.', heat: 8, morale: 5, control: -4, rival: 8 },
      { text: 'A Marine patrol confirms a new report and tightens the net.', heat: 12, morale: -3, control: -2, rival: 0 },
      { text: 'The crew protects a civilian vessel during rough waters.', heat: -3, morale: 8, control: 7, rival: -3 },
      { text: 'A difficult voyage uncovers a useful route and raises local standing.', heat: 2, morale: 4, control: 6, rival: -2 },
      { text: 'A broker spreads a rumor that complicates the crew’s next move.', heat: 5, morale: -2, control: -3, rival: 6 }
    ];
    const event = events[roll() % events.length]; state.turn += 1; state.marineHeat = Math.max(0, state.marineHeat + event.heat); state.crewMorale = Math.max(0, Math.min(100, state.crewMorale + event.morale)); state.territory.control = Math.max(0, Math.min(100, state.territory.control + event.control)); state.territory.standing = state.territory.control >= 70 ? 'Friendly' : state.territory.control >= 40 ? 'Contested' : 'Hostile'; state.rival.pressure = Math.max(0, Math.min(100, state.rival.pressure + event.rival)); state.pursuer.pressure = Math.max(0, Math.round(state.marineHeat * .8)); state.history.unshift(`Turn ${state.turn}: ${event.text}`); state.history = state.history.slice(0, 8); all[id] = state; write(all); return state;
  };
  world.reset = character => { const all = read(); delete all[identity(character)]; write(all); };
}(window.OnePieceRollV4));


