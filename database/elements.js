/* V5.2 Devil Fruit affinity chart. Battle modifiers are simulator rules, not canon rankings. */
(function (V4) {
  'use strict';
  const elements = [
    ['physical','Physical',[],[]],
    ['fire','Fire',['ice','snow','plant','wax'],['magma','water','sand']],
    ['magma','Magma',['fire','ice','snow','plant','metal'],['water','gravity']],
    ['water','Water',['fire','magma','sand','smoke'],['electricity','ice','poison']],
    ['ice','Ice',['water','plant'],['fire','magma']],
    ['snow','Snow',['plant'],['fire','magma']],
    ['electricity','Electricity',['water','metal','technology'],['rubber','earth']],
    ['rubber','Rubber',['electricity'],['blade','fire']],
    ['light','Light',['darkness','illusion'],['gravity','reflection']],
    ['darkness','Darkness',['light','fruit-energy'],['haki']],
    ['gravity','Gravity',['flight','light','projectile'],['spatial']],
    ['wind','Wind',['smoke','gas','projectile'],['gravity','ice']],
    ['earth','Earth',['electricity','metal'],['water','magma']],
    ['sand','Sand',['fire','smoke'],['water','ice']],
    ['smoke','Smoke',['vision'],['wind','water']],
    ['gas','Gas',['breath','fire'],['wind','ice']],
    ['poison','Poison',['organic'],['heat','medical','poison']],
    ['acid','Acid',['metal','earth','armor'],['ice','barrier']],
    ['metal','Metal',['blade','physical'],['magma','electricity','acid']],
    ['plant','Plant',['earth','water'],['fire','ice','poison']],
    ['wood','Wood',['earth','water'],['fire','blade']],
    ['sound','Sound',['focus','illusion'],['silence','barrier']],
    ['soul','Soul',['willpower','organic'],['haki','silence']],
    ['spatial','Spatial',['barrier','projectile','gravity'],['stamina','darkness']],
    ['time','Time',['speed'],['haki','stamina']],
    ['illusion','Illusion',['focus'],['observation','sound']],
    ['cosmic','Cosmic',['gravity','light','darkness'],['seastone','stamina']],
    ['barrier','Barrier',['projectile','physical'],['spatial','vibration']],
    ['vibration','Vibration',['earth','barrier','armor'],['rubber']],
    ['blade','Blade',['organic','wood'],['metal','barrier']],
    ['technology','Technology',['physical'],['electricity','water']],
    ['fruit-energy','Devil Fruit Energy',[],['darkness','seastone','haki']],
    ['seastone','Seastone',['fruit-energy'],[]],
    ['mythic','Mythic Energy',[],['haki','seastone']],
    ['art','Art',[],['fire','water']],
    ['debuff','Debuff',[],['willpower','haki']],
    ['medical','Medical',[],['poison','decay']],
    ['utility','Utility',[],[]],
    ['observation','Perception',['illusion'],['silence']],
    ['psychic','Psychic',['focus'],['haki','willpower']],
    ['fabric','Fabric',[],['fire','blade']],
    ['decay','Decay',['organic','wood','metal'],['haki','medical']],
    ['organic','Organic',[],['fire','poison','decay']],
    ['armor','Armor',['physical'],['vibration','acid']],
    ['willpower','Willpower',['psychic','illusion','soul'],[]],
    ['support','Support',[],[]],
    ['food','Food',[],['fire','decay']],
    ['projectile','Projectile',[],['barrier','gravity']],
    ['reflection','Reflection',['light','projectile'],['darkness']],
    ['silence','Silence',['sound'],[]],
    ['restraint','Restraint',['speed'],['blade','strength']],
    ['explosive','Explosive',['armor','earth'],['water','barrier']],
    ['candy','Candy',['restraint'],['fire','water']],
    ['drain','Drain',['organic','stamina'],['barrier']],
    ['fortress','Fortress',['physical','projectile'],['spatial','vibration']],
    ['mobility','Mobility',[],['gravity','restraint']],
    ['spirit','Spirit',['soul'],['haki','willpower']],
    ['flight','Flight',['earth'],['gravity','wind']],
    ['recovery','Recovery',[],['poison','drain']],
    ['speed','Speed',[],['time','observation','restraint']],
    ['focus','Focus',['illusion'],['sound']],
    ['breath','Breath',[],['gas','smoke']],
    ['heat','Heat',['ice','snow'],['water']],
    ['stamina','Stamina',[],['drain']],
    ['strength','Strength',['restraint'],[]]
  ].map(([id,name,strongAgainst,weakAgainst])=>({id,name,source:'expanded',description:'A simulator affinity used by the experimental battle engine.',strongAgainst,weakAgainst}));
  const byId = Object.fromEntries(elements.map(element=>[element.id,element]));
  const multiplier = (attack, defense) => {
    if (!attack || !defense || attack===defense) return 1;
    const a=byId[attack], d=byId[defense]; if(!a||!d) return 1;
    let value=1;
    if(a.strongAgainst.includes(defense)) value*=1.35;
    if(a.weakAgainst.includes(defense)||d.strongAgainst.includes(attack)) value*=0.72;
    return Math.max(.5,Math.min(1.6,value));
  };
  V4.database.elements=elements;
  V4.database.elementChart={byId,multiplier};
}(window.OnePieceRollV4));

