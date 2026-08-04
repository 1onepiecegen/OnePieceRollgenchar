/* Authoritative reputations database. */
(function (V4) {
  'use strict';
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sourceFor = entry => entry.source || 'expanded';
  const rawEntries = [
    { name: "Government Enemy",    bountyMod: 1.40, desc: "Directly opposes the World Government." },
    { name: "Marine Killer",       bountyMod: 1.35, desc: "Actively hunts Marines." },
    { name: "Heroic Protector",    bountyMod: 0.80, desc: "Beloved by civilians." },
    { name: "Cruel Destroyer",     bountyMod: 1.30, desc: "Leaves devastation behind." },
    { name: "Chaotic Neutral",     bountyMod: 1.00, desc: "Does whatever serves their goals." },
    { name: "Pirate Hunter",       bountyMod: 0.50, desc: "Hunts other pirates." },
    { name: "Revolutionary Threat",bountyMod: 1.50, desc: "Works to topple the WG." },
    { name: "Underworld Broker",   bountyMod: 1.20, desc: "Deals in weapons and secrets." },
    { name: "Benevolent Pirate",   bountyMod: 0.90, desc: "Targets only pirates and corrupt officials." },
    { name: "Phantom",             bountyMod: 1.10, desc: "Rarely seen, impossible to track." }
  ,
    { id: 'local-nuisance', name: 'Local Nuisance', bountyMod: 0.70, desc: 'Known for small disruptions around one port or island.', description: 'Known for small disruptions around one port or island.', source: 'expanded', tags: ['low-profile', 'common'] },
    { id: 'rookie-pirate', name: 'Rookie Pirate', bountyMod: 0.85, desc: 'A new pirate with limited notoriety beyond nearby waters.', description: 'A new pirate with limited notoriety beyond nearby waters.', source: 'expanded', tags: ['low-profile', 'common'] },
    { id: 'known-smuggler', name: 'Known Smuggler', bountyMod: 1.10, desc: 'Moves illicit cargo and knows which routes avoid inspection.', description: 'Moves illicit cargo and knows which routes avoid inspection.', source: 'expanded', tags: ['mid-profile', 'underworld'] },
    { id: 'independent-adventurer', name: 'Independent Adventurer', bountyMod: 0.75, desc: 'Travels for discovery and profit without a major criminal profile.', description: 'Travels for discovery and profit without a major criminal profile.', source: 'expanded', tags: ['low-profile', 'common'] },
    { id: 'local-hero', name: 'Local Hero', bountyMod: 0.75, desc: 'Well regarded by one community for protecting people in need.', description: 'Well regarded by one community for protecting people in need.', source: 'expanded', tags: ['low-profile', 'civilian'] },
    { id: 'minor-marine-concern', name: 'Minor Marine Concern', bountyMod: 1.05, desc: 'Flagged by local Marines as a repeat but manageable problem.', description: 'Flagged by local Marines as a repeat but manageable problem.', source: 'expanded', tags: ['mid-profile', 'marine'] },
    { id: 'treasure-seeker', name: 'Treasure Seeker', bountyMod: 0.90, desc: 'Chases valuable ruins and maps without seeking open conflict.', description: 'Chases valuable ruins and maps without seeking open conflict.', source: 'expanded', tags: ['low-profile', 'adventure'] },
    { id: 'infamous-duelist', name: 'Infamous Duelist', bountyMod: 1.10, desc: 'Known across a few ports for public challenges and dangerous fights.', description: 'Known across a few ports for public challenges and dangerous fights.', source: 'expanded', tags: ['mid-profile', 'combat'] },
    { id: 'quiet-traveler', name: 'Quiet Traveler', bountyMod: 0.80, desc: 'Moves between islands without seeking attention or public conflict.', description: 'Moves between islands without seeking attention or public conflict.', source: 'expanded', tags: ['low-profile', 'common'] },
    { id: 'harbor-helper', name: 'Harbor Helper', bountyMod: 0.75, desc: 'Known locally for helping crews and civilians during difficult arrivals.', description: 'Known locally for helping crews and civilians during difficult arrivals.', source: 'expanded', tags: ['low-profile', 'civilian'] },
    { id: 'reckless-rookie', name: 'Reckless Rookie', bountyMod: 0.95, desc: 'A new arrival whose impulsive stunts have attracted local attention.', description: 'A new arrival whose impulsive stunts have attracted local attention.', source: 'expanded', tags: ['low-profile', 'common'] }
  ]
;
  V4.database.reputations = rawEntries.map(entry => ({ ...entry, id: entry.id || slug(entry.name), source: sourceFor(entry), description: entry.description || entry.desc, tags: entry.tags || [] }));
}(window.OnePieceRollV4));

