/* Authoritative roles database. */
(function (V4) {
  'use strict';
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sourceFor = entry => entry.source || 'canon';
  const rawEntries = [
    { name: "Captain",       crewScore: 100, leadBonus: 20, desc: "Leader of the crew." },
    { name: "Vice Captain",  crewScore: 85,  leadBonus: 15, desc: "Second in command." },
    { name: "Combatant",     crewScore: 75,  leadBonus: 5,  desc: "Primary fighter." },
    { name: "Navigator",     crewScore: 60,  leadBonus: 5,  desc: "Charts the course through the Grand Line." },
    { name: "Cook",          crewScore: 55,  leadBonus: 5,  desc: "Keeps the crew fed and fighting." },
    { name: "Doctor",        crewScore: 60,  leadBonus: 5,  desc: "Keeps the crew alive." },
    { name: "Shipwright",    crewScore: 55,  leadBonus: 5,  desc: "Maintains the vessel." },
    { name: "Sniper",        crewScore: 60,  leadBonus: 5,  desc: "Picks off targets from distance." },
    { name: "Musician",      crewScore: 40,  leadBonus: 5,  desc: "Keeps morale high." },
    { name: "Helmsman",      crewScore: 55,  leadBonus: 5,  desc: "Steers the ship through danger." },
    { name: "Spy",           crewScore: 50,  leadBonus: 5,  desc: "Gathers intelligence." },
  ]
;
  V4.database.roles = rawEntries.map(entry => ({ ...entry, id: entry.id || slug(entry.name), source: sourceFor(entry), description: entry.description || entry.desc, tags: entry.tags || [] }));
}(window.OnePieceRollV4));

