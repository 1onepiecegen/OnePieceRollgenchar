/* V5.3 reviewed fan/original Devil Fruit batch. All records are explicitly non-canon. */
(function (V4) {
  'use strict';
  const rarityWeight = { common:4, uncommon:2, rare:.7, epic:.2, legendary:.04, mythic:.006, anomaly:.0005 };
  const records = [
    ['kumo-kumo-no-mi-model-cloud','Kumo Kumo no Mi, Model: Cloud','Paramecia',42,'common',['smoke','wind'],'Forms controllable cloud banks for concealment, gliding, and soft impact reduction.'],
    ['nawa-nawa-no-mi','Nawa Nawa no Mi','Paramecia',47,'common',['restraint','fabric'],'Produces durable rope for rigging, capture, and improvised movement.'],
    ['kashi-kashi-no-mi','Kashi Kashi no Mi','Paramecia',39,'common',['wood','utility'],'Shapes small wooden fittings, pegs, braces, and simple tools from available timber.'],
    ['shiki-shiki-no-mi-model-paper','Shiki Shiki no Mi','Paramecia',44,'common',['fabric','blade'],'Creates paper sheets, folds, decoys, and shallow cutting edges that fear rain and fire.'],
    ['rensa-rensa-no-mi','Rensa Rensa no Mi','Paramecia',58,'uncommon',['metal','restraint'],'Creates linked chains whose reach grows with careful preparation.'],
    ['kÅro-kÅro-no-mi','Koro Koro no Mi','Paramecia',50,'uncommon',['physical','mobility'],'Lets touched gear roll smoothly over surfaces for rapid shipboard movement and trick attacks.'],
    ['mado-mado-no-mi','Mado Mado no Mi','Paramecia',69,'rare',['reflection','spatial'],'Creates temporary viewing windows through nearby surfaces but cannot form a pocket world.'],
    ['kÅseki-kÅseki-no-mi','Koseki Koseki no Mi','Paramecia',73,'rare',['earth','reflection'],'Grows colored mineral facets for shields, lenses, and brittle projectile bursts.'],
    ['shio-shio-no-mi-model-brine','Shio Shio no Mi, Model: Brine','Paramecia',61,'rare',['water','restraint'],'Concentrates saltwater mist for tracking, stinging restraint, and preservation; it does not control the sea.'],
    ['hibiki-hibiki-no-mi','Hibiki Hibiki no Mi','Paramecia',71,'rare',['sound','vibration'],'Stores a single impact as a delayed resonance that must be released before another can be kept.'],
    ['komori-komori-no-mi','Komori Komori no Mi','Zoan',48,'uncommon',['flight','observation'],'Transforms the user into a bat or hybrid with echolocation and agile night flight.'],
    ['shika-shika-no-mi-model-elk','Shika Shika no Mi, Model: Elk','Zoan',57,'uncommon',['physical','speed'],'Transforms the user into an elk or hybrid with powerful charges and terrain endurance.'],
    ['kaba-kaba-no-mi','Kaba Kaba no Mi','Zoan',63,'rare',['physical','armor'],'Transforms the user into a hippopotamus or hybrid built for crushing bites and resilient defense.'],
    ['tori-tori-no-mi-model-raven','Tori Tori no Mi, Model: Raven','Zoan',59,'uncommon',['flight','observation'],'Transforms the user into a raven or hybrid with reconnaissance and precise aerial movement.'],
    ['mushi-mushi-no-mi-model-firefly','Mushi Mushi no Mi, Model: Firefly','Zoan',53,'uncommon',['light','flight'],'Transforms the user into a firefly hybrid capable of brief flashes and low-light navigation.'],
    ['hebi-hebi-no-mi-model-coral-snake','Hebi Hebi no Mi, Model: Coral Snake','Zoan',60,'rare',['poison','physical'],'Transforms the user into a coral-snake hybrid with venom that rewards ambush rather than raw force.'],
    ['neko-neko-no-mi-model-panther','Neko Neko no Mi, Model: Panther','Zoan',68,'rare',['physical','speed'],'Transforms the user into a panther hybrid built for stealth, acceleration, and close-range pressure.'],
    ['ushi-ushi-no-mi-model-yak','Ushi Ushi no Mi, Model: Yak','Zoan',64,'rare',['physical','armor'],'Transforms the user into a yak hybrid with cold-weather endurance and a heavy charge.'],
    ['tori-tori-no-mi-model-thunderbird-echo','Tori Tori no Mi, Model: Storm Heron','Mythical Zoan',84,'legendary',['wind','electricity','flight'],'An original mythical bird form that channels storm fronts, but drains stamina quickly in sustained weather.'],
    ['hito-hito-no-mi-model-selene','Hito Hito no Mi, Model: Selene','Mythical Zoan',90,'mythic',['light','gravity'],'An original moon-deity form with limited lunar pull and illumination; its large effects require clear conditions and major stamina.'],
    ['genso-genso-no-mi','Genso Genso no Mi','Paramecia',87,'legendary',['illusion','psychic'],'Builds layered sensory illusions that collapse under strong Observation Haki or direct contact.'],
    ['kuroi-kuroi-no-mi','Kuroi Kuroi no Mi','Paramecia',92,'mythic',['darkness','barrier'],'Creates dense black panels that absorb light and blunt attacks but cannot nullify Devil Fruit powers.'],
    ['shinkÅ«-shinkÅ«-no-mi','Shinku Shinku no Mi','Paramecia',94,'mythic',['wind','spatial'],'Creates small pressure vacuums for movement and disruption; living targets resist the strongest effects.'],
    ['orion-orion-no-mi','Orion Orion no Mi','Paramecia',96,'anomaly',['cosmic','projectile'],'Marks a short constellation route for linked shots; it cannot create stars or bypass Haki defenses.']
  ];
  const known = new Set((V4.database.fruits || []).map(fruit => fruit.id));
  for (const [id,name,type,power,rarity,elementTags,description] of records) {
    if (known.has(id)) continue;
    V4.database.fruits.push({ id,name,type,power,diff:Math.min(98,Math.round(power * .72 + 18)),vers:Math.min(100,Math.round(power * .58 + 30)),awk:Math.min(100,Math.round(power * .55 + 40)),utility:Math.min(100,Math.round(power * .48 + 32)),source:'fan',spoilerEra:'wano-end',canonicalIdentity:`${id}:fan`,description,desc:description,tags:[type.toLowerCase().replace(/\s+/g,'-'),...elementTags],elementTags,rarityTier:rarity,rollWeight:rarityWeight[rarity],baseRollable:true,loreRarity:{tier:rarity} });
    known.add(id);
  }
  V4.database.fruitBatchV53 = { version:'5.3.0', added:records.length, source:'fan' };
}(window.OnePieceRollV4));

