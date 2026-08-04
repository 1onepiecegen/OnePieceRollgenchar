/* Requirement-driven styles. Canon, expanded, and fan pools can filter by source. */
(function (V4) {
  'use strict';
  V4.database.styleMetadata = {
    'One Sword Style': { source: 'canon', weaponRequirements: { family: 'blade', minimum: 1, maximum: 1 } },
    'Two Sword Style': { source: 'canon', weaponRequirements: { family: 'blade', minimum: 2, maximum: 2 } },
    'Three Sword Style': { source: 'canon', weaponRequirements: { family: 'blade', subtype: 'katana', minimum: 3, maximum: 3, specialUnlock: 'three-sword-training' } },
    'Nine Sword Style': { source: 'canon', advancedState: true },
    'Kanabo Style': { source: 'expanded', weaponRequirements: { family: 'club', subtype: 'kanabo', minimum: 1, maximum: 1 } },
    'Dial Combat': { source: 'canon', weaponRequirements: { family: 'dial', minimum: 1, maximum: 2 } },
    'Gun Kata': { source: 'expanded', weaponRequirements: { family: 'firearm', minimum: 1, maximum: 2 } }
    , 'Demon Aura Style': { source: 'expanded', baseRollable: false, progression: 'advanced-technique' }
    , 'Life Return': { source: 'canon', baseRollable: false, progression: 'advanced-technique' }
  };
}(window.OnePieceRollV4));

