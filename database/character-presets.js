/* Complete authored templates. Numerical combat profiles remain simulator interpretations. */
(function(V4){'use strict';
  const presets={}; const profileFor=id=>(V4.database.combatProfiles||[]).find(p=>p.characterId===id);
  const canonicalBounties={
    'monkey-d-luffy':3000000000,'roronoa-zoro':1111000000,'sanji':1032000000,'charlotte-katakuri':1057000000,
    kaido:4611100000,'charlotte-linlin':4388000000,'marshall-d-teach':2247600000,'shanks':4048900000,
    'dracule-mihawk':3590000000,'trafalgar-law':3000000000,'eustass-kid':3000000000,'crocodile':1965000000
  };
  const special={
    'charlotte-katakuri':{raceId:'human',roleName:'Combatant',reputationName:'Infamous Duelist',epithet:'Minister of Flour',age:48,homeRegionId:'new-world',affiliationIds:['big-mom-pirates'],organizationIds:['big-mom-pirates'],traits:['disciplined','patient'],archetypes:['patient-duelist'],values:['family','honor'],fears:['failing-family']},
    kaido:{raceId:'oni',roleName:'Captain',reputationName:'Cruel Destroyer',epithet:'King of the Beasts',age:59,homeRegionId:'wano',affiliationIds:['beast-pirates'],organizationIds:['beast-pirates'],traits:['monster-constitution','iron-will'],archetypes:['bold-idealist'],values:['strength','freedom'],fears:['an-unworthy-death']},
    'monkey-d-luffy':{raceId:'human',roleName:'Captain',reputationName:'Government Enemy',epithet:'Straw Hat',age:19,homeRegionId:'new-world',affiliationIds:['straw-hat-pirates'],organizationIds:['straw-hat-pirates'],traits:['the-will-of-d','fearless'],archetypes:['bold-idealist'],values:['freedom','friends'],fears:['losing-crew']},
    'marshall-d-teach':{raceId:'human',roleName:'Captain',reputationName:'Government Enemy',epithet:'Blackbeard',age:40,homeRegionId:'new-world',affiliationIds:['blackbeard-pirates'],organizationIds:['blackbeard-pirates'],traits:['natural-leader','resourceful'],archetypes:['resourceful-survivor'],values:['ambition','opportunity'],fears:['missing-the-moment']},
    'goose-eclipsed-goddess':{raceId:'human',roleName:'Captain',reputationName:'Government Enemy',epithet:'The Eclipsed Goddess',age:18,homeRegionId:'new-world',affiliationIds:[],organizationIds:[],traits:['iron-will','battle-genius'],archetypes:['reserved-scholar'],values:['autonomy','curiosity'],fears:['losing-self'],source:'fan'}
  };
  const defaults={raceId:'human',roleName:'Combatant',reputationName:'Independent Adventurer',age:24,homeRegionId:'grand-line-paradise',affiliationIds:[],organizationIds:[],traits:['resourceful'],archetypes:['restless-explorer'],values:['freedom'],fears:['being-forgotten']};
  for(const profile of V4.database.combatProfiles||[]){const character=(V4.database.characters||[]).find(c=>c.id===profile.characterId)||{};const x={...defaults,...special[profile.characterId]};presets[`preset-${profile.characterId}`]={
    id:`preset-${profile.characterId}`,name:character.name||profile.name,source:x.source||profile.source,era:profile.era,characterId:profile.characterId,combatProfileId:profile.id,
    identity:{raceId:x.raceId,roleName:x.roleName,reputationName:x.reputationName,traitIds:x.traits,accomplishmentIds:[],affiliationIds:x.affiliationIds,organizationIds:x.organizationIds,epithet:x.epithet||null,age:x.age,gender:null,homeRegionId:x.homeRegionId},
    mentorHistory:[],fruitIds:[profile.fruitId,...(profile.secondaryFruitIds||[])].filter(Boolean),weaponIds:profile.weaponIds?.length?profile.weaponIds:(character.weaponIds||[]),haki:{...profile.haki},
    progression:{foundationIds:profile.foundationIds||[],disciplineIds:profile.disciplineIds||[],techniqueIds:profile.techniqueIds||[],advancedStateIds:profile.advancedStateIds||[]},
    personality:{archetypeIds:x.archetypes,values:x.values,fears:x.fears,quirks:[],behaviorProfileId:profile.behaviorProfileIds?.[0]||'ai-balanced',battleAiProfileId:profile.behaviorProfileIds?.[0]||'ai-balanced'},
    worldProfile:{crewQuality:profile.balanceBand==='emperor'?'emperor-crew':'independent',publicAwareness:profile.balanceBand==='emperor'?'world-famous':'known',governmentKnowledge:'confirmed',worldPresence:profile.balanceBand,territoryIds:[],factionStatus:x.affiliationIds.length?'affiliated':'independent'},
    referenceBounty:canonicalBounties[profile.characterId]?{amount:canonicalBounties[profile.characterId],era:'late-wano',sourceLabel:'Known canon bounty at the end-of-Wano boundary',isCanonical:true}:{amount:null,era:profile.era,sourceLabel:'No confirmed public bounty is asserted by this late-Wano-safe simulator template.',isCanonical:false},
    variableFields:[],provenance:{forcedFields:['complete curated persona'],adjustedFields:[],sourceProfileIds:[profile.id],notes:['Curated simulator template. Canon entries use known, late-Wano-safe facts; numeric profiles are interpretations.']}
  };}
  V4.database.characterPresets=Object.values(presets);
}(window.OnePieceRollV4));

