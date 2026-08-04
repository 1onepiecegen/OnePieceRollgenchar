/* Shared read-only calculation context. */
(function (V4) {
  'use strict';
  V4.engines.context = V4.engines.context || {};
  V4.engines.context.build = V4.engines.context.build || function (character) {
    return Object.freeze({
      character: character,
      mentor: character.mentor,
      race: character.race,
      fruit: character.fruit,
      weapon: character.weapon,
      style: character.style,
      traits: character.traits,
      haki: character.haki,
      physical: character.physical,
      mental: character.mental,
      willpower: character.willpower,
      luck: character.effLuck === undefined ? character.luck : character.effLuck,
      destiny: character.destiny,
      compatibility: character.compatibility,
      synergy: character.synergy
    });
  };
}(window.OnePieceRollV4));

