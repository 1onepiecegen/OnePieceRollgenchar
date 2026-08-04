/* Canonical character shape. Populate this from the legacy createCharacter function. */
(function (V4) {
  'use strict';
  V4.engines.character = V4.engines.character || {};
  V4.engines.character.create = V4.engines.character.create || function () {
    return { version: V4.version, seed: null, created: Date.now(), mentor: null, race: null,
      role: null, fruit: null, awakening: null, weapon: null, style: null, traits: [],
      physical: {}, mental: {}, haki: {}, compatibility: {}, synergy: { total: 0, rules: [] },
      combat: {}, threat: {}, bounty: {}, dna: {}, story: {}, logs: {}, luckLog: [] };
  };
}(window.OnePieceRollV4));

