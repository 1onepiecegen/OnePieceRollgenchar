/* Authoritative accomplishments database. */
(function (V4) {
  'use strict';
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sourceFor = entry => entry.source || 'expanded';
  const rawEntries = [
    { text: "Destroyed a Marine base", govt: 30 },
    { text: "Defeated a Vice Admiral", govt: 45 },
    { text: "Escaped Impel Down", govt: 40 },
    { text: "Attacked a Celestial Dragon", govt: 65 },
    { text: "Protected an entire kingdom", govt: 10 },
    { text: "Wiped out a rival crew", govt: 15 },
    { text: "Publicly humiliated a Warlord", govt: 35 },
    { text: "Uncovered WG secrets", govt: 55 },
    { text: "Survived a Buster Call", govt: 45 },
    { text: "Allied with the Revolutionary Army", govt: 50 },
    { text: "Sank a Marine warship", govt: 25 },
    { text: "Rescued slaves from an auction house", govt: 30 },
    { text: "Discovered a lost Poneglyph", govt: 35 }
  ,
    { id: 'won-local-pirate-duel', text: 'Won a local pirate duel', name: 'Won a local pirate duel', govt: 4, source: 'expanded', description: 'Won a public fight against a minor pirate.', tags: ['low-impact', 'combat'] },
    { id: 'escorted-civilians-dangerous-waters', text: 'Escorted civilians through dangerous waters', name: 'Escorted civilians through dangerous waters', govt: 2, source: 'expanded', description: 'Guided civilians safely through a known hazard.', tags: ['low-impact', 'civilian'] },
    { id: 'stole-corrupt-outpost-supplies', text: 'Stole supplies from a corrupt outpost', name: 'Stole supplies from a corrupt outpost', govt: 8, source: 'expanded', description: 'Took supplies from a corrupt local authority.', tags: ['low-impact', 'government'] },
    { id: 'defeated-minor-pirate-captain', text: 'Defeated a minor pirate captain', name: 'Defeated a minor pirate captain', govt: 8, source: 'expanded', description: 'Defeated a small-crew captain without major world attention.', tags: ['low-impact', 'combat'] },
    { id: 'escaped-marine-patrol', text: 'Escaped a Marine patrol', name: 'Escaped a Marine patrol', govt: 6, source: 'expanded', description: 'Evaded a routine local Marine patrol.', tags: ['low-impact', 'marine'] },
    { id: 'charted-hazardous-route', text: 'Charted a hazardous route', name: 'Charted a hazardous route', govt: 3, source: 'expanded', description: 'Mapped a dangerous passage valuable to sailors.', tags: ['low-impact', 'navigation'] },
    { id: 'recovered-stolen-map', text: 'Recovered a stolen map', name: 'Recovered a stolen map', govt: 2, source: 'expanded', description: 'Recovered a map before it could be used by criminals.', tags: ['low-impact', 'civilian'] },
    { id: 'defended-village-raiders', text: 'Defended a village from raiders', name: 'Defended a village from raiders', govt: 4, source: 'expanded', description: 'Helped a community repel a small raiding force.', tags: ['low-impact', 'civilian'] },
    { id: 'smuggled-medicine-blockade', text: 'Smuggled medicine through a blockade', name: 'Smuggled medicine through a blockade', govt: 10, source: 'expanded', description: 'Broke a blockade to deliver needed medicine.', tags: ['mid-impact', 'government'] },
    { id: 'survived-grand-line-storm', text: 'Survived a Grand Line storm', name: 'Survived a Grand Line storm', govt: 5, source: 'expanded', description: 'Survived a severe Grand Line storm with a crew intact.', tags: ['low-impact', 'sea'] },
    { id: 'captured-wanted-pirate', text: 'Captured a wanted pirate', name: 'Captured a wanted pirate', govt: 3, source: 'expanded', description: 'Brought in a minor wanted pirate.', tags: ['low-impact', 'marine'] },
    { id: 'repaired-storm-damaged-ship', text: 'Repaired a storm-damaged ship', name: 'Repaired a storm-damaged ship', govt: 2, source: 'expanded', description: 'Kept a damaged vessel afloat long enough to reach safety.', tags: ['low-impact', 'craft'] },
    { id: 'won-island-festival-contest', text: 'Won an island festival contest', name: 'Won an island festival contest', govt: 1, source: 'expanded', description: 'Earned local recognition through a public contest rather than a major crime.', tags: ['low-impact', 'civilian'] },
    { id: 'delivered-emergency-supplies', text: 'Delivered emergency supplies', name: 'Delivered emergency supplies', govt: 2, source: 'expanded', description: 'Brought food or medicine to an isolated settlement during a shortage.', tags: ['low-impact', 'civilian'] },
    { id: 'evaded-pirate-ambush', text: 'Evaded a pirate ambush', name: 'Evaded a pirate ambush', govt: 3, source: 'expanded', description: 'Escaped a planned attack through careful sailing or quick decisions.', tags: ['low-impact', 'sea'] }
  ]
;
  V4.database.accomplishments = rawEntries.map(entry => ({ ...entry, id: entry.id || slug(entry.text || entry.name), name: entry.name || entry.text, source: sourceFor(entry), description: entry.description || entry.text, tags: entry.tags || [] }));
}(window.OnePieceRollV4));

