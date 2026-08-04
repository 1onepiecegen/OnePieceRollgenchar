/* Authoritative mentor pool: only characters with a plausible teaching role. */
(function (V4) {
  'use strict';
  const mentors = [
  {
    "name": "Gol D. Roger",
    "title": "Pirate King",
    "haki": {
      "obs": 30,
      "arm": 30,
      "coc": 30
    },
    "combat": {
      "sword": 30,
      "brawl": 20,
      "shoot": 15,
      "martial": 10
    },
    "iq": 18,
    "phys": 25,
    "df": 0,
    "lead": 28,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "The ultimate Haki master with unrivaled swordsmanship.",
    "id": "gol-d-roger",
    "source": "canon",
    "tier": "legendary",
    "description": "The ultimate Haki master with unrivaled swordsmanship."
  },
  {
    "name": "Edward Newgate",
    "title": "Whitebeard",
    "haki": {
      "obs": 25,
      "arm": 30,
      "coc": 30
    },
    "combat": {
      "sword": 25,
      "brawl": 25,
      "shoot": 5,
      "martial": 15
    },
    "iq": 16,
    "phys": 28,
    "df": 22,
    "lead": 30,
    "spec": [
      "haki",
      "brawl",
      "df"
    ],
    "desc": "The strongest man in the world, master of the Tremor-Tremor fruit.",
    "id": "edward-newgate",
    "source": "canon",
    "tier": "legendary",
    "description": "The strongest man in the world, master of the Tremor-Tremor fruit."
  },
  {
    "name": "Shanks",
    "title": "Red-Haired",
    "haki": {
      "obs": 30,
      "arm": 28,
      "coc": 30
    },
    "combat": {
      "sword": 30,
      "brawl": 15,
      "shoot": 8,
      "martial": 10
    },
    "iq": 20,
    "phys": 22,
    "df": 0,
    "lead": 28,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "Absolute master of Conqueror's Haki and swordsmanship.",
    "id": "shanks",
    "source": "canon",
    "tier": "legendary",
    "description": "Absolute master of Conqueror's Haki and swordsmanship."
  },
  {
    "name": "Silvers Rayleigh",
    "title": "Dark King",
    "haki": {
      "obs": 28,
      "arm": 28,
      "coc": 22
    },
    "combat": {
      "sword": 26,
      "brawl": 15,
      "shoot": 5,
      "martial": 12
    },
    "iq": 24,
    "phys": 20,
    "df": 8,
    "lead": 18,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "Roger's right hand — the greatest living Haki teacher.",
    "id": "silvers-rayleigh",
    "source": "canon",
    "tier": "legendary",
    "description": "Roger's right hand — the greatest living Haki teacher."
  },
  {
    "name": "Monkey D. Garp",
    "title": "Garp the Fist",
    "haki": {
      "obs": 22,
      "arm": 30,
      "coc": 20
    },
    "combat": {
      "sword": 0,
      "brawl": 30,
      "shoot": 5,
      "martial": 22
    },
    "iq": 12,
    "phys": 30,
    "df": 0,
    "lead": 22,
    "spec": [
      "haki",
      "brawl",
      "martial"
    ],
    "desc": "The legendary Marine hero whose bare fists can destroy mountains.",
    "id": "monkey-d-garp",
    "source": "canon",
    "tier": "legendary",
    "description": "The legendary Marine hero whose bare fists can destroy mountains."
  },
  {
    "name": "Dracule Mihawk",
    "title": "Hawk Eyes",
    "haki": {
      "obs": 28,
      "arm": 30,
      "coc": 10
    },
    "combat": {
      "sword": 30,
      "brawl": 8,
      "shoot": 0,
      "martial": 5
    },
    "iq": 18,
    "phys": 18,
    "df": 0,
    "lead": 5,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "The World's Strongest Swordsman with peerless blade skill.",
    "id": "dracule-mihawk",
    "source": "canon",
    "tier": "legendary",
    "description": "The World's Strongest Swordsman with peerless blade skill."
  },
  {
    "name": "Sengoku",
    "title": "The Buddha",
    "haki": {
      "obs": 22,
      "arm": 25,
      "coc": 25
    },
    "combat": {
      "sword": 5,
      "brawl": 20,
      "shoot": 5,
      "martial": 22
    },
    "iq": 30,
    "phys": 20,
    "df": 25,
    "lead": 26,
    "spec": [
      "haki",
      "martial",
      "df"
    ],
    "desc": "Brilliant strategist with a Mythical Zoan granting shockwaves.",
    "id": "sengoku",
    "source": "canon",
    "tier": "elite",
    "description": "Brilliant strategist with a Mythical Zoan granting shockwaves."
  },
  {
    "name": "Kozuki Oden",
    "title": "Daimyo of Kuri",
    "haki": {
      "obs": 22,
      "arm": 30,
      "coc": 25
    },
    "combat": {
      "sword": 30,
      "brawl": 15,
      "shoot": 0,
      "martial": 10
    },
    "iq": 12,
    "phys": 26,
    "df": 0,
    "lead": 20,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "Master of the Two-Sword Style and immense Armament Haki.",
    "id": "kozuki-oden",
    "source": "canon",
    "tier": "elite",
    "description": "Master of the Two-Sword Style and immense Armament Haki."
  },
  {
    "name": "Jinbe",
    "title": "Knight of the Sea",
    "haki": {
      "obs": 16,
      "arm": 26,
      "coc": 0
    },
    "combat": {
      "sword": 0,
      "brawl": 26,
      "shoot": 0,
      "martial": 30
    },
    "iq": 20,
    "phys": 26,
    "df": 0,
    "lead": 20,
    "spec": [
      "haki",
      "martial"
    ],
    "desc": "The undisputed master of Fishman Karate.",
    "id": "jinbe",
    "source": "canon",
    "tier": "elite",
    "description": "The undisputed master of Fishman Karate."
  },
  {
    "name": "Marco",
    "title": "The Phoenix",
    "haki": {
      "obs": 20,
      "arm": 20,
      "coc": 0
    },
    "combat": {
      "sword": 0,
      "brawl": 25,
      "shoot": 0,
      "martial": 20
    },
    "iq": 20,
    "phys": 20,
    "df": 26,
    "lead": 16,
    "spec": [
      "brawl",
      "df",
      "medicine"
    ],
    "desc": "Mythical Zoan user with peerless regenerative capabilities.",
    "id": "marco",
    "source": "canon",
    "tier": "elite",
    "description": "Mythical Zoan user with peerless regenerative capabilities."
  },
  {
    "name": "Monkey D. Dragon",
    "title": "World's Worst Criminal",
    "haki": {
      "obs": 25,
      "arm": 25,
      "coc": 28
    },
    "combat": {
      "sword": 10,
      "brawl": 20,
      "shoot": 10,
      "martial": 25
    },
    "iq": 28,
    "phys": 20,
    "df": 22,
    "lead": 30,
    "spec": [
      "haki",
      "martial",
      "df"
    ],
    "desc": "Enigmatic leader of the Revolutionaries.",
    "id": "monkey-d-dragon",
    "source": "canon",
    "tier": "elite",
    "description": "Enigmatic leader of the Revolutionaries."
  },
  {
    "name": "Shiki",
    "title": "Golden Lion",
    "haki": {
      "obs": 20,
      "arm": 20,
      "coc": 18
    },
    "combat": {
      "sword": 25,
      "brawl": 10,
      "shoot": 5,
      "martial": 10
    },
    "iq": 16,
    "phys": 20,
    "df": 22,
    "lead": 15,
    "spec": [
      "sword",
      "df"
    ],
    "desc": "Legendary pirate with the Float-Float fruit and dual swords.",
    "id": "shiki",
    "source": "canon",
    "tier": "notable",
    "description": "Legendary pirate with the Float-Float fruit and dual swords."
  },
  {
    "name": "Scopper Gaban",
    "title": "Roger's Left Hand",
    "haki": {
      "obs": 20,
      "arm": 25,
      "coc": 10
    },
    "combat": {
      "sword": 18,
      "brawl": 22,
      "shoot": 5,
      "martial": 15
    },
    "iq": 15,
    "phys": 22,
    "df": 0,
    "lead": 12,
    "spec": [
      "haki",
      "brawl"
    ],
    "desc": "Dual axe-wielding powerhouse from the Roger Pirates.",
    "id": "scopper-gaban",
    "source": "canon",
    "tier": "notable",
    "description": "Dual axe-wielding powerhouse from the Roger Pirates."
  },
  {
    "name": "Benn Beckman",
    "title": "First Mate",
    "haki": {
      "obs": 26,
      "arm": 25,
      "coc": 10
    },
    "combat": {
      "sword": 10,
      "brawl": 18,
      "shoot": 30,
      "martial": 12
    },
    "iq": 28,
    "phys": 20,
    "df": 0,
    "lead": 20,
    "spec": [
      "haki",
      "shoot"
    ],
    "desc": "Genius combatant who infuses bullets with immense Haki.",
    "id": "benn-beckman",
    "source": "canon",
    "tier": "notable",
    "description": "Genius combatant who infuses bullets with immense Haki."
  },
  {
    "name": "Yasopp",
    "title": "Chaser",
    "haki": {
      "obs": 30,
      "arm": 15,
      "coc": 0
    },
    "combat": {
      "sword": 0,
      "brawl": 10,
      "shoot": 30,
      "martial": 5
    },
    "iq": 16,
    "phys": 15,
    "df": 0,
    "lead": 6,
    "spec": [
      "haki",
      "shoot"
    ],
    "desc": "Unrivaled sniper of the Red Hair Pirates.",
    "id": "yasopp",
    "source": "canon",
    "tier": "notable",
    "description": "Unrivaled sniper of the Red Hair Pirates."
  },
  {
    "name": "Sabo",
    "title": "Flame Emperor",
    "haki": {
      "obs": 20,
      "arm": 25,
      "coc": 0
    },
    "combat": {
      "sword": 10,
      "brawl": 20,
      "shoot": 5,
      "martial": 28
    },
    "iq": 20,
    "phys": 22,
    "df": 22,
    "lead": 20,
    "spec": [
      "haki",
      "martial",
      "df"
    ],
    "desc": "Ryusoken martial artist possessing the Flame-Flame fruit.",
    "id": "sabo",
    "source": "canon",
    "tier": "notable",
    "description": "Ryusoken martial artist possessing the Flame-Flame fruit."
  },
  {
    "name": "Emporio Ivankov",
    "title": "Miracle Person",
    "haki": {
      "obs": 15,
      "arm": 15,
      "coc": 0
    },
    "combat": {
      "sword": 0,
      "brawl": 16,
      "shoot": 10,
      "martial": 26
    },
    "iq": 20,
    "phys": 18,
    "df": 24,
    "lead": 15,
    "spec": [
      "martial",
      "df"
    ],
    "desc": "Newkama Kenpo master and hormone-manipulating doctor.",
    "id": "emporio-ivankov",
    "source": "canon",
    "tier": "notable",
    "description": "Newkama Kenpo master and hormone-manipulating doctor."
  },
  {
    "name": "Koala",
    "title": "Fishman Karate Master",
    "haki": {
      "obs": 15,
      "arm": 15,
      "coc": 0
    },
    "combat": {
      "sword": 0,
      "brawl": 15,
      "shoot": 5,
      "martial": 26
    },
    "iq": 20,
    "phys": 15,
    "df": 0,
    "lead": 10,
    "spec": [
      "martial"
    ],
    "desc": "Human who mastered Fishman Karate to a high degree.",
    "id": "koala",
    "source": "canon",
    "tier": "notable",
    "description": "Human who mastered Fishman Karate to a high degree."
  },
  {
    "name": "Hyogoro",
    "title": "Hyogoro of the Flower",
    "haki": {
      "obs": 16,
      "arm": 26,
      "coc": 0
    },
    "combat": {
      "sword": 20,
      "brawl": 15,
      "shoot": 0,
      "martial": 10
    },
    "iq": 16,
    "phys": 16,
    "df": 0,
    "lead": 15,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "Master of Ryuo (Advanced Armament) from Wano.",
    "id": "hyogoro",
    "source": "canon",
    "tier": "notable",
    "description": "Master of Ryuo (Advanced Armament) from Wano."
  },
  {
    "name": "Denjiro",
    "title": "Kyoshiro",
    "haki": {
      "obs": 20,
      "arm": 25,
      "coc": 0
    },
    "combat": {
      "sword": 28,
      "brawl": 12,
      "shoot": 0,
      "martial": 8
    },
    "iq": 24,
    "phys": 20,
    "df": 0,
    "lead": 12,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "Cunning tactician and elite swordsman of the Akazaya.",
    "id": "denjiro",
    "source": "canon",
    "tier": "notable",
    "description": "Cunning tactician and elite swordsman of the Akazaya."
  },
  {
    "name": "Kin'emon",
    "title": "Foxfire",
    "haki": {
      "obs": 16,
      "arm": 20,
      "coc": 0
    },
    "combat": {
      "sword": 26,
      "brawl": 10,
      "shoot": 0,
      "martial": 8
    },
    "iq": 18,
    "phys": 16,
    "df": 12,
    "lead": 12,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "Leader of the Akazaya, cuts and manipulates fire.",
    "id": "kin-emon",
    "source": "canon",
    "tier": "notable",
    "description": "Leader of the Akazaya, cuts and manipulates fire."
  },
  {
    "name": "Inuarashi",
    "title": "Duke Dogstorm",
    "haki": {
      "obs": 16,
      "arm": 25,
      "coc": 0
    },
    "combat": {
      "sword": 26,
      "brawl": 16,
      "shoot": 5,
      "martial": 12
    },
    "iq": 20,
    "phys": 22,
    "df": 0,
    "lead": 16,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "Mink leader and strong swordsman who uses Electro.",
    "id": "inuarashi",
    "source": "canon",
    "tier": "notable",
    "description": "Mink leader and strong swordsman who uses Electro."
  },
  {
    "name": "Vegapunk",
    "title": "World's Greatest Mind",
    "haki": {
      "obs": 6,
      "arm": 0,
      "coc": 0
    },
    "combat": {
      "sword": 0,
      "brawl": 0,
      "shoot": 12,
      "martial": 0
    },
    "iq": 30,
    "phys": 5,
    "df": 26,
    "lead": 8,
    "spec": [
      "science",
      "df"
    ],
    "desc": "Unrivaled genius who understands the truth of Devil Fruits.",
    "id": "vegapunk",
    "source": "canon",
    "tier": "notable",
    "description": "Unrivaled genius who understands the truth of Devil Fruits."
  },
  {
    "name": "Zeff",
    "title": "Red Leg",
    "haki": {
      "obs": 15,
      "arm": 15,
      "coc": 0
    },
    "combat": {
      "sword": 0,
      "brawl": 12,
      "shoot": 0,
      "martial": 26
    },
    "iq": 20,
    "phys": 16,
    "df": 0,
    "lead": 12,
    "spec": [
      "martial",
      "cooking"
    ],
    "desc": "Creator of the Black Leg style and master chef.",
    "id": "zeff",
    "source": "canon",
    "tier": "notable",
    "description": "Creator of the Black Leg style and master chef."
  },
  {
    "name": "Koshiro",
    "title": "Dojo Master",
    "haki": {
      "obs": 20,
      "arm": 20,
      "coc": 0
    },
    "combat": {
      "sword": 26,
      "brawl": 5,
      "shoot": 0,
      "martial": 10
    },
    "iq": 20,
    "phys": 15,
    "df": 0,
    "lead": 12,
    "spec": [
      "haki",
      "sword"
    ],
    "desc": "Zoro's childhood teacher, understands the breath of all things.",
    "id": "koshiro",
    "source": "canon",
    "tier": "notable",
    "description": "Zoro's childhood teacher, understands the breath of all things."
  },
  {
    "name": "Dr. Kureha",
    "title": "Master Doctor",
    "haki": {
      "obs": 10,
      "arm": 5,
      "coc": 0
    },
    "combat": {
      "sword": 5,
      "brawl": 8,
      "shoot": 12,
      "martial": 5
    },
    "iq": 26,
    "phys": 10,
    "df": 0,
    "lead": 6,
    "spec": [
      "medicine"
    ],
    "desc": "Extremely long-lived doctor with perfect medical knowledge.",
    "id": "dr-kureha",
    "source": "canon",
    "tier": "notable",
    "description": "Extremely long-lived doctor with perfect medical knowledge."
  },
  {
    "name": "Vinsmoke Judge",
    "title": "Garuda",
    "haki": {
      "obs": 12,
      "arm": 15,
      "coc": 0
    },
    "combat": {
      "sword": 8,
      "brawl": 16,
      "shoot": 12,
      "martial": 22
    },
    "iq": 26,
    "phys": 20,
    "df": 0,
    "lead": 16,
    "spec": [
      "martial",
      "science"
    ],
    "desc": "Commander of Germa 66, fights with advanced tech.",
    "id": "vinsmoke-judge",
    "source": "canon",
    "tier": "notable",
    "description": "Commander of Germa 66, fights with advanced tech."
  },
  {
    "name": "Don Chinjao",
    "title": "The Drill",
    "haki": {
      "obs": 15,
      "arm": 26,
      "coc": 18
    },
    "combat": {
      "sword": 0,
      "brawl": 26,
      "shoot": 0,
      "martial": 22
    },
    "iq": 15,
    "phys": 22,
    "df": 0,
    "lead": 12,
    "spec": [
      "haki",
      "martial"
    ],
    "desc": "Hasshoken master with a legendary headbutt.",
    "id": "don-chinjao",
    "source": "canon",
    "tier": "notable",
    "description": "Hasshoken master with a legendary headbutt."
  },
  {
    "name": "Tsuru",
    "title": "Great Staff Officer",
    "haki": {
      "obs": 24,
      "arm": 15,
      "coc": 0
    },
    "combat": {
      "sword": 5,
      "brawl": 10,
      "shoot": 10,
      "martial": 15
    },
    "iq": 28,
    "phys": 12,
    "df": 16,
    "lead": 16,
    "spec": [
      "haki",
      "martial",
      "df"
    ],
    "desc": "Marine tactician who washes away the evil in people's hearts.",
    "id": "tsuru",
    "source": "canon",
    "tier": "notable",
    "description": "Marine tactician who washes away the evil in people's hearts."
  },
  {
    "name": "Kong",
    "title": "Commander-in-Chief",
    "haki": {
      "obs": 18,
      "arm": 24,
      "coc": 20
    },
    "combat": {
      "sword": 5,
      "brawl": 24,
      "shoot": 5,
      "martial": 14
    },
    "iq": 22,
    "phys": 24,
    "df": 0,
    "lead": 28,
    "spec": [
      "haki",
      "brawl"
    ],
    "desc": "Former Fleet Admiral and current highest military authority.",
    "id": "kong",
    "source": "canon",
    "tier": "notable",
    "description": "Former Fleet Admiral and current highest military authority."
  },
  {
    "name": "Nekomamushi",
    "title": "Duke Cat Viper",
    "haki": {
      "obs": 16,
      "arm": 24,
      "coc": 0
    },
    "combat": {
      "sword": 18,
      "brawl": 20,
      "shoot": 0,
      "martial": 16
    },
    "iq": 16,
    "phys": 24,
    "df": 0,
    "lead": 16,
    "spec": [
      "haki",
      "brawl",
      "martial"
    ],
    "desc": "Mink ruler who fights with claws, Electro, and fierce loyalty.",
    "id": "nekomamushi",
    "source": "canon",
    "tier": "notable",
    "description": "Mink ruler who fights with claws, Electro, and fierce loyalty."
  },
  {
    "name": "Heracles",
    "title": "Boin Archipelago Survivalist",
    "haki": { "obs": 8, "arm": 4, "coc": 0 },
    "combat": { "sword": 0, "brawl": 8, "shoot": 20, "martial": 4 },
    "iq": 14,
    "phys": 12,
    "df": 0,
    "lead": 7,
    "spec": ["shoot", "survival"],
    "desc": "A patient survival teacher with practical knowledge of unusual plants and ranged preparation.",
    "id": "heracles",
    "source": "canon",
    "tier": "notable",
    "description": "A patient survival teacher with practical knowledge of unusual plants and ranged preparation."
  },
  {
    "name": "Haredas",
    "title": "Weatheria Scholar",
    "haki": { "obs": 4, "arm": 0, "coc": 0 },
    "combat": { "sword": 0, "brawl": 2, "shoot": 0, "martial": 0 },
    "iq": 25,
    "phys": 3,
    "df": 0,
    "lead": 9,
    "spec": ["science", "weather"],
    "desc": "A Weatheria scholar who can teach climate observation, weather science, and navigation tools.",
    "id": "haredas",
    "source": "canon",
    "tier": "notable",
    "description": "A Weatheria scholar who can teach climate observation, weather science, and navigation tools."
  },
  {
    "name": "Roronoa Zoro",
    "title": "Pirate Hunter",
    "haki": { "obs": 16, "arm": 30, "coc": 22 },
    "combat": { "sword": 30, "brawl": 10, "shoot": 0, "martial": 5 },
    "iq": 10,
    "phys": 26,
    "df": 0,
    "lead": 6,
    "spec": ["haki", "sword"],
    "desc": "Master of the Three-Sword Style and advanced Armament.",
    "id": "roronoa-zoro",
    "source": "canon",
    "tier": "elite",
    "description": "Master of the Three-Sword Style and advanced Armament."
  }
];
  const tierWeights = { legendary: 1, elite: 17, notable: 122, 'self-taught': 60 };
  const characterIds = new Set((V4.database.characters || []).map(character => character.id));
  V4.database.mentors = mentors.map(mentor => ({ ...mentor, characterId: characterIds.has(mentor.id) ? mentor.id : null, profileId: `mentor-${mentor.id}`, teachingTags: mentor.spec || [], teachableFoundationIds: (mentor.spec || []).includes('sword') ? ['swordsmanship'] : (mentor.spec || []).includes('martial') ? ['basic-martial-arts'] : [], teachableDisciplineIds: [], teachableTechniqueIds: [], requirements:{}, limitations:[], trainingStyle: mentor.tier === 'legendary' ? 'demanding' : 'structured', availabilityTags:[mentor.tier === 'legendary' ? 'rare-encounter' : 'world-encounter'] }));
  V4.database.mentorWeights = Object.freeze(tierWeights);
}(window.OnePieceRollV4));


