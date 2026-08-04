/* Ordered, data-driven synergy rules. Keep rule order stable for reproducible logs. */
(function (V4) {
  'use strict';
  const synergy = V4.engines.synergy = V4.engines.synergy || {};
  const rule = function (id, category, bonus, text, condition) {
    return { id: id, category: category, bonus: bonus, text: text, condition: condition };
  };
  const hasFoundation = (c, id) => V4.engines.progression?.hasFoundation(c, id) || false;
  const hasDiscipline = (c, id) => V4.engines.progression?.hasDiscipline(c, id) || false;
  const hasAdvancedState = (c, id) => V4.engines.progression?.hasAdvancedState(c, id) || false;

  synergy.rules = [
    rule('jinbe_fishman_karate', 'mentor', 18, 'Fishman Karate Legacy - trained by the master himself.', c => c.mentor.name === 'Jinbe' && hasDiscipline(c, 'fishman-karate')),
    rule('sanji_black_leg', 'mentor', 16, 'Black Leg Transmission - the true form of the style.', c => c.mentor.name === 'Sanji' && hasDiscipline(c, 'black-leg-style')),
    rule('zeff_black_leg', 'mentor', 14, 'Red Leg Foundation - learned from the original.', c => c.mentor.name === 'Zeff' && hasDiscipline(c, 'black-leg-style')),
    rule('zoro_sword', 'mentor', 15, "Pirate Hunter's Path - swordsmanship under Zoro.", c => c.mentor.name === 'Roronoa Zoro' && hasFoundation(c, 'swordsmanship')),
    rule('mihawk_sword', 'mentor', 18, "World's Strongest Blade Guidance.", c => c.mentor.name === 'Dracule Mihawk' && hasFoundation(c, 'swordsmanship')),
    rule('oden_sword', 'mentor', 16, "Oden's Two-Sword Spirit.", c => c.mentor.name === 'Kozuki Oden' && hasFoundation(c, 'swordsmanship')),
    rule('rayleigh_advanced_haki', 'mentor', 20, "Dark King's Advanced Haki Tutelage.", c => c.mentor.name === 'Silvers Rayleigh' && (c.haki.hasAdvObs || c.haki.hasAdvArm || c.haki.hasAdvCoc)),
    rule('garp_physical', 'mentor', 14, 'Fist of Love Training - pure physical monster.', c => c.mentor.name === 'Monkey D. Garp' && !c.fruit && c.physical.strength > 80),
    rule('enel_goro', 'mentor', 15, "God's Lightning - same fruit, perfected.", c => c.mentor.name === 'Enel' && c.fruit && c.fruit.name.includes('Goro')),
    rule('katakuri_future_sight', 'mentor', 16, 'Future Sight Lineage - taught by the master of prediction.', c => c.mentor.name === 'Charlotte Katakuri' && c.haki.hasAdvObs),
    rule('lucci_rokushiki', 'mentor', 17, 'CP9 Assassination Arts.', c => c.mentor.name === 'Rob Lucci' && hasDiscipline(c, 'rokushiki')),
    rule('kaku_rokushiki', 'mentor', 12, 'Rankyaku Specialist Training.', c => c.mentor.name === 'Kaku' && hasDiscipline(c, 'rokushiki')),
    rule('jinbe_fishman', 'mentor', 12, 'Fishman Pride - racial + mentor synergy.', c => c.mentor.name === 'Jinbe' && c.race.name === 'Fishman'),
    rule('arlong_fishman', 'mentor', 10, "Arlong's Brutal School.", c => c.mentor.name === 'Arlong' && c.race.name === 'Fishman'),
    rule('king_lunarian', 'mentor', 14, 'Lunarian Bloodline Guidance.', c => c.mentor.name === 'King' && c.race.name === 'Lunarian'),
    rule('medical_mentor', 'mentor', 10, 'Medical Mentorship.', c => c.mentor.spec.includes('medicine') && c.role.name === 'Doctor'),
    rule('science_mentor', 'mentor', 10, 'Scientific Mentorship.', c => c.mentor.spec.includes('science') && c.role.name === 'Scientist'),
    rule('cooking_mentor', 'mentor', 10, 'Culinary Mentorship.', c => c.mentor.spec.includes('cooking') && c.role.name === 'Cook'),
    rule('legendary_conqueror', 'haki', 12, "Conqueror's Spark - legendary will ignited their own.", c => c.mentor.tier === 'legendary' && c.haki.hasCoc),
    rule('legendary_potential', 'mentor', 10, 'Ceiling Raised - trained by a living legend.', c => c.mentor.tier === 'legendary' && c.physical.potential > 75),
    rule('enma_armament', 'weapon', 18, "Enma's Demand - the blade forces out powerful Armament.", c => c.weapon && c.weapon.name === 'Enma' && c.haki.arm > 70),
    rule('enma_advanced_armament', 'weapon', 12, 'Mastered the Cursed Blade - Advanced Armament tames Enma.', c => c.weapon && c.weapon.name === 'Enma' && c.haki.hasAdvArm),
    rule('yoru_mihawk', 'weapon', 20, 'Black Blade Inheritance - trained under the true master of Yoru.', c => c.weapon && c.weapon.name === 'Yoru' && c.mentor.name === 'Dracule Mihawk'),
    rule('wado_zoro', 'weapon', 12, 'Inherited Will of the Sword.', c => c.weapon && c.weapon.name === 'Wado Ichimonji' && c.mentor.name === 'Roronoa Zoro'),
    rule('hassaikai_strength', 'weapon', 14, 'Kanabo Mastery - raw strength matches the weapon demands.', c => c.weapon && c.weapon.name === 'Hassaikai' && c.physical.strength > 85),
    rule('kikoku_ope', 'weapon', 15, 'Room & Nodachi - perfect synergy with spatial abilities.', c => c.weapon && c.weapon.name === 'Kikoku' && c.fruit && c.fruit.name.includes('Ope')),
    rule('supreme_advanced_armament', 'weapon', 12, 'Supreme Blade Resonance - Advanced Armament unlocks true potential.', c => c.weapon && c.weapon.grade === 'Supreme' && c.haki.hasAdvArm),
    rule('supreme_low_strength', 'weapon', -15, 'Overwhelmed by the Blade - lacks the strength to control a Supreme weapon.', c => c.weapon && c.weapon.grade === 'Supreme' && c.physical.strength < 50),
    rule('kitetsu_willpower', 'weapon', 10, 'Cursed Blade Acceptance - strong will keeps the curse in check.', c => c.weapon && c.weapon.name.includes('Kitetsu') && c.willpower > 75),
    rule('kitetsu_low_willpower', 'weapon', -12, 'Cursed Influence - weak will struggles against the Kitetsu hunger.', c => c.weapon && c.weapon.name.includes('Kitetsu') && c.willpower < 40),
    rule('elite_blade_tutelage', 'mentor', 10, 'Elite Blade Tutelage - a top-tier sword mentor sharpened their technique.', c => c.weapon && c.weapon.type === 'sword' && c.mentor.spec.includes('sword') && c.mentor.combat.sword >= 25),
    rule('three_sword_foundation', 'style', 10, 'Three Sword Foundation.', c => hasDiscipline(c, 'three-sword-style') && c.weapon && c.weapon.type === 'sword'),
    rule('asura_conquerors', 'style', 16, "Asura Manifestation - Conqueror's Haki fuels the ethereal blades.", c => hasAdvancedState(c, 'asura-nine-sword') && c.haki.hasCoc),
    rule('hassaikai_style', 'style', 14, 'True Kanabo Fighting.', c => hasDiscipline(c, 'kanabo-style') && c.weapon && c.weapon.name === 'Hassaikai'),
    rule('dial_combat', 'style', 12, 'Sky Island Weapon Mastery.', c => hasDiscipline(c, 'dial-combat') && c.weapon && c.weapon.name.includes('Dial')),
    rule('sword_mentor_weapon', 'mentor', 15, 'Master Swordsman Lineage - mentor blade philosophy lives on.', c => c.weapon && c.weapon.type === 'sword' && c.mentor.spec.includes('sword')),
    rule('brawl_mentor_weapon', 'mentor', 12, 'Brawler Heritage - mentor raw fighting spirit passed down.', c => c.weapon && c.weapon.type === 'brawl' && c.mentor.spec.includes('brawl')),
    rule('haki_mentor', 'mentor', 18, 'Elite Haki Mentorship - guidance compounded natural talent.', c => c.mentor.spec.includes('haki') && (c.haki.obsTier === 'Advanced' || c.haki.armTier === 'Advanced')),
    rule('fruit_mentor', 'fruit', 12, 'Guided Fruit Development - mentor helped unlock the fruit early.', c => c.mentor.spec.includes('df') && c.hasFruit),
    rule('science_fruit', 'fruit', 8, 'Scientific Fruit Analysis - mentor knowledge accelerated understanding.', c => c.mentor.spec.includes('science') && c.hasFruit),
    rule('weapon_style_alignment', 'style', 12, 'Weapon & Style Synergy - weapon and style reinforce each other.', c => c.weapon && c.weapon.type === c.style.type),
    rule('pure_haki_specialist', 'haki', 25, 'Pure Haki Specialist - no fruit to lean on, Haki honed to a razor edge.', c => !c.hasFruit && c.haki.obsTier !== 'None' && c.haki.armTier !== 'None' && c.haki.hasCoc),
    rule('haki_focused', 'haki', 10, 'Haki-Focused Fighter - relies on Haki without a Devil Fruit crutch.', c => !c.hasFruit && c.haki.obsTier !== 'None' && c.haki.armTier !== 'None' && !c.haki.hasCoc),
    rule('genius_difficult_fruit', 'fruit', 20, 'Genius Fruit Exploitation - sharp mind unlocks a difficult fruit.', c => c.hasFruit && c.mental.battleIQ > 80 && c.fruit.diff > 70),
    rule('creative_fruit', 'fruit', 12, 'Creative Versatility - imagination unleashes the fruit full potential.', c => c.hasFruit && c.mental.creativity > 80 && c.fruit.vers > 80),
    rule('giant_brawler', 'race', 12, 'Giant Brawler - raw Giant strength suits unrefined fighting.', c => c.race.name === 'Giant' && c.style.type === 'brawl'),
    rule('fishman_karate', 'race', 18, 'Racial Martial Art - second nature to a Fishman.', c => c.race.name === 'Fishman' && hasDiscipline(c, 'fishman-karate')),
    rule('mink_electro', 'race', 15, 'Natural Electro - Mink innate power supercharges this style.', c => c.race.name === 'Mink' && hasDiscipline(c, 'electro')),
    rule('lunarian_mera', 'race', 12, 'Fire God Synergy - Lunarian wielding fire is mythic.', c => c.race.name === 'Lunarian' && c.hasFruit && c.fruit.name === 'Mera Mera no Mi'),
    rule('cyborg_tech', 'race', 18, 'Built For This - Cyborg body and tech style are seamless.', c => c.race.name === 'Cyborg' && hasDiscipline(c, 'cyborg-tech')),
    rule('longleg_black_leg', 'race', 14, 'Born Kicker - Longleg legs and kick-fighting are a natural pair.', c => c.race.name === 'Longleg' && hasDiscipline(c, 'black-leg-style')),
    rule('advanced_armament_durability', 'haki', 8, 'Impregnable Defense - Advanced Armament over natural durability.', c => c.haki.armTier === 'Advanced' && c.race.durMod >= 10),
    rule('advanced_conquerors_will', 'haki', 15, 'Overwhelming Will - exceptional willpower reinforces rare ACoC.', c => c.haki.hasAdvCoc && c.willpower > 80),
    rule('future_sight_iq', 'haki', 10, 'Precognitive Tactician - Future Sight combined with sharp battle instincts.', c => c.haki.hasAdvObs && c.mental.battleIQ > 70),
    rule('natural_leader', 'traits', 10, 'Born To Lead - natural leadership shines in command.', c => c.traits.some(t => t.name === 'Natural Leader') && (c.role.name === 'Captain' || c.role.name === 'Vice Captain')),
    rule('iron_will', 'traits', 8, 'Unbreakable Spirit - Iron Will compounds extraordinary willpower.', c => c.traits.some(t => t.name === 'Iron Will') && c.willpower > 70),
    rule('battle_genius', 'traits', 10, 'Combat Prodigy - Battle Genius trait reinforces high Battle IQ.', c => c.traits.some(t => t.name === 'Battle Genius') && c.mental.battleIQ > 70),
    rule('survivalist_recovery', 'traits', 6, 'Cockroach Tenacity - survivalist instincts plus quick recovery.', c => c.traits.some(t => t.name === 'Survivalist') && c.physical.recovery > 40),
    rule('awakened_mastery', 'fruit', 20, 'Awakened Mastery - genius-level tactics unlock the fruit full awakened potential.', c => c.hasAwakened && c.mental.battleIQ > 75),
    rule('awakened_haki', 'fruit', 15, 'Awakened Fruit + Advanced Haki - a devastating combination.', c => c.hasAwakened && (c.haki.hasAdvObs || c.haki.hasAdvArm)),
    rule('awakened_zoan', 'fruit', 12, 'Awakened Zoan - transforms the surrounding battlefield itself.', c => c.hasAwakened && c.fruit && c.fruit.type.includes('Zoan')),
    rule('awakened_paramecia', 'fruit', 10, 'Awakened Paramecia - abilities now affect everything nearby, not just the user.', c => c.hasAwakened && c.fruit && c.fruit.type === 'Paramecia'),
    rule('guided_awakening', 'fruit', 10, 'Guided Awakening - mentor Devil Fruit expertise helped unlock this rare state.', c => c.hasAwakened && c.mentor.spec.includes('df')),
    rule('no_fruit_guidance', 'fruit', -8, 'No One To Teach You - mentor offered little Devil Fruit guidance.', c => c.hasFruit && c.mentor.df < 10 && c.fruitCompat < 50),
    rule('mismatched_weapon_style', 'style', -10, 'Mismatched Weapon & Style - weapon does not suit your style.', c => c.weapon && c.style.type !== 'brawl' && c.style.type !== 'shoot' && c.weapon.type !== c.style.type),
    rule('low_iq_difficult_fruit', 'fruit', -22, 'Untapped Potential - powerful fruit squandered by poor tactics.', c => c.hasFruit && c.mental.battleIQ < 35 && c.fruit.diff > 65),
    rule('giant_precision', 'race', -8, 'Clunky Frame - precise martial arts awkward on a Giant.', c => c.race.name === 'Giant' && (c.style.type === 'martial' || c.style.name === 'Rokushiki')),
    rule('giant_spy', 'race', -12, 'Impossible Stealth - a Giant cannot hide.', c => c.race.name === 'Giant' && c.role.name === 'Spy'),
    rule('cowardly_captain', 'traits', -10, 'Hesitant Leadership - cautious temperament unsettles the crew.', c => c.traits.some(t => t.name === 'Cowardly') && c.role.name === 'Captain'),
    rule('hotheaded_future_sight', 'traits', -8, 'Wasted Foresight - Future Sight undermined by reckless impulse.', c => c.traits.some(t => t.name === 'Hotheaded') && c.haki.hasAdvObs),
    rule('fruit_weapon_focus', 'special', -6, 'Divided Focus - splitting between fruit and weapon costs sharpness.', c => c.hasFruit && !!c.weapon),
    rule('heavy_weapon_stamina', 'weapon', -8, 'Heavy Armament Fatigue - powerful weapon drains limited stamina.', c => c.weapon && c.weapon.power >= 75 && c.physical.stamina < 35),
    rule('heavy_weapon_strength', 'weapon', -10, 'Cannot Wield It - weapon demands strength the user does not have.', c => c.weapon && c.weapon.power >= 75 && c.physical.strength < 30),
    rule('elemental_fire_kicks', 'fruit', 8, 'Heat-Driven Martial Arts - fire affinity reinforces an aggressive kicking discipline.', c => c.fruit?.elementTags?.includes('fire') && hasDiscipline(c, 'black-leg-style')),
    rule('elemental_lightning_speed', 'fruit', 8, 'Lightning Reflex Circuit - electricity and exceptional speed reinforce each other.', c => c.fruit?.elementTags?.includes('electricity') && c.physical.speed >= 75),
    rule('elemental_gravity_observation', 'fruit', 8, 'Gravity Field Awareness - Observation Haki guides precise force control.', c => c.fruit?.elementTags?.includes('gravity') && c.haki.obs >= 70),
    rule('elemental_spatial_tactician', 'fruit', 10, 'Spatial Tactician - high Battle IQ turns a difficult spatial power into battlefield control.', c => c.fruit?.elementTags?.includes('spatial') && c.mental.battleIQ >= 80),
    rule('zoan_physical_foundation', 'fruit', 7, 'Zoan Conditioning - transformation power reinforces a trained physical foundation.', c => c.fruit?.type?.includes('Zoan') && c.physical.strength >= 70 && c.physical.stamina >= 70),
    rule('logia_observation_control', 'fruit', 7, 'Elemental Evasion - strong Observation helps shape a Logia body around danger.', c => c.fruit?.type === 'Logia' && c.haki.obs >= 70),
    rule('blackbeard_dual_power', 'special', 15, 'Impossible Dual Power - darkness and tremors coexist through Blackbeard’s unique, unexplained exception.', c => c.fruit?.id === 'yami-yami-no-mi' && (c.secondaryFruits || []).some(fruit => fruit.id === 'gura-gura-no-mi') && c.multipleFruitException?.allowed),
    rule('eclipse_goddess_control', 'special', 18, 'Eclipse Goddess Control - advanced perception stabilizes dangerous gravity and singularity techniques.', c => c.fruit?.id === 'tori-tori-no-mi-model-lunar-abyssal-goose-goddess' && c.haki.hasAdvObs)
  ];

  synergy.evaluate = function (character) {
    const breakdown = { mentor: 0, weapon: 0, fruit: 0, race: 0, style: 0, traits: 0, haki: 0, special: 0 };
    const rawBreakdown = { mentor: 0, weapon: 0, fruit: 0, race: 0, style: 0, traits: 0, haki: 0, special: 0 };
    const log = [];
    const rules = [];
    const matchedByCategory = {};
    let rawBonus = 0;
    for (const currentRule of synergy.rules) {
      if (!currentRule.condition(character)) continue;
      rules.push(currentRule);
      rawBonus += currentRule.bonus;
      rawBreakdown[currentRule.category] += currentRule.bonus;
      (matchedByCategory[currentRule.category] ||= []).push(currentRule);
    }
    const falloff = [1, 0.65, 0.40, 0.25, 0.10];
    for (const [category, categoryRules] of Object.entries(matchedByCategory)) {
      const positives = categoryRules.filter(currentRule => currentRule.bonus > 0).sort((a, b) => b.bonus - a.bonus);
      const multipliers = new Map(positives.map((currentRule, index) => [currentRule.id, falloff[Math.min(index, falloff.length - 1)]]));
      for (const currentRule of categoryRules) {
        const multiplier = currentRule.bonus > 0 ? multipliers.get(currentRule.id) : 1;
        const effective = Math.round(currentRule.bonus * multiplier * 10) / 10;
        breakdown[category] += effective;
        log.push({ text: currentRule.text, positive: currentRule.bonus >= 0, value: effective, rawValue: currentRule.bonus, multiplier, id: currentRule.id, category });
      }
    }
    const bonus = Math.round(Object.values(breakdown).reduce((sum, value) => sum + value, 0) * 10) / 10;
    return { bonus, rawBonus, log, rules, breakdown, rawBreakdown, categoryCount: Object.keys(matchedByCategory).length };
  };
}(window.OnePieceRollV4));


