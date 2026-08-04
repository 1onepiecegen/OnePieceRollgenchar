/* Canon classification overrides. Additions belong here, not in engine code. */
(function (V4) {
  'use strict';
  V4.database.weaponMetadata = {
    'Yoru': { source: 'canon', family: 'blade', subtype: 'black-blade', tags: ['sword', 'greatsword', 'black-blade', 'named-blade'], named: true, unique: true, rarityClass: 'legendary-unique', acquisitionWeight: 0.03 },
    'Ace': { source: 'canon', family: 'polearm', subtype: 'naginata', tags: ['polearm', 'naginata', 'named-blade'], named: true, unique: true, rarityClass: 'legendary-unique', acquisitionWeight: 0.06 },
    'Murakumogiri': { source: 'canon', family: 'polearm', subtype: 'bisento', tags: ['polearm', 'bisento', 'named-blade'], named: true, unique: true, rarityClass: 'legendary-unique', acquisitionWeight: 0.06 },
    'Wado Ichimonji': { source: 'canon', family: 'blade', subtype: 'katana', tags: ['sword', 'katana', 'named-blade'], named: true, unique: true, rarityClass: 'iconic-named', acquisitionWeight: 0.12 },
    'Sandai Kitetsu': { source: 'canon', family: 'blade', subtype: 'katana', tags: ['sword', 'katana', 'cursed-blade'], named: true, unique: true, rarityClass: 'iconic-named', acquisitionWeight: 0.14 },
    'Enma': { source: 'canon', family: 'blade', subtype: 'katana', tags: ['sword', 'katana', 'named-blade'], named: true, unique: true, rarityClass: 'legendary-unique', acquisitionWeight: 0.05 },
    'Ame no Habakiri': { source: 'canon', family: 'blade', subtype: 'katana', tags: ['sword', 'katana', 'named-blade'], named: true, unique: true, rarityClass: 'legendary-unique', acquisitionWeight: 0.05 },
    'Shusui': { source: 'canon', family: 'blade', subtype: 'katana', tags: ['sword', 'katana', 'black-blade', 'named-blade'], named: true, unique: true, rarityClass: 'legendary-unique', acquisitionWeight: 0.05 },
    'Shodai Kitetsu': { source: 'canon', family: 'blade', subtype: 'katana', tags: ['sword', 'katana', 'cursed-blade'], named: true, unique: true, rarityClass: 'legendary-unique', acquisitionWeight: 0.03 },
    'Nidai Kitetsu': { source: 'canon', family: 'blade', subtype: 'katana', tags: ['sword', 'katana', 'cursed-blade'], named: true, unique: true, rarityClass: 'iconic-named', acquisitionWeight: 0.08 },
    'Kikoku': { source: 'canon', family: 'blade', subtype: 'nodachi', tags: ['sword', 'nodachi', 'cursed-blade'], named: true, unique: true, rarityClass: 'iconic-named', acquisitionWeight: 0.10 },
    'Hassaikai': { source: 'canon', family: 'club', subtype: 'kanabo', tags: ['club', 'kanabo', 'heavy'], named: true, unique: true, rarityClass: 'legendary-unique', acquisitionWeight: 0.4 },
    'Jitte': { source: 'canon', family: 'staff', subtype: 'jitte', tags: ['staff', 'seastone', 'capture-tool'] },
    'Reject Dial': { source: 'canon', family: 'dial', subtype: 'reject', tags: ['dial', 'stored-force', 'close-range'] },
    'Flintlock Pistol': { source: 'canon', family: 'firearm', subtype: 'pistol', tags: ['gun', 'one-handed', 'ranged'] },
    'Den Den Mushi Rifle': { source: 'expanded', family: 'firearm', subtype: 'rifle', tags: ['gun', 'ranged'] },
    'Sniper Rifle': { source: 'expanded', family: 'firearm', subtype: 'rifle', tags: ['gun', 'ranged', 'precision'] },
    'Cannon': { source: 'canon', family: 'firearm', subtype: 'cannon', tags: ['gun', 'heavy', 'area'] },
    'Yoru (Replica)': { source: 'fan', family: 'blade', subtype: 'greatsword', tags: ['sword', 'fan-made'], named: true, unique: false, rarityClass: 'replica', acquisitionWeight: 0.10 }
  };
}(window.OnePieceRollV4));

