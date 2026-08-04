/* Authoritative catalog API. Content modules register data; engines only query it. */
(function (V4) {
  'use strict';
  const catalog = V4.database.catalog = V4.database.catalog || {};
  const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const familyFor = weapon => weapon.type === 'sword' ? 'blade' : weapon.type === 'shoot' ? 'firearm' : weapon.name.includes('Dial') ? 'dial' : weapon.name.includes('Staff') ? 'staff' : 'martial-tool';
  const subtypeFor = weapon => weapon.name.includes('Katana') || ['Wado Ichimonji', 'Sandai Kitetsu', 'Enma', 'Shusui'].includes(weapon.name) ? 'katana' : weapon.type === 'sword' ? 'sword' : weapon.type === 'shoot' ? 'firearm' : familyFor(weapon);
  catalog.styleRequirements = {
    'One Sword Style': { family: 'blade', minimum: 1, maximum: 1 },
    'Two Sword Style': { family: 'blade', minimum: 2, maximum: 2 },
    'Three Sword Style': { family: 'blade', subtype: 'katana', minimum: 3, maximum: 3, specialUnlock: 'three-sword-training' },
    'Nine Sword Style': { family: 'blade', subtype: 'katana', minimum: 3, advancedState: true },
    'Kanabo Style': { family: 'club', subtype: 'kanabo', minimum: 1, maximum: 1 },
    'Dial Combat': { family: 'dial', minimum: 1, maximum: 2 },
    'Gun Kata': { family: 'firearm', minimum: 1, maximum: 2 }
  };
  catalog.normalizeWeapons = weapons => weapons.map(weapon => { const metadata = V4.database.weaponMetadata?.[weapon.name] || {}; return { ...weapon, ...metadata, id: weapon.id || slug(weapon.name), source: metadata.source || weapon.source || 'canon', family: metadata.family || weapon.family || familyFor(weapon), subtype: metadata.subtype || weapon.subtype || subtypeFor(weapon), tags: metadata.tags || weapon.tags || [weapon.type, familyFor(weapon)].filter(Boolean), unique: metadata.unique ?? weapon.unique ?? false, named: metadata.named ?? weapon.named ?? false, rarityClass: metadata.rarityClass || weapon.rarityClass || 'generic', acquisitionWeight: metadata.acquisitionWeight ?? weapon.acquisitionWeight ?? 1 }; });
  catalog.normalizeStyles = styles => styles.filter(style => style.name !== 'Nine Sword Style').map(style => {
    const metadata = V4.database.styleMetadata?.[style.name] || {};
    const progressionType = style.progressionType || (metadata.advancedState ? 'advanced-state' : style.baseRollable === false ? 'discipline' : 'foundation');
    return {
      ...style, ...metadata,
      id: style.id || slug(style.name),
      source: metadata.source || style.source || 'canon',
      progressionType,
      kind: style.kind || progressionType,
      foundation: style.foundation || style.parentIds?.[0] || style.id || slug(style.name),
      parentIds: style.parentIds || [],
      accessRequirements: style.accessRequirements || {},
      baseRollable: style.baseRollable ?? progressionType === 'foundation',
      weaponRequirements: style.weaponRequirements || metadata.weaponRequirements || catalog.styleRequirements[style.name] || null,
      tags: style.tags || [style.type, progressionType].filter(Boolean)
    };
  });
  catalog.registerExternal = function (weapons, styles) {
    const fallbackClassifications = {
      weapons: weapons.filter(weapon => !weapon.id || !weapon.source || !weapon.family || !weapon.subtype || !Array.isArray(weapon.tags) || !weapon.quality || weapon.handlingDifficulty === undefined).length,
      // `kind` and `foundation` are runtime aliases derived from the explicit
      // progression type and parent IDs. Do not report those deterministic
      // aliases as missing external classifications.
      styles: styles.filter(style => !style.id || !style.source || !style.progressionType || !Array.isArray(style.parentIds) || !Array.isArray(style.tags)).length
    };
    catalog.weapons = catalog.normalizeWeapons(weapons);
    catalog.styles = catalog.normalizeStyles(styles);
    catalog.authority = { weapons: 'external', styles: 'external', weaponEntries: catalog.weapons.length, styleEntries: catalog.styles.length, legacyFallbacks: 0, fallbackClassifications };
    return catalog;
  };
  catalog.queryWeapons = filter => (catalog.weapons || []).filter(filter || (() => true));
  catalog.getDatabase = name => V4.database[name] || [];
  catalog.getById = (name, id) => catalog.getDatabase(name).find(entry => entry.id === id) || null;
  catalog.query = (name, filter) => catalog.getDatabase(name).filter(filter || (() => true));
  catalog.bySource = (name, source='canon') => catalog.getDatabase(name).filter(entry => entry.source === source);
  catalog.validateAll = function () {
    const allowedSources = new Set(['canon', 'supplemental', 'anime', 'sbs', 'movie', 'game', 'expanded', 'fan']);
    const databases = ['weapons', 'styles', 'fruits', 'careerFruits', 'elements', 'sandboxPresets', 'mentors', 'races', 'traits', 'roles', 'reputations', 'accomplishments', 'destinies', 'tiers', 'characters', 'combatProfiles', 'techniques', 'organizations', 'relationships', 'locations', 'encounters'];
    const errors = [...catalog.validate()];
    for (const name of databases) {
      const ids = new Set();
      const fruitIdentities = new Set();
      const fruitMenus = new Set();
      for (const entry of catalog.getDatabase(name)) {
        if (!entry.id || ids.has(entry.id)) errors.push(`${name}: invalid or duplicate ID ${entry.id || entry.name}`);
        ids.add(entry.id);
        if (!entry.name) errors.push(`${name}: missing visible name for ${entry.id}`);
        if (!allowedSources.has(entry.source)) errors.push(`${name}: invalid source for ${entry.id}`);
        if ((name === 'fruits' || name === 'careerFruits' || name === 'mentors' || name === 'races' || name === 'traits' || name === 'roles' || name === 'reputations' || name === 'accomplishments' || name === 'destinies') && !(entry.description || entry.desc)) errors.push(`${name}: missing description for ${entry.id}`);
        if (name === 'fruits' || name === 'careerFruits') {
          const identity = entry.canonicalIdentity || `${String(entry.name).toLowerCase()}:${entry.source}`;
          const menu = `${String(entry.name).toLowerCase()}:${entry.source}`;
          if (fruitIdentities.has(identity)) errors.push(`fruits: duplicate canonical identity ${identity}`);
          if (fruitMenus.has(menu)) errors.push(`fruits: ambiguous same-name menu entry ${menu}`);
          fruitIdentities.add(identity); fruitMenus.add(menu);
          if (!entry.rarityTier || !Number.isFinite(entry.rollWeight) || entry.rollWeight < 0) errors.push(`fruits: invalid rarity weight ${entry.id}`);
          if (!Array.isArray(entry.elementTags) || !entry.elementTags.length) errors.push(`fruits: missing element profile ${entry.id}`);
        }
      }
    }
    const ids = name => new Set(catalog.getDatabase(name).map(entry => entry.id));
    const characters = ids('characters'), profiles = ids('combatProfiles'), techniques = ids('techniques'), organizations = ids('organizations'), styles = ids('styles'), fruits = new Set([...ids('fruits'), ...ids('careerFruits')]), weapons = ids('weapons');
    for (const mentor of catalog.getDatabase('mentors')) if (!mentor.characterId || !characters.has(mentor.characterId)) errors.push(`mentors: broken character link ${mentor.id}`);
    for (const character of catalog.getDatabase('characters')) if (character.combatProfileId) { if (!profiles.has(character.combatProfileId)) errors.push(`characters: invalid combat profile ${character.id}`); if (character.fruitId && !fruits.has(character.fruitId)) errors.push(`characters: invalid fruit ${character.id}`); for (const fruitId of character.secondaryFruitIds||[]) if (!fruits.has(fruitId)) errors.push(`characters: invalid secondary fruit ${character.id}:${fruitId}`); for (const weaponId of character.weaponIds||[]) if (!(catalog.weapons||[]).some(weapon=>weapon.id===weaponId)) errors.push(`characters: invalid weapon ${character.id}:${weaponId}`); for (const styleId of [...(character.foundationIds||[]), ...(character.disciplineIds||[])]) if (!styles.has(styleId)) errors.push(`characters: invalid style ${character.id}:${styleId}`); }
    for (const profile of catalog.getDatabase('combatProfiles')) { if (!characters.has(profile.characterId)) errors.push(`combatProfiles: broken character link ${profile.id}`); if (!['late-wano','wano-end'].includes(profile.spoilerEra)) errors.push(`combatProfiles: profile beyond spoiler boundary ${profile.id}`); if (profile.fruitId && !fruits.has(profile.fruitId)) errors.push(`combatProfiles: invalid fruit ${profile.id}`); for(const fruitId of profile.secondaryFruitIds||[]) if(!fruits.has(fruitId)) errors.push(`combatProfiles: invalid secondary fruit ${profile.id}:${fruitId}`); for(const weaponId of profile.weaponIds||[]) if(!(catalog.weapons||[]).some(weapon=>weapon.id===weaponId)) errors.push(`combatProfiles: invalid weapon ${profile.id}:${weaponId}`); for (const styleId of [...(profile.foundationIds||[]), ...(profile.disciplineIds||[])]) if (!styles.has(styleId)) errors.push(`combatProfiles: invalid style ${profile.id}:${styleId}`); }
    for (const technique of catalog.getDatabase('techniques')) { if (!technique.parentDisciplineIds?.some(id => styles.has(id) || id === 'armament-haki' || id === 'fish-man-karate')) errors.push(`techniques: invalid parent route ${technique.id}`); if (!Array.isArray(technique.unlockRoutes) || !technique.unlockRoutes.length || technique.unlockRoutes.some(route=>!['training','mentor','battle-insight'].includes(route))) errors.push(`techniques: invalid unlock route ${technique.id}`); }
    for (const organization of catalog.getDatabase('organizations')) { for (const member of organization.memberCharacterIds || []) if (!characters.has(member)) errors.push(`organizations: broken member ${organization.id}:${member}`); if (organization.leaderCharacterId && !characters.has(organization.leaderCharacterId)) errors.push(`organizations: broken leader ${organization.id}:${organization.leaderCharacterId}`); for (const organizationId of [...(organization.allyOrganizationIds||[]), ...(organization.rivalOrganizationIds||[])]) if (!organizations.has(organizationId)) errors.push(`organizations: broken organization link ${organization.id}:${organizationId}`); }
    for (const relationship of catalog.getDatabase('relationships')) if (!characters.has(relationship.subjectCharacterId) || !characters.has(relationship.objectCharacterId)) errors.push(`relationships: broken character link ${relationship.id}`);
    for (const location of catalog.getDatabase('locations')) { for (const id of location.characterEncounterIds || []) if (!characters.has(id)) errors.push(`locations: broken character ${location.id}:${id}`); for (const id of location.factionIds || []) if (!organizations.has(id)) errors.push(`locations: broken organization ${location.id}:${id}`); }
    for (const encounter of catalog.getDatabase('encounters')) { for (const id of encounter.characterIds || []) if (!characters.has(id)) errors.push(`encounters: broken character ${encounter.id}:${id}`); for (const id of encounter.organizationIds || []) if (!organizations.has(id)) errors.push(`encounters: broken organization ${encounter.id}:${id}`); }
    return errors;
  };
  catalog.authorityReport = function () {
    const weapons = catalog.weapons || [], styles = catalog.styles || [];
    const incompleteWeapons = weapons.filter(weapon => !weapon.id || !weapon.source || !weapon.family || !weapon.subtype || !Array.isArray(weapon.tags) || !weapon.quality || weapon.handlingDifficulty === undefined);
    const incompleteStyles = styles.filter(style => !style.id || !style.source || !style.kind || !style.foundation || !Array.isArray(style.tags));
    const names = ['fruits', 'careerFruits', 'elements', 'sandboxPresets', 'mentors', 'races', 'traits', 'roles', 'reputations', 'accomplishments', 'destinies', 'tiers', 'characters', 'combatProfiles', 'techniques', 'organizations', 'relationships', 'locations', 'encounters'];
    const databases = Object.fromEntries(names.map(name => [name, { authority: 'external', loaded: catalog.getDatabase(name).length, incomplete: catalog.getDatabase(name).filter(entry => !entry.id || !entry.source || !entry.name).length }]));
    const haki = V4.database.hakiDescriptions || {};
    const grades = V4.database.weaponGradeScores || {};
    const configurations = {
      hakiDescriptions: { authority: 'external', loaded: Object.keys(haki).length, incomplete: Object.keys(haki).length === 3 ? 0 : 1 },
      weaponGradeScores: { authority: 'external', loaded: Object.keys(grades).length, incomplete: Object.keys(grades).length === 4 ? 0 : 1 }
    };
    return { manifest: V4.database.manifest || null, weapons: { authority: 'external', loaded: weapons.length, incomplete: incompleteWeapons.length }, styles: { authority: 'external', loaded: styles.length, incomplete: incompleteStyles.length }, databases, configurations, legacyFallbacks: 0, fallbackClassifications: catalog.authority?.fallbackClassifications || { weapons: 0, styles: 0 }, catalogErrors: catalog.validateAll() };
  };
  catalog.validate = function () {
    const errors = [], weaponIds = new Set(), styleIds = new Set();
    const sources = new Set(['canon', 'supplemental', 'anime', 'movie', 'game', 'expanded', 'fan']);
    for (const weapon of catalog.weapons || []) {
      if (!weapon.id || weaponIds.has(weapon.id)) errors.push(`Invalid or duplicate weapon ID: ${weapon.id || weapon.name}`);
      weaponIds.add(weapon.id);
      if (!weapon.family || !weapon.subtype || !Array.isArray(weapon.tags)) errors.push(`Incomplete weapon classification: ${weapon.id}`);
      if (!weapon.quality || weapon.handlingDifficulty === undefined) errors.push(`Incomplete weapon quality data: ${weapon.id}`);
      if (!sources.has(weapon.source)) errors.push(`Invalid weapon source: ${weapon.id}`);
    }
    for (const style of catalog.styles || []) {
      if (!style.id || styleIds.has(style.id)) errors.push(`Invalid or duplicate style ID: ${style.id || style.name}`);
      styleIds.add(style.id);
      const req = style.weaponRequirements;
      if (req && (!Number.isInteger(req.minimum) || req.minimum < 1 || (req.maximum && req.maximum < req.minimum))) errors.push(`Invalid equipment requirement: ${style.id}`);
      if (style.advancedState) errors.push(`Advanced state leaked into base styles: ${style.id}`);
    }
    return errors;
  };
}(window.OnePieceRollV4));

