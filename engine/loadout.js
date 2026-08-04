/* Requirement-driven equipment. Normalizes legacy data for incremental migration. */
(function (V4) {
  'use strict';
  const loadout = V4.engines.loadout = V4.engines.loadout || {};
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const requirements = {
    'One Sword Style': { type: 'sword', min: 1, max: 1 },
    'Two Sword Style': { type: 'sword', min: 2, max: 2 },
    'Three Sword Style': { type: 'sword', min: 3, max: 3, rare: true },
    'Nine Sword Style': { type: 'sword', min: 3, max: 3, advanced: true },
    'Kanabo Style': { name: 'Hassaikai', min: 1, max: 1 },
    'Dial Combat': { tag: 'dial', min: 1, max: 2 },
    'Gun Kata': { type: 'shoot', min: 1, max: 2 }
  };
  loadout.requirementsFor = style => {
    if (!style) return null;
    return style.weaponRequirements || V4.database.catalog?.styleRequirements?.[style.name] || requirements[style.name] || null;
  };
  loadout.classify = weapon => ({ ...weapon, family: weapon.family || (weapon.type === 'sword' ? 'blade' : weapon.type === 'shoot' ? 'firearm' : weapon.name.includes('Dial') ? 'dial' : 'martial-tool'), tags: weapon.tags || [weapon.type, weapon.name.includes('Dial') ? 'dial' : ''].filter(Boolean) });
  loadout.techniqueAttributes = c => ({ coordination: clamp(c.physical.speed * .35 + c.mental.battleIQ * .3 + c.mental.creativity * .2 + c.willpower * .15, 1, 100), jawStrength: clamp(c.physical.strength * .55 + c.physical.durability * .25 + c.willpower * .2, 1, 100) });
  loadout.canTrainThreeSword = c => c.mentor.name === 'Roronoa Zoro' && c.physical.strength >= 70 && c.physical.stamina >= 65 && c.willpower >= 70 && loadout.techniqueAttributes(c).coordination >= 78 && loadout.techniqueAttributes(c).jawStrength >= 78;
  loadout.isStyleCompatible = (style, c) => {
    const req = loadout.requirementsFor(style); if (!req) return true;
    if (req.advanced) return false;
    if (!c.weapon) return false;
    if (req.type && c.weapon.type !== req.type) return false;
    if (req.family && c.weapon.family !== req.family) return false;
    if (req.subtype && c.weapon.subtype !== req.subtype) return false;
    if (req.name && c.weapon.name !== req.name) return false;
    if (req.tag && !c.weapon.name.includes('Dial')) return false;
    if (req.rare && !loadout.canTrainThreeSword(c)) return false;
    return true;
  };
  loadout.create = (rng, c) => {
    const req = loadout.requirementsFor(c.style); const primary = c.weapon ? loadout.classify(c.weapon) : null;
    if (!req || !primary) return { primary, weapons: primary ? [primary] : [], weaponCount: primary ? 1 : 0, validForStyle: !req };
    const weapons = [primary]; const pool = (V4.database.catalog?.weapons || V4.database.weapons || []).filter(w => loadout.isStyleCompatible({ name: c.style.name }, { ...c, weapon: w }));
    while (weapons.length < req.minimum && pool.length) { const choices = pool.filter(w => !weapons.some(owned => owned.id === w.id)); if (!choices.length) break; weapons.push(loadout.classify(rng.pick(choices))); }
    return { primary: weapons[0] || null, weapons, weaponCount: weapons.length, family: weapons[0]?.family || null, validForStyle: weapons.length >= req.minimum };
  };
  loadout.generateForStyle = (rng, c) => {
    const req = loadout.requirementsFor(c.style);
    if (!req) return { primary: null, weapons: [], weaponCount: 0, family: null, validForStyle: true };
    const pool = (V4.database.catalog?.weapons || []).filter(weapon => (!req.family || weapon.family === req.family) && (!req.subtype || weapon.subtype === req.subtype) && (!req.names || req.names.includes(weapon.name)));
    const weapons = [];
    while (weapons.length < req.minimum && pool.length) { const choices = pool.filter(weapon => !weapon.unique || !weapons.some(owned => owned.id === weapon.id)); if (!choices.length) break; weapons.push(rng.weightedPick(choices, weapon => weapon.acquisitionWeight ?? 1)); }
    return { primary: weapons[0] || null, weapons, weaponCount: weapons.length, family: weapons[0]?.family || null, validForStyle: weapons.length >= req.minimum };
  };
}(window.OnePieceRollV4));

