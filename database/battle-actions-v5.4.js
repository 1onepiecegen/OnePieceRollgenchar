/* V5.4 reviewed signature techniques. Curated presentation records, not exhaustive canon move lists. */
(function (V4) {
  'use strict';
  const actions = [
    ['combat-monkey-d-luffy-late-wano','Gomu Gomu no Dawn Whip','fruit','heavy',['physical'],'canon'],['combat-monkey-d-luffy-late-wano','Gear Five: Dawn Cymbal','fruit','finisher',['physical'],'canon'],
    ['combat-roronoa-zoro-late-wano','Three Sword Style: Oni Giri','weapon','heavy',['blade'],'canon'],['combat-roronoa-zoro-late-wano','King of Hell: Purgatory Onigiri','haki','finisher',['blade','haki'],'canon'],
    ['combat-sanji-late-wano','Diable Jambe: Concassé','style','heavy',['fire','physical'],'canon'],['combat-sanji-late-wano','Ifrit Jambe: Boeuf Burst','style','finisher',['fire','physical'],'canon'],
    ['combat-trafalgar-law-late-wano','ROOM: Shambles','fruit','standard',['space'],'canon'],['combat-trafalgar-law-late-wano','Puncture Wille','fruit','finisher',['vibration'],'canon'],
    ['combat-charlotte-katakuri-late-wano','Mochi Thrust','fruit','standard',['physical'],'canon'],['combat-charlotte-katakuri-late-wano','Buzz Cut Mochi','fruit','finisher',['physical'],'canon'],
    ['combat-kaido-late-wano','Thunder Bagua','weapon','heavy',['physical','haki'],'canon'],['combat-kaido-late-wano','Blast Breath','fruit','finisher',['fire'],'canon'],
    ['combat-sakazuki-late-wano','Meigo','fruit','finisher',['magma'],'canon'],['combat-kuzan-late-wano','Ice Time','fruit','heavy',['ice'],'canon'],
    ['combat-borsalino-late-wano','Yasakani no Magatama','fruit','heavy',['light'],'canon'],['combat-marshall-d-teach-late-wano','Black Vortex','fruit','heavy',['darkness'],'canon'],
    ['combat-goose-eclipsed-goddess','Fallen Venus Armament','fruit','heavy',['gravity','cosmic'],'fan'],['combat-goose-eclipsed-goddess','Abyssal Singularity','fruit','catastrophic',['gravity','darkness','cosmic'],'fan']
  ].map(([ownerProfileId,name,category,scale,elementTags,source], index) => ({id:`battle-action-${index+1}`,ownerProfileIds:[ownerProfileId],name,category,scale,staminaCost:{standard:10,heavy:15,finisher:22,catastrophic:30}[scale] || 8,powerCoefficient:{standard:1,heavy:1.18,finisher:1.38,catastrophic:1.58}[scale] || 1,accuracyModifier:scale==='catastrophic'?-0.08:scale==='finisher'?-0.03:.03,elementTags,statusEffects:[],cooldown:scale==='catastrophic'?4:scale==='finisher'?3:scale==='heavy'?1:0,prerequisites:{},animationProfile:scale,description:`${name} is a reviewed ${source === 'canon' ? 'canon-named' : 'original OC'} battle presentation option.`,source}));
  V4.database.battleActions = actions;
}(window.OnePieceRollV4));

