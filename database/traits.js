/* Authoritative traits database. */
(function (V4) {
  'use strict';
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sourceFor = entry => entry.source || 'expanded';
  const rawEntries = [
    { name: "The Will of D.",       power: 15, bountyMod: 1.45, govt: 35, rarity: 0.04, desc: "Carries the mysterious initial." },
{ name: "Self-Taught", power: 4, bountyMod: 1.0, govt: 0, rarity: 0.01, desc: "No formal master — learned everything through trial, error, and raw determination." },
    { name: "Voice of All Things",  power: 10, bountyMod: 1.25, govt: 20, rarity: 0.03, desc: "Hears voices of animals and Poneglyphs." },
    { name: "Battle Genius",        power: 12, bountyMod: 1.15, govt: 5,  rarity: 0.12, desc: "Adapts to opponents mid-combat." },
    { name: "Monster Constitution", power: 20, bountyMod: 1.10, govt: 5,  rarity: 0.05, desc: "Born with unnatural toughness." },
    { name: "Natural Leader",       power: 5,  bountyMod: 1.25, govt: 5,  rarity: 0.18, desc: "Draws powerful allies effortlessly." },
    { name: "Perfect Memory",       power: 5,  bountyMod: 1.05, govt: 0,  rarity: 0.10, desc: "Never forgets a face or technique." },
    { name: "Fearless",             power: 8,  bountyMod: 1.10, govt: 5,  rarity: 0.28, desc: "Immune to intimidation." },
    { name: "Hotheaded",            power: 5,  bountyMod: 1.05, govt: 5,  rarity: 0.35, desc: "Rushes headlong into fights." },
    { name: "Lucky",                power: 10, bountyMod: 1.00, govt: 0,  rarity: 0.15, desc: "Improbable things work out." },
    { name: "Survivalist",          power: 8,  bountyMod: 1.05, govt: 0,  rarity: 0.22, desc: "Thrives in extreme conditions." },
    { name: "Iron Will",            power: 15, bountyMod: 1.15, govt: 5,  rarity: 0.18, desc: "Extraordinary pain tolerance." },
    { name: "Charismatic",          power: 5,  bountyMod: 1.10, govt: 0,  rarity: 0.22, desc: "Effortlessly persuasive." },
    { name: "Cowardly",             power: -8, bountyMod: 0.90, govt: -5, rarity: 0.20, desc: "Avoids danger — though it keeps them alive." }
  ,
    { id: 'disciplined', name: 'Disciplined', power: 2, bountyMod: 1.00, govt: 0, rarity: 0.30, desc: 'Keeps a training routine even when progress is slow.', description: 'Keeps a training routine even when progress is slow.', source: 'expanded', tags: ['common', 'temperament'] },
    { id: 'quick-learner', name: 'Quick Learner', power: 3, bountyMod: 1.00, govt: 0, rarity: 0.24, desc: 'Picks up practical lessons quickly from observation and repetition.', description: 'Picks up practical lessons quickly from observation and repetition.', source: 'expanded', tags: ['common', 'aptitude'] },
    { id: 'resourceful', name: 'Resourceful', power: 2, bountyMod: 1.00, govt: 0, rarity: 0.28, desc: 'Makes useful plans from limited supplies and imperfect information.', description: 'Makes useful plans from limited supplies and imperfect information.', source: 'expanded', tags: ['common', 'temperament'] },
    { id: 'seafaring-veteran', name: 'Seafaring Veteran', power: 4, bountyMod: 1.05, govt: 0, rarity: 0.16, desc: 'Has learned to stay useful during storms, shortages, and long voyages.', description: 'Has learned to stay useful during storms, shortages, and long voyages.', source: 'expanded', tags: ['common', 'sea'] },
    { id: 'steady-handed', name: 'Steady-Handed', power: 3, bountyMod: 1.00, govt: 0, rarity: 0.25, desc: 'Keeps control when precision matters under pressure.', description: 'Keeps control when precision matters under pressure.', source: 'expanded', tags: ['common', 'aptitude'] },
    { id: 'team-player', name: 'Team Player', power: 1, bountyMod: 1.05, govt: 0, rarity: 0.27, desc: 'Works well within a crew and makes dependable support decisions.', description: 'Works well within a crew and makes dependable support decisions.', source: 'expanded', tags: ['common', 'crew'] },
    { id: 'reckless', name: 'Reckless', power: 2, bountyMod: 1.03, govt: 2, rarity: 0.20, desc: 'Takes openings that a more cautious fighter would leave alone.', description: 'Takes openings that a more cautious fighter would leave alone.', source: 'expanded', tags: ['common', 'temperament'] },
    { id: 'observant', name: 'Observant', power: 3, bountyMod: 1.00, govt: 0, rarity: 0.24, desc: 'Notices details in people, terrain, and routine behavior.', description: 'Notices details in people, terrain, and routine behavior.', source: 'expanded', tags: ['common', 'aptitude'] },
    { id: 'patient', name: 'Patient', power: 1, bountyMod: 1.00, govt: 0, rarity: 0.30, desc: 'Waits for a safe opening instead of forcing every exchange.', description: 'Waits for a safe opening instead of forcing every exchange.', source: 'expanded', tags: ['common', 'temperament'] },
    { id: 'good-navigator', name: 'Good Navigator', power: 2, bountyMod: 1.00, govt: 0, rarity: 0.22, desc: 'Reads weather, currents, and charts with practical care.', description: 'Reads weather, currents, and charts with practical care.', source: 'expanded', tags: ['common', 'sea'] },
    { id: 'careful-craftsperson', name: 'Careful Craftsperson', power: 2, bountyMod: 1.00, govt: 0, rarity: 0.20, desc: 'Maintains equipment and notices small failures before they become disasters.', description: 'Maintains equipment and notices small failures before they become disasters.', source: 'expanded', tags: ['common', 'craft'] },
    { id: 'stubborn', name: 'Stubborn', power: 1, bountyMod: 1.01, govt: 0, rarity: 0.25, desc: 'Holds to a decision even when changing course would be easier.', description: 'Holds to a decision even when changing course would be easier.', source: 'expanded', tags: ['common', 'temperament'] }
  ]
;
  V4.database.traits = rawEntries.map(entry => ({ ...entry, id: entry.id || slug(entry.name), source: sourceFor(entry), description: entry.description || entry.desc, tags: entry.tags || [], conflicts: entry.conflicts || [] }));
}(window.OnePieceRollV4));


