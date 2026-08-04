/* Fruit, weapon, and style compatibility calculation entry points. */
(function (V4) {
  'use strict';
  const compatibility = V4.engines.compatibility = V4.engines.compatibility || {};
  const clamp = function (value, min, max) { return Math.max(min, Math.min(max, value)); };

  compatibility.fruit = compatibility.fruit || function (ctx) {
    const { fruit, mental, mentor, willpower, destiny } = ctx;
    if (!fruit) return 0;

    let score = 35;
    score += mental.battleIQ * 0.28;
    score += mental.creativity * 0.15;
    score += willpower * 0.08;
    score -= fruit.diff * 0.35;

    if (mentor.df >= 20) score += 15;
    else if (mentor.df >= 10) score += 8;
    else if (mentor.df >= 5) score += 3;

    if (destiny && destiny.fruitCompatBonus) score += destiny.fruitCompatBonus;
    return clamp(Math.round(score), 5, 99);
  };

  compatibility.weaponSkill = compatibility.weaponSkill || function (ctx) {
    const { physical, mental, mentor, weapon } = ctx;
    if (!weapon) return 0;

    let skill = 0;
    skill += physical.strength * 0.25;
    skill += mental.battleIQ * 0.35;
    const mentorCombatValue = mentor.combat[weapon.type] || 0;
    if (mentor.spec.includes(weapon.type)) skill += 20;
    if (mentorCombatValue >= 25) skill += 10;
    else if (mentorCombatValue >= 15) skill += 5;
    return clamp(skill / 100, 0.15, 1.1);
  };
}(window.OnePieceRollV4));

