/* Authoritative races database. */
(function (V4) {
  'use strict';
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sourceFor = entry => entry.source || 'canon';
  const rawEntries = [
    { name: "Human",           physMod: 0,  spdMod: 0,  durMod: 0,  staMod: 0,  recMod: 0,   weight: 30, threat: 1.0, strengths: ["No hard ceiling on growth.", "Broadly adaptable to any fighting style."], weaknesses: ["No innate physical edge.", "Must out-train natural talent."], desc: "Standard potential. The most common race in the world." },
    { name: "Fishman",         physMod: 10, spdMod: 5,  durMod: 5,  staMod: 5,  recMod: 10,  weight: 12, threat: 1.2, strengths: ["Ten times human strength underwater.", "Breathes underwater."], weaknesses: ["Devil Fruit powers become a liability near open water.", "Faces deep-seated prejudice."], desc: "Aquatic humanoids with immense natural strength." },
    { name: "Mink",            physMod: 5,  spdMod: 10, durMod: 5,  staMod: 5,  recMod: 5,   weight: 10, threat: 1.25, strengths: ["Natural Electro generation.", "Sulong form under full moon."], weaknesses: ["Sulong strips rational control.", "Below-average raw durability."], desc: "Humanoid animals from Zou with innate combat abilities." },
    { name: "Giant",           physMod: 20, spdMod: -5, durMod: 15, staMod: 10, recMod: 5,   weight: 5,  threat: 1.4, strengths: ["Colossal raw strength and durability.", "Centuries-long lifespan."], weaknesses: ["Below-average speed and agility.", "Massive size makes an unmissable target."], desc: "Colossal warriors from Elbaf." },
    { name: "Lunarian",        physMod: 10, spdMod: 5,  durMod: 20, staMod: 5,  recMod: 10,  weight: 1,  threat: 1.6, strengths: ["Invulnerable while flame is active.", "Wings grant true flight."], weaknesses: ["Nearly extinct — no training lineage.", "Sustaining flame is exhausting."], desc: "Near-extinct winged 'gods'." },
    { name: "Skypiean",        physMod: 0,  spdMod: 5,  durMod: 0,  staMod: 0,  recMod: 0,   weight: 8,  threat: 1.0, strengths: ["Wings aid aerial mobility.", "Deep affinity for Dial technology."], weaknesses: ["Little exposure to Blue Sea combat.", "No inherent physical edge."], desc: "Sky Island dwellers with rich Dial technology." },
    { name: "Longarm",         physMod: 5,  spdMod: 0,  durMod: 0,  staMod: 0,  recMod: 0,   weight: 10, threat: 1.1, strengths: ["Extra joints enable whip-like strikes.", "Excellent at grappling from distance."], weaknesses: ["Lower structural arm strength.", "Awkward at close brawling."], desc: "Humans with two elbow joints per arm." },
    { name: "Longleg",         physMod: 0,  spdMod: 5,  durMod: 5,  staMod: 5,  recMod: 0,   weight: 10, threat: 1.1, strengths: ["Incredibly powerful legs and kicks.", "Superior ground-covering speed."], weaknesses: ["Weak upper-body strength.", "Balance exploitable by sweeping attacks."], desc: "Humans with massive, powerful legs." },
    { name: "Three-Eye Tribe", physMod: 0,  spdMod: 0,  durMod: 0,  staMod: 0,  recMod: 0,   weight: 3,  threat: 1.2, strengths: ["Dormant third eye can read Poneglyphs.", "Heightened perception."], weaknesses: ["Draws dangerous attention from the WG.", "No physical combat advantage."], desc: "A rare bloodline with a third eye." },
    { name: "Oni",             physMod: 15, spdMod: 0,  durMod: 15, staMod: 10, recMod: 10,  weight: 3,  threat: 1.5, strengths: ["Monstrous natural durability and strength.", "Legendary vitality."], weaknesses: ["Distinctive horns invite fear.", "Below-average agility."], desc: "Horned giants of legendary vitality." },
    { name: "Cyborg",          physMod: 10, spdMod: 5,  durMod: 10, staMod: 5,  recMod: -5,  weight: 5,  threat: 1.2, strengths: ["Can integrate weapons into the body.", "Mechanical parts upgradable."], weaknesses: ["Vulnerable to water damage.", "Requires ongoing maintenance."], desc: "Mechanically enhanced beings." },
    { name: "Half-Giant",      physMod: 10, spdMod: 0,  durMod: 10, staMod: 5,  recMod: 5,   weight: 5,  threat: 1.3, strengths: ["Great size without full Giant slowness.", "Bridges human agility with Giant power."], weaknesses: ["Falls short of a full Giant's output.", "Caught between two worlds."], desc: "Hybrids boasting real size and strength." }
  ]
;
  V4.database.races = rawEntries.map(entry => ({ ...entry, id: entry.id || slug(entry.name), source: sourceFor(entry), description: entry.description || entry.desc, tags: entry.tags || [slug(entry.name)], modifiers: entry.modifiers || { strength: entry.strMod || 0, speed: entry.spdMod || 0, durability: entry.durMod || 0, stamina: entry.staMod || 0, recovery: entry.recMod || 0, potential: entry.potMod || 0 }, rollWeight: entry.rollWeight ?? 1 }));
}(window.OnePieceRollV4));


