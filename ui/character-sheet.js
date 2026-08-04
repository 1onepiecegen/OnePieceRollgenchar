/* Character-sheet rendering helpers only; no gameplay calculations. */
(function (V4) {
  'use strict';
  const sheet = V4.ui.characterSheet = V4.ui.characterSheet || {};
  sheet.careerSummary = character => {
    const career = V4.engines.career.ensure(character);
    return { turn: career.voyageTurn, path: career.careerPath, rank: career.factionRank, experience: career.experience, learnedTechniques: career.combatProgression.techniqueIds.length, acquiredWeapons: career.acquiredWeaponIds.length, hasFruit: !!career.fruitProgression.fruitId };
  };
  sheet.sourceBadge = entry => entry?.source ? `[${entry.source}]` : '[unknown source]';
}(window.OnePieceRollV4));

