/* V5.2 late-Wano Devil Fruit expansion. Descriptions are concise simulator summaries. */
(function (V4) {
  'use strict';
  const rarityWeights={common:4,uncommon:2,rare:.7,epic:.2,legendary:.04,mythic:.006,anomaly:.0005};
  const entry=(data,source='canon')=>{const [id,name,type,power,rarity,elementTags,description]=data;return {id,name,type,power,diff:Math.min(98,Math.round(power*.72+18)),vers:Math.min(100,Math.round(power*.58+30)),awk:Math.min(100,Math.round(power*.55+40)),utility:Math.min(100,Math.round(power*.48+32)),source,spoilerEra:'wano-end',canonicalIdentity:`${id}:${source}`,description,desc:description,tags:[type.toLowerCase().replace(/\s+/g,'-'),...elementTags],elementTags,rarityTier:rarity,rollWeight:rarityWeights[rarity],baseRollable:true,loreRarity:{tier:rarity}};};
  const canon=[
    ['ato-ato-no-mi','Ato Ato no Mi','Paramecia',48,'uncommon',['art','debuff'],'Turns targets into abstract art and disrupts their normal function.'],
    ['beri-beri-no-mi','Beri Beri no Mi','Paramecia',38,'common',['physical'],'Lets the user split into small berry-like spheres that blunt many strikes.'],
    ['beta-beta-no-mi','Beta Beta no Mi','Paramecia',57,'uncommon',['gas','fire'],'Creates sticky mucus that can restrain targets and burn when ignited.'],
    ['buki-buki-no-mi','Buki Buki no Mi','Paramecia',72,'rare',['metal','technology'],'Transforms body parts into many kinds of weapons.'],
    ['buku-buku-no-mi','Buku Buku no Mi','Paramecia',63,'rare',['spatial','illusion'],'Controls books and can confine targets inside book worlds.'],
    ['chiyu-chiyu-no-mi','Chiyu Chiyu no Mi','Paramecia',46,'rare',['medical'],'Heals living beings through restorative tears at a personal cost.'],
    ['choki-choki-no-mi','Choki Choki no Mi','Paramecia',51,'uncommon',['blade'],'Turns the hands into scissors that cut solid matter like paper.'],
    ['fude-fude-no-mi','Fude Fude no Mi','Paramecia',69,'rare',['art','illusion'],'Brings painted creations to life when the user maintains their technique.'],
    ['fuku-fuku-no-mi','Fuku Fuku no Mi','Paramecia',27,'common',['utility'],'Creates temporary clothing and disguises from nearby material.'],
    ['giro-giro-no-mi','Giro Giro no Mi','Paramecia',66,'rare',['observation','psychic'],'Grants far-reaching sight and the ability to inspect thoughts and memories.'],
    ['gocha-gocha-no-mi','Gocha Gocha no Mi','Paramecia',61,'rare',['physical'],'Allows willing people to merge into a larger combined body.'],
    ['guru-guru-no-mi','Guru Guru no Mi','Paramecia',42,'common',['wind','physical'],'Turns body parts into propellers for movement and spinning attacks.'],
    ['hira-hira-no-mi','Hira Hira no Mi','Paramecia',54,'uncommon',['fabric','barrier'],'Makes touched objects wave and fold like flags while retaining their substance.'],
    ['ishi-ishi-no-mi','Ishi Ishi no Mi','Paramecia',73,'rare',['earth'],'Merges with stone and reshapes surrounding rock from within.'],
    ['jake-jake-no-mi','Jake Jake no Mi','Paramecia',29,'common',['physical'],'Turns the user into a wearable jacket that can share control with a wearer.'],
    ['juku-juku-no-mi','Juku Juku no Mi','Paramecia',58,'rare',['decay','time'],'Rapidly matures and decays inorganic material touched by the user.'],
    ['kibi-kibi-no-mi','Kibi Kibi no Mi','Paramecia',43,'uncommon',['organic'],'Produces dumplings that tame ordinary animals and many artificial Zoans.'],
    ['kira-kira-no-mi','Kira Kira no Mi','Paramecia',77,'rare',['earth','armor'],'Turns the body into diamond for exceptional hardness and striking force.'],
    ['kobu-kobu-no-mi','Kobu Kobu no Mi','Paramecia',58,'rare',['willpower','support'],'Rallies allies and draws out greater fighting spirit through encouragement.'],
    ['kuku-kuku-no-mi','Kuku Kuku no Mi','Paramecia',31,'common',['food','utility'],'Transforms ordinary objects into edible food with poor flavor.'],
    ['maki-maki-no-mi','Maki Maki no Mi','Paramecia',62,'rare',['spatial','utility'],'Uses scrolls to store and release objects or techniques.'],
    ['mato-mato-no-mi','Mato Mato no Mi','Paramecia',55,'uncommon',['projectile'],'Marks a touched target so thrown objects pursue them.'],
    ['memo-memo-no-mi','Memo Memo no Mi','Paramecia',67,'rare',['psychic','illusion'],'Extracts and edits memories represented as film-like strips.'],
    ['mira-mira-no-mi','Mira Mira no Mi','Paramecia',76,'epic',['reflection','spatial'],'Creates mirrors, reflects attacks, and opens routes through a mirror world.'],
    ['nagi-nagi-no-mi','Nagi Nagi no Mi','Paramecia',44,'uncommon',['silence'],'Creates silent fields that block sound from entering or escaping.'],
    ['netsu-netsu-no-mi','Netsu Netsu no Mi','Paramecia',66,'rare',['fire'],'Raises the user’s body heat to extreme temperatures.'],
    ['nui-nui-no-mi','Nui Nui no Mi','Paramecia',45,'uncommon',['restraint','utility'],'Stitches and unstitches living or nonliving targets without ordinary damage.'],
    ['oshi-oshi-no-mi','Oshi Oshi no Mi','Paramecia',74,'rare',['earth'],'Pushes and molds the ground as though it were pliable material.'],
    ['oto-oto-no-mi','Oto Oto no Mi','Paramecia',71,'rare',['sound'],'Turns body parts into instruments whose music produces damaging effects.'],
    ['pamu-pamu-no-mi','Pamu Pamu no Mi','Paramecia',68,'rare',['fire','explosive'],'Makes the user or touched inorganic objects swell and explode.'],
    ['pero-pero-no-mi','Pero Pero no Mi','Paramecia',70,'rare',['candy','barrier'],'Creates and controls candy for weapons, structures, and restraint.'],
    ['poke-poke-no-mi','Poke Poke no Mi','Paramecia',34,'common',['spatial','utility'],'Creates body pockets that store objects far larger than their openings.'],
    ['sabi-sabi-no-mi','Sabi Sabi no Mi','Paramecia',49,'uncommon',['decay','metal'],'Rusts metal and can rapidly degrade vulnerable material by touch.'],
    ['shibo-shibo-no-mi','Shibo Shibo no Mi','Paramecia',69,'rare',['water','drain'],'Wringes liquid from living beings and objects, then uses the absorbed moisture.'],
    ['shiro-shiro-no-mi','Shiro Shiro no Mi','Paramecia',73,'rare',['fortress','spatial'],'Turns the user’s body into a living fortress that can shelter people and weapons.'],
    ['sui-sui-no-mi','Sui Sui no Mi','Paramecia',53,'uncommon',['earth','mobility'],'Lets the user swim through solid ground and walls.'],
    ['toki-toki-no-mi','Toki Toki no Mi','Paramecia',80,'legendary',['time'],'Sends the user or others forward through time, never backward.'],
    ['ton-ton-no-mi','Ton Ton no Mi','Paramecia',62,'uncommon',['gravity','physical'],'Increases body weight up to enormous tonnage for crushing attacks.'],
    ['wara-wara-no-mi','Wara Wara no Mi','Paramecia',76,'epic',['plant','soul'],'Creates straw constructs and can link prepared dolls to other people.'],
    ['woshu-woshu-no-mi','Woshu Woshu no Mi','Paramecia',57,'rare',['water','restraint'],'Washes and hangs targets like laundry, restraining and reforming them.'],
    ['hoya-hoya-no-mi','Hoya Hoya no Mi','Paramecia',67,'rare',['spirit','fire'],'Summons a powerful genie from the user’s body.'],
    ['kuri-kuri-no-mi','Kuri Kuri no Mi','Paramecia',58,'uncommon',['food','fire'],'Creates and controls large amounts of hot cream.'],
    ['moku-moku-no-mi','Moku Moku no Mi','Logia',68,'rare',['smoke','flight'],'Creates, controls, and transforms into smoke.'],
    ['numa-numa-no-mi','Numa Numa no Mi','Logia',72,'rare',['earth','spatial'],'Creates, controls, and becomes a bottomless swamp-like substance.'],
    ['yuki-yuki-no-mi','Yuki Yuki no Mi','Logia',72,'rare',['snow','ice'],'Creates, controls, and transforms into snow.'],
    ['mori-mori-no-mi','Mori Mori no Mi','Logia',88,'epic',['plant','earth'],'Creates, controls, and transforms into vigorous plant life.'],
    ['hito-hito-no-mi','Hito Hito no Mi','Zoan',39,'uncommon',['physical'],'Grants a nonhuman eater human and human-hybrid forms.'],
    ['inu-inu-no-mi-model-dachshund','Inu Inu no Mi, Model: Dachshund','Zoan',35,'common',['physical'],'Transforms the eater into a dachshund or dachshund hybrid.'],
    ['inu-inu-no-mi-model-jackal','Inu Inu no Mi, Model: Jackal','Zoan',54,'uncommon',['physical'],'Transforms the user into a jackal or jackal hybrid.'],
    ['inu-inu-no-mi-model-wolf','Inu Inu no Mi, Model: Wolf','Zoan',60,'uncommon',['physical'],'Transforms the user into a wolf or wolf hybrid.'],
    ['inu-inu-no-mi-model-okuchi-no-makami','Inu Inu no Mi, Model: Okuchi no Makami','Mythical Zoan',91,'mythic',['ice','physical'],'Transforms the user into a guardian wolf deity with freezing breath.'],
    ['mogu-mogu-no-mi','Mogu Mogu no Mi','Zoan',42,'common',['earth','physical'],'Transforms the user into a mole or mole hybrid suited to tunneling.'],
    ['tori-tori-no-mi-model-falcon','Tori Tori no Mi, Model: Falcon','Zoan',58,'uncommon',['flight','physical'],'Transforms the user into a falcon or falcon hybrid capable of flight.'],
    ['ushi-ushi-no-mi-model-bison','Ushi Ushi no Mi, Model: Bison','Zoan',61,'uncommon',['physical'],'Transforms the user into a powerful bison or hybrid.'],
    ['ushi-ushi-no-mi-model-giraffe','Ushi Ushi no Mi, Model: Giraffe','Zoan',64,'uncommon',['physical'],'Transforms the user into a giraffe or hybrid with unusual reach.'],
    ['zou-zou-no-mi','Zou Zou no Mi','Zoan',67,'uncommon',['physical'],'Transforms the eater into an elephant or elephant hybrid.'],
    ['sara-sara-no-mi-model-axolotl','Sara Sara no Mi, Model: Axolotl','Zoan',47,'uncommon',['water','physical'],'Transforms the eater into an axolotl or axolotl hybrid.'],
    ['kame-kame-no-mi','Kame Kame no Mi','Zoan',51,'uncommon',['armor','physical'],'Transforms the user into a turtle or turtle hybrid with a hard shell.'],
    ['mushi-mushi-no-mi-model-kabutomushi','Mushi Mushi no Mi, Model: Kabutomushi','Zoan',56,'uncommon',['flight','physical'],'Transforms the user into a rhinoceros beetle or hybrid.'],
    ['mushi-mushi-no-mi-model-suzumebachi','Mushi Mushi no Mi, Model: Suzumebachi','Zoan',58,'uncommon',['flight','poison'],'Transforms the user into a hornet or hornet hybrid.'],
    ['tama-tama-no-mi','Tama Tama no Mi','Zoan',63,'rare',['physical','recovery'],'Gives the user an egg-to-chicken evolution cycle after severe damage.'],
    ['hebi-hebi-no-mi-model-anaconda','Hebi Hebi no Mi, Model: Anaconda','Zoan',58,'uncommon',['physical','restraint'],'Transforms the user into an anaconda or anaconda hybrid.'],
    ['hebi-hebi-no-mi-model-king-cobra','Hebi Hebi no Mi, Model: King Cobra','Zoan',61,'uncommon',['poison','physical'],'Transforms the user into a king cobra or hybrid.'],
    ['inu-inu-no-mi-model-tanuki','Inu Inu no Mi, Model: Tanuki','Zoan',35,'uncommon',['physical'],'Transforms the eater into a tanuki or tanuki hybrid.'],
    ['uma-uma-no-mi','Uma Uma no Mi','Zoan',44,'common',['physical','speed'],'Transforms the user into a horse or horse hybrid.'],
    ['ryu-ryu-no-mi-model-brachiosaurus','Ryu Ryu no Mi, Model: Brachiosaurus','Ancient Zoan',84,'epic',['physical','armor'],'Transforms the user into a massive brachiosaurus or hybrid.'],
    ['ryu-ryu-no-mi-model-spinosaurus','Ryu Ryu no Mi, Model: Spinosaurus','Ancient Zoan',82,'epic',['physical'],'Transforms the user into a spinosaurus or hybrid.'],
    ['ryu-ryu-no-mi-model-pachycephalosaurus','Ryu Ryu no Mi, Model: Pachycephalosaurus','Ancient Zoan',78,'epic',['physical','armor'],'Transforms the user into a pachycephalosaurus or hybrid.'],
    ['ryu-ryu-no-mi-model-triceratops','Ryu Ryu no Mi, Model: Triceratops','Ancient Zoan',83,'epic',['physical','armor'],'Transforms the user into a triceratops or hybrid.'],
    ['kumo-kumo-no-mi-model-rosamygale-grauvogeli','Kumo Kumo no Mi, Model: Rosamygale Grauvogeli','Ancient Zoan',81,'epic',['poison','restraint'],'Transforms the user into an ancient spider or hybrid.'],
    ['neko-neko-no-mi-model-saber-tiger','Neko Neko no Mi, Model: Saber Tiger','Ancient Zoan',84,'epic',['physical','speed'],'Transforms the user into a saber-toothed tiger or hybrid.'],
    ['hebi-hebi-no-mi-model-yamata-no-orochi','Hebi Hebi no Mi, Model: Yamata no Orochi','Mythical Zoan',89,'mythic',['physical','recovery'],'Transforms the user into the legendary eight-headed serpent.'],
    ['hito-hito-no-mi-model-onyudo','Hito Hito no Mi, Model: Onyudo','Mythical Zoan',74,'legendary',['physical','spirit'],'Transforms the eater into a large monk-like yokai form.'],
    ['tori-tori-no-mi-model-albatross','Tori Tori no Mi, Model: Albatross','Zoan',51,'uncommon',['flight','physical'],'Transforms the user into an albatross or albatross hybrid.'],
    ['suke-suke-no-mi','Suke Suke no Mi','Paramecia',61,'rare',['illusion','utility'],'Makes the user and touched objects invisible while the effect is maintained.'],
    ['shari-shari-no-mi','Shari Shari no Mi','Paramecia',46,'uncommon',['physical','mobility'],'Turns body parts into rapidly spinning wheels for movement and impact attacks.'],
    ['bata-bata-no-mi','Bata Bata no Mi','Paramecia',52,'uncommon',['food','restraint'],'Creates and controls butter that can bind targets and alter surfaces.']
  ];
  const supplemental=[
    ['fuwa-fuwa-no-mi','Fuwa Fuwa no Mi','Paramecia',86,'legendary',['gravity','flight'],'Lets the user levitate and control touched nonliving matter.']
  ];
  const fan=[
    ['shio-shio-no-mi','Shio Shio no Mi','Paramecia',48,'common',['earth','water'],'Creates and shapes salt for preservation, tracks, and brittle restraints.'],
    ['nori-nori-no-mi-model-adhesive','Nori Nori no Mi','Paramecia',45,'common',['restraint'],'Produces controllable adhesive with strength limited by moisture.'],
    ['kasa-kasa-no-mi','Kasa Kasa no Mi','Paramecia',41,'common',['utility','barrier'],'Creates folding umbrella-like shields and gliding surfaces.'],
    ['ito-ito-no-mi-model-thread-spool','Tsumugi Tsumugi no Mi','Paramecia',52,'uncommon',['fabric','restraint'],'Spins ordinary fibers into ropes, nets, sails, and layered armor.'],
    ['sumi-sumi-no-mi','Sumi Sumi no Mi','Paramecia',57,'uncommon',['art','smoke'],'Produces dense ink that obscures sight and records impressions.'],
    ['hane-hane-no-mi','Hane Hane no Mi','Paramecia',58,'uncommon',['flight','blade'],'Creates and controls lightweight feathers for gliding and volleys.'],
    ['kagi-kagi-no-mi','Kagi Kagi no Mi','Paramecia',55,'uncommon',['metal','utility'],'Creates keys that can open ordinary locks or temporarily seal mechanisms.'],
    ['kodo-kodo-no-mi','Kodo Kodo no Mi','Paramecia',63,'rare',['sound','willpower'],'Turns rhythmic heartbeats into pulses that steady allies or disrupt timing.'],
    ['garasu-garasu-no-mi','Garasu Garasu no Mi','Paramecia',67,'rare',['earth','reflection'],'Creates and shapes glass into lenses, traps, and fragile blades.'],
    ['hai-hai-no-mi','Hai Hai no Mi','Logia',72,'rare',['smoke','fire'],'Creates, controls, and becomes hot ash; wind scatters the body easily.'],
    ['kiri-kiri-no-mi','Kiri Kiri no Mi','Logia',70,'rare',['water','smoke'],'Creates, controls, and becomes mist with excellent concealment but low impact.'],
    ['neon-neon-no-mi','Neon Neon no Mi','Logia',82,'epic',['light','gas'],'Creates and becomes luminous ionized gas that excels at dazzling movement.'],
    ['namari-namari-no-mi','Namari Namari no Mi','Paramecia',74,'rare',['metal','poison'],'Creates and shapes lead, trading toughness for severe weight and toxicity.'],
    ['hibi-hibi-no-mi','Hibi Hibi no Mi','Paramecia',69,'rare',['vibration','earth'],'Places fractures in nonliving surfaces that spread under repeated force.'],
    ['ori-ori-no-mi-model-fold','Oru Oru no Mi','Paramecia',64,'rare',['spatial','utility'],'Folds distance along prepared surfaces for short, predictable shortcuts.'],
    ['yume-yume-no-mi','Yume Yume no Mi','Paramecia',76,'epic',['illusion','psychic'],'Pulls sleeping targets into shared dreamscapes but cannot directly alter reality.'],
    ['kagami-kagami-no-mi','Kagami Kagami no Mi','Paramecia',79,'epic',['reflection','light'],'Turns surfaces into temporary reflectors; unlike the Mirror Fruit it grants no pocket world.'],
    ['hakuryoku-hakuryoku-no-mi','Haku Haku no Mi','Paramecia',72,'epic',['willpower','illusion'],'Projects intimidating pressure that magnifies existing fear but cannot replace Haki.'],
    ['ryu-ryu-no-mi-model-komodo','Ryu Ryu no Mi, Model: Komodo Dragon','Zoan',66,'rare',['poison','physical'],'Transforms the user into a large venomous monitor lizard or hybrid.'],
    ['tori-tori-no-mi-model-owl','Tori Tori no Mi, Model: Owl','Zoan',57,'uncommon',['flight','observation'],'Transforms the user into an owl or hybrid with silent flight and night vision.'],
    ['mushi-mushi-no-mi-model-bombardier','Mushi Mushi no Mi, Model: Bombardier Beetle','Zoan',62,'rare',['fire','physical'],'Transforms the user into a beetle hybrid able to discharge hot chemical bursts.'],
    ['neko-neko-no-mi-model-lynx','Neko Neko no Mi, Model: Lynx','Zoan',61,'uncommon',['snow','physical'],'Transforms the user into a lynx or hybrid adapted to cold terrain.'],
    ['ushi-ushi-no-mi-model-musk-ox','Ushi Ushi no Mi, Model: Musk Ox','Zoan',65,'rare',['ice','physical'],'Transforms the user into a cold-resistant musk ox or hybrid.'],
    ['tori-tori-no-mi-model-roc','Tori Tori no Mi, Model: Roc','Mythical Zoan',91,'mythic',['wind','flight'],'Transforms the user into a colossal legendary bird that commands violent air currents.'],
    ['hito-hito-no-mi-model-kagutsuchi','Hito Hito no Mi, Model: Kagutsuchi','Mythical Zoan',94,'mythic',['fire','magma'],'Transforms the user into a fire-deity form whose heat rapidly exhausts its host.'],
    ['inu-inu-no-mi-model-barghest','Inu Inu no Mi, Model: Barghest','Mythical Zoan',88,'legendary',['darkness','physical'],'Transforms the user into a spectral black hound that hunts by fear and scent.'],
    ['kame-kame-no-mi-model-world-turtle','Kame Kame no Mi, Model: World Turtle','Mythical Zoan',93,'mythic',['earth','barrier'],'Transforms the user into a legendary turtle with immense defense and terrain control.'],
    ['ryu-ryu-no-mi-model-amphiptere','Ryu Ryu no Mi, Model: Amphiptere','Mythical Zoan',89,'legendary',['wind','poison','flight'],'Transforms the user into a winged serpent with venomous wind attacks.'],
    ['hoshi-hoshi-no-mi','Hoshi Hoshi no Mi','Paramecia',88,'legendary',['light','cosmic'],'Condenses small star-like motes; larger output rapidly drains stamina.'],
    ['kukan-kukan-no-mi','Kukan Kukan no Mi','Paramecia',95,'mythic',['spatial','gravity'],'Compresses small pockets of space but risks injuring the user when overextended.'],
    ['gyaku-gyaku-no-mi','Gyaku Gyaku no Mi','Paramecia',92,'mythic',['fruit-energy','spatial'],'Temporarily reverses one simple physical direction; complex effects resist inversion.'],
    ['unmei-unmei-no-mi','Unmei Unmei no Mi','Paramecia',93,'mythic',['time','psychic'],'Tilts a single near-future probability at severe cost without guaranteeing impossible outcomes.'],
    ['mu-mu-no-mi','Mu Mu no Mi','Paramecia',97,'anomaly',['darkness','fruit-energy'],'Erases a small nonliving effect for moments; living targets and Haki strongly resist it.'],
    ['seiza-seiza-no-mi','Seiza Seiza no Mi','Paramecia',90,'mythic',['cosmic','illusion'],'Forms constellation paths that guide movement and linked projectiles.'],
    ['rinne-rinne-no-mi','Rinne Rinne no Mi','Paramecia',94,'anomaly',['soul','time'],'Preserves one memory through death but does not grant ordinary resurrection.'],
    ['tsuki-tsuki-no-mi','Tsuki Tsuki no Mi','Paramecia',91,'mythic',['gravity','light'],'Changes localized tidal pull in phases tied to the visible moon.']
  ];
  const goose=entry(['tori-tori-no-mi-model-lunar-abyssal-goose-goddess','Tori Tori no Mi, Model: Lunar Abyssal Goose Goddess','Mythical Zoan',100,'anomaly',['cosmic','gravity','darkness'],'User-created Avian Eclipse fruit granting a goose-goddess transformation, gravity wells, eclipse constructs, and extreme flight.'],'fan');
  Object.assign(goose,{displayAlias:'Astral Goose Fruit',ownerCharacterId:'goose-eclipsed-goddess',baseRollable:true,rollWeight:.00008,loreRarity:{tier:'world-anomaly',label:'Singular alternate-world anomaly'},specialRules:['localized-singularity','eclipse-inversion','maanna-wings'],signatureTechniques:[{id:'abyssal-singularity',name:'Abyssal Singularity',description:'Creates tightly localized gravity wells; scale is limited by extreme stamina cost.'},{id:'fallen-venus-armament',name:'Fallen Venus Armament',description:'Launches homing gem-like projectiles under crushing gravity.'},{id:'maanna-wings',name:'Maanna Wings',description:'Celestial constructs provide extreme flight and maneuverability.'},{id:'eclipse-eyes',name:'Eclipse Eyes',description:'Reads energy flow, weaknesses, and emotion as an enhanced Observation ability.'}],strengths:['High-speed celestial flight','Localized gravity control','Eclipse fields can suppress exposed energy'],weaknesses:['Standard seawater and Seastone weakness','Large singularities consume extreme stamina','Inversion cannot freely override stronger Haki'],oc:true});
  const additions=[...canon.map(item=>entry(item)),...supplemental.map(item=>entry(item,'supplemental')),...fan.map(item=>entry(item,'fan')),goose];
  const existing=new Set((V4.database.fruits||[]).map(fruit=>fruit.id));
  for(const fruit of additions) if(!existing.has(fruit.id)){V4.database.fruits.push(fruit);existing.add(fruit.id);}
  const inferElements=fruit=>{const id=fruit.id||'';if(id.includes('mera'))return['fire'];if(id.includes('magu'))return['magma'];if(id.includes('goro'))return['electricity'];if(id.includes('hie'))return['ice'];if(id.includes('suna'))return['sand'];if(id.includes('yami'))return['darkness'];if(id.includes('pika'))return['light'];if(id.includes('gasu'))return['gas'];if(id.includes('gura'))return['vibration'];if(id.includes('gomu'))return['rubber'];if(id.includes('ope'))return['spatial'];if(id.includes('zushi'))return['gravity'];if(id.includes('doku'))return['poison'];return fruit.type.includes('Zoan')?['physical']:['fruit-energy'];};
  for(const fruit of V4.database.fruits){fruit.elementTags=fruit.elementTags?.length?fruit.elementTags:inferElements(fruit);fruit.rarityTier=fruit.rarityTier||(fruit.type==='Mythical Zoan'?'mythic':fruit.type==='Ancient Zoan'||fruit.type==='Logia'?'epic':fruit.power>=90?'legendary':fruit.power>=75?'rare':fruit.power>=55?'uncommon':'common');fruit.rollWeight=fruit.rollWeight??rarityWeights[fruit.rarityTier]??1;fruit.loreRarity=fruit.loreRarity||{tier:fruit.rarityTier};}
  const update=(id,data)=>{const fruit=V4.database.fruits.find(item=>item.id===id);if(fruit)Object.assign(fruit,data);};
  update('gomu-gomu-no-mi',{type:'Mythical Zoan',trueName:'Hito Hito no Mi, Model: Nika',model:'Nika',rarityTier:'anomaly',rollWeight:.00005,elementTags:['rubber','mythic'],loreRarity:{tier:'world-unique',label:'Unawakened for roughly eight centuries'},specialRules:['rubber-body','nika-awakening'],spoilerEra:'wano-end'});
  update('magu-magu-no-mi',{elementTags:['magma'],rarityTier:'legendary',rollWeight:.035,specialRules:['magma-overwhelms-ordinary-flame']});
  update('mera-mera-no-mi',{elementTags:['fire'],rarityTier:'epic',rollWeight:.18});
  update('yami-yami-no-mi',{elementTags:['darkness'],rarityTier:'anomaly',rollWeight:.004,specialRules:['fruit-power-nullification','forced-tangibility'],notes:['Blackbeard’s two-fruit state is a separate character exception; its mechanism is not confirmed.']});
  update('gura-gura-no-mi',{elementTags:['vibration'],rarityTier:'anomaly',rollWeight:.005});
  V4.database.fruitExpansion={version:'5.2.0',added:additions.length,canon:canon.length,supplemental:supplemental.length,fan:fan.length+1,rarityWeights};
}(window.OnePieceRollV4));


