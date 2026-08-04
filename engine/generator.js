/* Orchestrates the fixed generation pipeline. Legacy remains the active adapter. */
(function (V4) {
  'use strict';
  const generator = V4.engines.generator = V4.engines.generator || {};
  generator.stages = generator.stages || [
    'seed', 'luck', 'destiny', 'mentor', 'race', 'physical', 'mental', 'willpower',
    'haki', 'fruit', 'awakening', 'weapon', 'style', 'traits', 'role', 'reputation',
    'accomplishments', 'compatibility', 'synergy', 'combat', 'threat', 'bounty', 'story'
  ];
  const tierThresholds = { 'Supernova':25, 'Rising Threat':40, 'Commander':55, 'Yonko Commander':70, 'Admiral-Class':85, 'Fleet Admiral':100, 'Emperor':120, 'Pirate King':150 };
  const tierFor = rating => (V4.database.tiers || []).reduce((best, tier) => rating >= tier.min ? tier : best, (V4.database.tiers || [])[0]);
  const hakiLabel = value => value >= 90 ? 'Advanced' : value >= 65 ? 'Strong' : value > 0 ? 'Basic' : 'None';
  const refreshDerived = character => {
    const combat = V4.engines.combat.calculate(character, V4.database.weaponGradeScores || {});
    character.combatRating = combat.rating; character.combatRatingRaw = combat.raw; character.combat = combat.breakdown;
    character.tier = tierFor(character.combatRating);
    if (V4.engines.threat?.calculate) character.threat = V4.engines.threat.calculate(character);
    if (V4.engines.bounty?.calculate) character.bounty = V4.engines.bounty.calculate(character);
    if (V4.engines.rarity?.analyze) character.rarity = V4.engines.rarity.analyze(character);
    if (V4.engines.marineReport?.create) character.marineReport = V4.engines.marineReport.create(character);
  };
  const developForAdventure = (character, target, reason, assisted = false) => {
    const floors = {
      'Supernova':[62,60,58,60,62,56,54,55], 'Rising Threat':[68,65,65,67,70,63,62,66],
      'Commander':[74,72,72,72,76,70,70,74], 'Yonko Commander':[82,80,80,80,84,78,78,82],
      'Admiral-Class':[90,88,88,88,92,86,86,90], 'Fleet Admiral':[91,89,89,89,93,87,87,91],
      'Emperor':[112,110,110,110,115,108,108,112], 'Pirate King':[130,128,128,128,134,126,126,132]
    }[target] || [62,60,58,60,62,56,54,55];
    const p = character.physical, m = character.mental;
    ['strength','speed','durability','stamina'].forEach((key, index) => p[key] = Math.max(p[key], floors[index]));
    p.recovery = Math.max(p.recovery, Math.round(floors[3] * .72));
    m.battleIQ = Math.max(m.battleIQ, floors[4]); m.creativity = Math.max(m.creativity, floors[5]); m.knowledge = Math.max(m.knowledge, floors[6]);
    character.willpower = Math.max(character.willpower, floors[7]);
    const hakiFloor = target === 'Supernova' ? 55 : target === 'Rising Threat' ? 60 : target === 'Commander' ? 70 : target === 'Yonko Commander' ? 80 : target === 'Admiral-Class' ? 90 : target === 'Fleet Admiral' ? 95 : target === 'Emperor' ? 105 : 120;
    character.haki.obs = Math.max(character.haki.obs, hakiFloor); character.haki.arm = Math.max(character.haki.arm, hakiFloor);
    character.haki.obsTier = hakiLabel(character.haki.obs); character.haki.armTier = hakiLabel(character.haki.arm);
    if (['Yonko Commander','Admiral-Class','Fleet Admiral','Emperor','Pirate King'].includes(target)) { character.haki.hasCoc = true; character.haki.coc = Math.max(character.haki.coc || 0, hakiFloor); character.haki.cocTier = hakiLabel(character.haki.coc); }
    if (['Admiral-Class','Fleet Admiral','Emperor','Pirate King'].includes(target)) { character.haki.hasAdvObs = true; character.haki.hasAdvArm = true; }
    if (['Emperor','Pirate King'].includes(target)) character.haki.hasAdvCoc = true;
    if (character.fruit) { const mastery={Supernova:.55,'Rising Threat':.60,Commander:.65,'Yonko Commander':.70,'Admiral-Class':.80,'Fleet Admiral':.85,Emperor:.90,'Pirate King':.95}[target] || .55; character.mastery = Math.max(character.mastery || 0, mastery); character.effectiveFruitPower = Math.round(character.fruit.power * character.mastery); }
    if (character.combatProgression?.foundation) character.combatProgression.foundation.mastery = Math.max(character.combatProgression.foundation.mastery || 0, target === 'Supernova' ? 70 : 92);
    character.adventureFate = { target, reason, assisted, appliedAtGeneration:true };
    refreshDerived(character);
    return character;
  };
  const naturalAdventurePackage = seed => {
    const value = (Math.imul((Number(seed) | 0) ^ 0x2c1b3c6d, 2246822519) >>> 0) / 4294967296;
    if (value < .000167) return { id:'world-shaking-natural', target:'Pirate King', assisted:false, reason:'A naturally world-shaking convergence of talent, will, and opportunity.' };
    if (value < .00038) return { id:'emperor-natural', target:'Emperor', assisted:false, reason:'A naturally exceptional Emperor-scale convergence.' };
    if (value < .00080) return { id:'fleet-natural', target:'Fleet Admiral', assisted:false, reason:'An extraordinarily rare Fleet Admiral-scale foundation.' };
    if (value < .00205) return { id:'admiral-natural', target:'Admiral-Class', assisted:false, reason:'An Admiral-class convergence of exceptional natural ability.' };
    if (value < .008) return { id:'yonko-commander-natural', target:'Yonko Commander', assisted:false, reason:'A rare commander-level convergence.' };
    if (value < .027) return { id:'commander-natural', target:'Commander', assisted:false, reason:'A high-quality Commander candidate emerges.' };
    if (value < .075) return { id:'rising-natural', target:'Rising Threat', assisted:false, reason:'A rising legend shows an unusually complete foundation.' };
    return null;
  };
  generator.generate = function (overrides, seed, options) {
    if (typeof V4.legacy.generateCharacter !== 'function') {
      throw new Error('The legacy generator is not registered. Load the V4 bridge before generating.');
    }
    const config = options || {};
    const requested = overrides || {};
    const mode = requested.generationMode || config.generationMode || 'standard-adventure';
    const cleanOverrides = { ...requested }; delete cleanOverrides.generationMode; delete cleanOverrides.voyageLuck;
    const character = V4.legacy.generateCharacter(cleanOverrides, seed);
    character.generationMode = mode === 'brutal-grand-line' ? 'brutal-grand-line' : 'standard-adventure';
    character.creation = character.creation || {
      origin: character.generationMode === 'brutal-grand-line' ? 'brutal' : 'standard',
      rollMode: character.generationMode,
      presetId: null,
      modifiedFromPreset: false,
      directlySelectedFields: [],
      guaranteedFields: [],
      automaticallyAdjustedFields: [],
      hypotheticalNaturalEstimateAllowed: true
    };
    character.meta = { ...(character.meta || {}), generationMode: character.generationMode };
    const luckState = requested.voyageLuck || config.voyageLuck;
    const luckPackage = character.generationMode === 'standard-adventure' ? V4.engines.voyageLuck?.packageFor(character.seed, luckState) : null;
    const packageResult = luckPackage || (character.generationMode === 'standard-adventure' ? naturalAdventurePackage(character.seed) : null);
    if (packageResult) developForAdventure(character, packageResult.target, packageResult.reason, !!packageResult.assisted);
    character.voyageLuckContribution = packageResult ? { ...packageResult, stateAtRoll:{ rollStreak:luckState?.rollStreak || 0, pirateKingStreak:luckState?.pirateKingStreak || 0 } } : null;
    if (V4.engines.rarity?.analyze) character.rarity = V4.engines.rarity.analyze(character);
    // Career state is additive metadata; it does not participate in any roll
    // or recalculate the generated identity.
    if (V4.engines.career?.ensure) V4.engines.career.ensure(character);
    return character;
  };
}(window.OnePieceRollV4));

