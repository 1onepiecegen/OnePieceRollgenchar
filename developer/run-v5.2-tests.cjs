/* Headless acceptance runner: node developer/run-v5.2-tests.cjs [sample size] */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const elements = new Map();
const makeElement = id => ({ id, value:'', innerHTML:'', textContent:'', style:{}, dataset:{}, children:[], options:[], classList:{add(){},remove(){},toggle(){}}, appendChild(child){this.children.push(child);this.options.push(child);return child;}, addEventListener(){}, querySelectorAll(){return[];}, setAttribute(){}, click(){}, focus(){} });
const document = {
  body: makeElement('body'),
  getElementById(id){ if(!elements.has(id)) elements.set(id,makeElement(id)); return elements.get(id); },
  createElement(tag){ return makeElement(tag); },
  querySelectorAll(){ return []; }, addEventListener(){}
};
const storage = new Map();
const context = { console, document, navigator:{}, location:{href:''}, Blob, URL, Date, Math, JSON, Number, String, Object, Array, Set, Map, RegExp, Error, parseInt, parseFloat, isNaN,
  localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)},
  alert(){}, confirm(){return true;}, prompt(){return null;}, setTimeout, clearTimeout, setInterval, clearInterval
};
context.window=context; context.globalThis=context;
vm.createContext(context);
for(const match of html.matchAll(/<script(?:\s+src="([^"]+)")?[^>]*>([\s\S]*?)<\/script>/g)){
  const filename=match[1]; const code=filename?fs.readFileSync(path.join(root,filename),'utf8'):match[2];
  vm.runInContext(code,context,{filename:filename||'index-inline.js'});
}
const V4=context.OnePieceRollV4;
const catalogErrors=V4.database.catalog.validateAll();
const validation=V4.developer.v52Validation.run({generate:seed=>V4.engines.generator.generate({},seed),derive:character=>context.deriveSandboxCharacter(character)});
const sampleSize=Math.max(1000,Number(process.argv[2])||10000);
let generationErrors=0,secondFruitViolations=0,gooseRolls=0,nikaRolls=0,fruitUsers=0;
for(let index=0;index<sampleSize;index++){
  try{
    const character=V4.engines.generator.generate({},(820000000+index)|0);
    if(character.fruit){fruitUsers++;if(character.fruit.id==='tori-tori-no-mi-model-lunar-abyssal-goose-goddess')gooseRolls++;if(character.fruit.id==='gomu-gomu-no-mi')nikaRolls++;}
    if((character.secondaryFruits||[]).length&&!character.multipleFruitException?.allowed)secondFruitViolations++;
    V4.engines.combatantAdapter.fromGenerated(character);
  }catch(error){generationErrors++;if(generationErrors<5)console.error(error.stack||error.message);}
}
const career=V4.developer.careerValidation.run({count:Math.min(10000,sampleSize),generate:seed=>V4.engines.generator.generate({},seed)});
const presetIntegrity=V4.developer.presetIntegrity?.run ? V4.developer.presetIntegrity.run(10008) : {pass:false,errors:['V5.5 preset integrity module did not load.']};
const sandboxBlankRequest=tier=>({mode:'unrestricted',overrides:{mentor:{locked:'none'},fruit:{locked:null},haki:{locked:context.hakiProfile('none')},race:{},weapon:{},style:{},role:{},reputation:{}},selected:{mentor:null,fruit:null,race:null,foundation:null,discipline:null,weapon:null,weaponFamily:'',role:null,reputation:null,haki:'none',customHaki:'',customHakiFlags:{futureSight:false,emission:false,conquerorCoating:false},fruitMastery:'derived',customFruitMastery:'',worldPresence:'random',governmentKnowledge:'derived',customIntelFacts:'',customIntelConfidence:'',crewQuality:'',accomplishmentProfile:'',bountyOverride:'',minimumTierId:'',targetTierId:tier.id,statPreset:'',loadoutCount:'',advancedState:'',allowDuplicates:false,overrideTier:''},description:{}});
const sandboxBuilds=process.argv.includes('--sandbox-full')?Math.ceil(10008/V4.database.tiers.length):12;
const sandboxTargeted=V4.developer.sandboxValidation.runTierTargets({tiers:V4.database.tiers,buildsPerTier:sandboxBuilds,construct:(tier,seed)=>context.generateSandboxCharacter(sandboxBlankRequest(tier),seed)});
let katakuriPresetError='';
try {
  const profile=V4.database.combatProfiles.find(entry=>entry.characterId==='charlotte-katakuri');
  if(!profile) throw new Error('Katakuri profile is missing.');
  const katakuri=V4.engines.presetBuilder.build(profile.id,740000001);
  context.deriveSandboxCharacter(katakuri);
  katakuri.generationProvenance={seeded:true,manuallyConfigured:true,presetProfileId:profile.id,forcedFields:['curated character-copy preset'],automaticallySatisfiedRequirements:['Profile copied'],bypassedRequirements:[],canonConsistency:'curated-simulator-copy',baseSeed:String(katakuri.seed),buildId:'test-katakuri'};
  context.renderCharacterSheet(katakuri);
} catch(error) { katakuriPresetError=error.message; }
const fruitSources=V4.database.fruits.reduce((counts,fruit)=>{counts[fruit.source]=(counts[fruit.source]||0)+1;return counts;},{});
const fruitRarities=V4.database.fruits.reduce((counts,fruit)=>{counts[fruit.rarityTier]=(counts[fruit.rarityTier]||0)+1;return counts;},{});
const result={pass:catalogErrors.length===0&&validation.pass&&generationErrors===0&&secondFruitViolations===0&&career.pass&&presetIntegrity.pass&&sandboxTargeted.passed&&!katakuriPresetError,databaseVersion:V4.database.manifest.databaseVersion,counts:{fruits:V4.database.fruits.length,...V4.database.fruitExpansion,fruitSources,fruitRarities,profiles:V4.database.combatProfiles.length,presets:V4.database.sandboxPresets.length,elements:V4.database.elements.length},catalogErrors,validation,presetIntegrity,sandboxTargeted,katakuriPresetError,sample:{size:sampleSize,generationErrors,fruitUsers,fruitRate:fruitUsers/sampleSize,gooseRolls,nikaRolls,secondFruitViolations},career};
if(process.argv.includes('--v54')){
  const v54=V4.developer.v54Validation.run({count:process.argv.includes('--v54-full')?sampleSize:Math.min(10000,sampleSize),players:100,generate:(overrides,seed,options)=>V4.engines.generator.generate(overrides,seed,options)});
  result.v54={brutal:v54.brutal,standard:v54.standard,standardLuck:v54.standardLuck,cohorts:v54.cohorts};
}
console.log(JSON.stringify(result,null,2));
if(process.argv.includes('--distribution')){
  context.runDistributionTest();
  console.log('\n' + document.getElementById('test-output').textContent);
}
if(process.argv.includes('--distribution-summary')){
  context.runDistributionTest();
  const text=document.getElementById('test-output').textContent;
  const section=title=>{const start=text.indexOf(`=== ${title} ===`);if(start<0)return'';const next=text.indexOf('\n=== ',start+5);return text.slice(start,next<0?text.length:next);};
  console.log('\n' + [
    section('PIPELINE V2 DISTRIBUTION (100000 independent random-seed pulls)'),
    section('MENTOR DISTRIBUTION'), section('WEAPON GRADE DISTRIBUTION'),
    section('WEAPON ENCOUNTER CLASSES'), section('DISPLAY STYLE ALIAS DISTRIBUTION'),
    section('COMBAT PATH AUDIT'), section('LOADOUT & ADVANCED STYLE INVARIANTS'),
    section('DEVIL FRUIT AWAKENING'), section('BOUNTY STATS'),
    section('MARINE THREAT STATS'), section('RAW COMBAT SCORE (pre-normalization)'),
    section('SYNERGY SATURATION'), section('PERFECT SYNERGY (≥60)'),
    section('TOP 5 CHARACTERS BY CR')
  ].filter(Boolean).join('\n\n'));
}
process.exitCode=result.pass?0:1;
