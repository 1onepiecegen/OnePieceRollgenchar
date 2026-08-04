/* Authoritative destinies database. */
(function (V4) {
  'use strict';
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sourceFor = entry => entry.source || 'expanded';
  const rawEntries = [
    { name: "Inherited Will",          desc: "Carries forward someone else's unfinished dream.",                    bountyMult: 1.20, combatMult: 1.05 },
    { name: "Chosen by Fate",          desc: "Keeps ending up where history is about to be made.",                  bountyMult: 1.15, combatMult: 1.05, luckBonus: 15 },
    { name: "Natural Monster",         desc: "Physically operates on a different scale.",                           bountyMult: 1.10, combatMult: 1.15 },
    { name: "Legendary Bloodline",     desc: "Descended from a figure whose name echoes through the Grand Line.",   bountyMult: 1.25, combatMult: 1.05 },
    { name: "World Government Target", desc: "Marked for elimination at the highest levels.",                       bountyMult: 1.30, combatMult: 1.0 },
    { name: "Battle Prodigy",          desc: "Learned in years what most need a lifetime to grasp.",                bountyMult: 1.10, combatMult: 1.12 },
    { name: "Natural Genius",          desc: "Grasps complex techniques almost on first contact.",                  bountyMult: 1.10, combatMult: 1.05, fruitCompatBonus: 20 }
  ]
;
  V4.database.destinies = rawEntries.map(entry => ({ ...entry, id: entry.id || slug(entry.name), source: sourceFor(entry), description: entry.description || entry.desc, tags: entry.tags || [] }));
}(window.OnePieceRollV4));

