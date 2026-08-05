/* V5.2 reviewed battle roster metadata plus the user-provided goddess OC. */
(function (V4) {
  'use strict';
  const reviewed={
    'portgas-d-ace':{combatProfileId:'combat-portgas-d-ace-wano-reference',fruitId:'mera-mera-no-mi',affiliations:['whitebeard-pirates'],roles:['commander','combatant'],encounterTags:['pirate','logia','fire']},
    'eustass-kid':{combatProfileId:'combat-eustass-kid-late-wano',fruitId:'jiki-jiki-no-mi',affiliations:['kid-pirates'],roles:['captain','combatant'],encounterTags:['pirate','new-world','magnetism']},
    'crocodile':{combatProfileId:'combat-crocodile-late-wano',fruitId:'suna-suna-no-mi',roles:['captain','strategist'],encounterTags:['pirate','logia','underworld']},
    'donquixote-doflamingo':{combatProfileId:'combat-donquixote-doflamingo-late-wano',fruitId:'ito-ito-no-mi',roles:['captain','combatant'],encounterTags:['pirate','underworld','conqueror']},
    'marco':{combatProfileId:'combat-marco-late-wano',fruitId:'tori-tori-no-mi-model-phoenix',affiliations:['whitebeard-pirates'],roles:['commander','doctor'],encounterTags:['pirate','mythical-zoan','flight']},
    'kaido':{combatProfileId:'combat-kaido-late-wano',fruitId:'uo-uo-no-mi-model-seiryu',affiliations:['beasts-pirates'],roles:['captain','emperor'],encounterTags:['pirate','emperor','mythical-zoan'],notes:['Defeated at Wano; ultimate fate is not confirmed by the late-Wano boundary.']},
    'charlotte-linlin':{combatProfileId:'combat-charlotte-linlin-late-wano',fruitId:'soru-soru-no-mi',affiliations:['big-mom-pirates'],roles:['captain','emperor'],encounterTags:['pirate','emperor','soul']},
    'shanks':{combatProfileId:'combat-shanks-late-wano',affiliations:['red-haired-pirates'],roles:['captain','emperor','swordsman'],encounterTags:['pirate','emperor','haki']},
    'edward-newgate':{combatProfileId:'combat-edward-newgate-marineford',fruitId:'gura-gura-no-mi',affiliations:['whitebeard-pirates'],roles:['captain','emperor'],encounterTags:['pirate','emperor','vibration']},
    'monkey-d-garp':{combatProfileId:'combat-monkey-d-garp-late-wano',affiliations:['marines'],roles:['marine','vice-admiral'],encounterTags:['marine','haki','brawler']},
    'sakazuki':{combatProfileId:'combat-sakazuki-late-wano',fruitId:'magu-magu-no-mi',affiliations:['marines'],roles:['marine','fleet-admiral'],encounterTags:['marine','logia','magma']},
    'kuzan':{combatProfileId:'combat-kuzan-late-wano',fruitId:'hie-hie-no-mi',roles:['former-marine','combatant'],encounterTags:['logia','ice']},
    'borsalino':{combatProfileId:'combat-borsalino-late-wano',fruitId:'pika-pika-no-mi',affiliations:['marines'],roles:['marine','admiral'],encounterTags:['marine','logia','light']},
    'silvers-rayleigh':{combatProfileId:'combat-silvers-rayleigh-late-wano',roles:['retired-pirate','swordsman'],encounterTags:['haki','legendary','sword-user']},
    'marshall-d-teach':{combatProfileId:'combat-marshall-d-teach-late-wano',fruitId:'yami-yami-no-mi',secondaryFruitIds:['gura-gura-no-mi'],multipleFruitException:{allowed:true,source:'canon',mechanism:'unknown'},affiliations:['blackbeard-pirates'],roles:['captain','emperor'],encounterTags:['pirate','emperor','darkness']}
  };
  for(const character of V4.database.characters||[]) if(reviewed[character.id]) Object.assign(character,reviewed[character.id],{spoilerEra:'wano-end'});
  if(!(V4.database.characters||[]).some(character=>character.id==='goddess-eclipsed-goddess')) V4.database.characters.push({
    id:'goddess-eclipsed-goddess',name:'Goddess',displayTitles:['The Eclipse Goddess','Abyssal Saint'],source:'fan',creatorLabel:'User OC',spoilerEra:'wano-end',referenceTier:'legendary',affiliations:[],roles:['anomaly','combatant'],encounterTags:['wild-card','alternate-world','mythical-zoan','gravity'],combatProfileId:'combat-goddess-eclipsed-goddess',mentorProfileId:null,fruitId:'tori-tori-no-mi-model-lunar-abyssal-goddess-goddess',weaponIds:[],foundationIds:['basic-martial-arts'],disciplineIds:[],techniqueIds:[],advancedStateIds:['goddess-full-alter','goddess-ishtar-pact'],hakiProfile:{observation:true,armament:true,conquerors:true,advancedObservation:true,advancedArmament:true,conquerorsCoating:false},relationshipIds:[],factionRank:null,bountyHistory:[],notes:['Appears 18; female, she/her.','A reincarnated alternate-world anomaly whose public bounty begins at zero until her abilities are witnessed.','Cold, arrogant, curious, and dramatically goddess-like; seeks to understand or eclipse the world’s order.'],appearance:{hair:'Long silver twin-tails with dark violet streaks and faint golden cracks',eyes:'Orange, shifting to violet eclipse under power',attire:'Black-violet sailor uniform, gold accents, and a distorted moonlight haori'},soulBoundPacts:[{id:'goddess-ishtar-pact',name:'Ishtar Pact',source:'fan',description:'Divine-authority and gem-magecraft influence fused with gravity control.'},{id:'goddess-full-alter',name:'Full Alter Mode',source:'fan',description:'A colder black-violet inversion that raises destructive output and ruthlessness.'}],goal:'Understand the world, master her awakened power, and decide whether to eclipse its order or carve out her own domain.'
  });
}(window.OnePieceRollV4));


