/* General One Piece character references. This catalog is independent from the mentor pool. */
(function (V4) {
  'use strict';
  const references = [
  {
    "id": "gol-d-roger",
    "name": "Gol D. Roger",
    "source": "canon",
    "referenceTier": "legendary",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "gol-d-roger",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "edward-newgate",
    "name": "Edward Newgate",
    "source": "canon",
    "referenceTier": "legendary",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "mentorId": "edward-newgate",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "shanks",
    "name": "Shanks",
    "source": "canon",
    "referenceTier": "legendary",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "shanks",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "silvers-rayleigh",
    "name": "Silvers Rayleigh",
    "source": "canon",
    "referenceTier": "legendary",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "silvers-rayleigh",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "monkey-d-garp",
    "name": "Monkey D. Garp",
    "source": "canon",
    "referenceTier": "legendary",
    "tags": [
      "haki",
      "brawl",
      "martial"
    ],
    "mentorId": "monkey-d-garp",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "dracule-mihawk",
    "name": "Dracule Mihawk",
    "source": "canon",
    "referenceTier": "legendary",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "dracule-mihawk",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "kaido",
    "name": "Kaido",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "charlotte-linlin",
    "name": "Charlotte Linlin",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "marshall-d-teach",
    "name": "Marshall D. Teach",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "sakazuki",
    "name": "Sakazuki",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kuzan",
    "name": "Kuzan",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "borsalino",
    "name": "Borsalino",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "shoot",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "issho",
    "name": "Issho",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "sword",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "sengoku",
    "name": "Sengoku",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "martial",
      "df"
    ],
    "mentorId": "sengoku",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "kozuki-oden",
    "name": "Kozuki Oden",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "kozuki-oden",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "charlotte-katakuri",
    "name": "Charlotte Katakuri",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "donquixote-doflamingo",
    "name": "Donquixote Doflamingo",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "boa-hancock",
    "name": "Boa Hancock",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "jinbe",
    "name": "Jinbe",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "martial"
    ],
    "mentorId": "jinbe",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "marco",
    "name": "Marco",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "brawl",
      "df",
      "medicine"
    ],
    "mentorId": "marco",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "crocodile",
    "name": "Crocodile",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "monkey-d-dragon",
    "name": "Monkey D. Dragon",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "martial",
      "df"
    ],
    "mentorId": "monkey-d-dragon",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "rob-lucci",
    "name": "Rob Lucci",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "trafalgar-law",
    "name": "Trafalgar Law",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "sword",
      "df",
      "medicine"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "portgas-d-ace",
    "name": "Portgas D. Ace",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "roronoa-zoro",
    "name": "Roronoa Zoro",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "sword"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "sanji",
    "name": "Sanji",
    "source": "canon",
    "referenceTier": "elite",
    "tags": [
      "haki",
      "martial",
      "cooking"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "shiki",
    "name": "Shiki",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "df"
    ],
    "mentorId": "shiki",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "scopper-gaban",
    "name": "Scopper Gaban",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "brawl"
    ],
    "mentorId": "scopper-gaban",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "king",
    "name": "King",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "queen",
    "name": "Queen",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df",
      "science"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "jack",
    "name": "Jack",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "cracker",
    "name": "Cracker",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "smoothie",
    "name": "Smoothie",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "benn-beckman",
    "name": "Benn Beckman",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "shoot"
    ],
    "mentorId": "benn-beckman",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "yasopp",
    "name": "Yasopp",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "shoot"
    ],
    "mentorId": "yasopp",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "jozu",
    "name": "Jozu",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "vista",
    "name": "Vista",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "eustass-kid",
    "name": "Eustass Kid",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "killer",
    "name": "Killer",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "x-drake",
    "name": "X Drake",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "basil-hawkins",
    "name": "Basil Hawkins",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "capone-bege",
    "name": "Capone Bege",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "shoot",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "urouge",
    "name": "Urouge",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "jewelry-bonney",
    "name": "Jewelry Bonney",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "nico-robin",
    "name": "Nico Robin",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "franky",
    "name": "Franky",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "shoot",
      "science"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "brook",
    "name": "Brook",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "usopp",
    "name": "Usopp",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "shoot"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "nami",
    "name": "Nami",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "navigation"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "tony-tony-chopper",
    "name": "Tony Tony Chopper",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df",
      "medicine"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "sabo",
    "name": "Sabo",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "martial",
      "df"
    ],
    "mentorId": "sabo",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "emporio-ivankov",
    "name": "Emporio Ivankov",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "mentorId": "emporio-ivankov",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "koala",
    "name": "Koala",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial"
    ],
    "mentorId": "koala",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "kaku",
    "name": "Kaku",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "jabra",
    "name": "Jabra",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "stussy",
    "name": "Stussy",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "hyogoro",
    "name": "Hyogoro",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "hyogoro",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "denjiro",
    "name": "Denjiro",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "denjiro",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "ashura-doji",
    "name": "Ashura Doji",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword",
      "brawl"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kawamatsu",
    "name": "Kawamatsu",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kin-emon",
    "name": "Kin'emon",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "kin-emon",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "inuarashi",
    "name": "Inuarashi",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "inuarashi",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "vegapunk",
    "name": "Vegapunk",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "science",
      "df"
    ],
    "mentorId": "vegapunk",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "zeff",
    "name": "Zeff",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "cooking"
    ],
    "mentorId": "zeff",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "koshiro",
    "name": "Koshiro",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword"
    ],
    "mentorId": "koshiro",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "dr-kureha",
    "name": "Dr. Kureha",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "medicine"
    ],
    "mentorId": "dr-kureha",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "caesar-clown",
    "name": "Caesar Clown",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df",
      "science"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "vinsmoke-judge",
    "name": "Vinsmoke Judge",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "science"
    ],
    "mentorId": "vinsmoke-judge",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "enel",
    "name": "Enel",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "don-chinjao",
    "name": "Don Chinjao",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "martial"
    ],
    "mentorId": "don-chinjao",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "cavendish",
    "name": "Cavendish",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "bartholomew-kuma",
    "name": "Bartholomew Kuma",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df",
      "science"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "gecko-moria",
    "name": "Gecko Moria",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "magellan",
    "name": "Magellan",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "smoker",
    "name": "Smoker",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "tsuru",
    "name": "Tsuru",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "martial",
      "df"
    ],
    "mentorId": "tsuru",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "koby",
    "name": "Koby",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "vergo",
    "name": "Vergo",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "tashigi",
    "name": "Tashigi",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "haki"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "hina",
    "name": "Hina",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "sentomaru",
    "name": "Sentomaru",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "brawl"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kalifa",
    "name": "Kalifa",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "blueno",
    "name": "Blueno",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "guernica",
    "name": "Guernica",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "arlong",
    "name": "Arlong",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kuro",
    "name": "Kuro",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "don-krieg",
    "name": "Don Krieg",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "shoot"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "buggy",
    "name": "Buggy",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "alvida",
    "name": "Alvida",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kuroobi",
    "name": "Kuroobi",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "hachi",
    "name": "Hachi",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "mr-1",
    "name": "Mr. 1",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "mr-2",
    "name": "Mr. 2",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "mr-3",
    "name": "Mr. 3",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "miss-doublefinger",
    "name": "Miss Doublefinger",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "pell",
    "name": "Pell",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "chaka",
    "name": "Chaka",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "wyper",
    "name": "Wyper",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "ohm",
    "name": "Ohm",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "haki"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "shura",
    "name": "Shura",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "satori",
    "name": "Satori",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "gedatsu",
    "name": "Gedatsu",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "fukurou",
    "name": "Fukurou",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kumadori",
    "name": "Kumadori",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "nero",
    "name": "Nero",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "perona",
    "name": "Perona",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "absalom",
    "name": "Absalom",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "hogback",
    "name": "Hogback",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "medicine",
      "science"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "thatch",
    "name": "Thatch",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "izou",
    "name": "Izou",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "shoot"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "haruta",
    "name": "Haruta",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "atmos",
    "name": "Atmos",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "charlotte-perospero",
    "name": "Charlotte Perospero",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "charlotte-oven",
    "name": "Charlotte Oven",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "charlotte-daifuku",
    "name": "Charlotte Daifuku",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "who-s-who",
    "name": "Who's-Who",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "black-maria",
    "name": "Black Maria",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "sasaki",
    "name": "Sasaki",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "sword",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "ulti",
    "name": "Ulti",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "page-one",
    "name": "Page One",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "scratchmen-apoo",
    "name": "Scratchmen Apoo",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "shoot",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "monkey-d-luffy",
    "name": "Monkey D. Luffy",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "haki",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "edward-weevil",
    "name": "Edward Weevil",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "buggy-the-clown",
    "name": "Buggy",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "ryokugyu",
    "name": "Ryokugyu",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kong",
    "name": "Kong",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "brawl"
    ],
    "mentorId": "kong",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "belo-betty",
    "name": "Belo Betty",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df",
      "lead"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "karasu",
    "name": "Karasu",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "morley",
    "name": "Morley",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "lindbergh",
    "name": "Lindbergh",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "shoot",
      "science"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "maha",
    "name": "Maha",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "gismonda",
    "name": "Gismonda",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "shoot"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "nekomamushi",
    "name": "Nekomamushi",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "brawl",
      "martial"
    ],
    "mentorId": "nekomamushi",
    "knownWeaponIds": [],
    "isMentor": true
  },
  {
    "id": "raizo",
    "name": "Raizo",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "kikunojo",
    "name": "Kikunojo",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "sword"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "shinobu",
    "name": "Shinobu",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "df",
      "martial"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  {
    "id": "yamato",
    "name": "Yamato",
    "source": "canon",
    "referenceTier": "notable",
    "tags": [
      "haki",
      "brawl",
      "df"
    ],
    "knownWeaponIds": [],
    "isMentor": false
  },
  { "id": "nefertari-vivi", "name": "Nefertari Vivi", "source": "canon", "referenceTier": "notable", "tags": ["leadership", "diplomacy"], "knownWeaponIds": [], "isMentor": false },
  { "id": "karoo", "name": "Karoo", "source": "canon", "referenceTier": "ordinary", "tags": ["mount", "loyalty"], "knownWeaponIds": [], "isMentor": false },
  { "id": "dr-hiluluk", "name": "Dr. Hiluluk", "source": "canon", "referenceTier": "notable", "tags": ["medicine", "will"], "knownWeaponIds": [], "isMentor": false },
  { "id": "dalton", "name": "Dalton", "source": "canon", "referenceTier": "notable", "tags": ["leadership", "zoan"], "knownWeaponIds": [], "isMentor": false },
  { "id": "dorry", "name": "Dorry", "source": "canon", "referenceTier": "notable", "tags": ["giant", "axe"], "knownWeaponIds": [], "isMentor": false },
  { "id": "brogy", "name": "Brogy", "source": "canon", "referenceTier": "notable", "tags": ["giant", "axe"], "knownWeaponIds": [], "isMentor": false },
  { "id": "iceburg", "name": "Iceburg", "source": "canon", "referenceTier": "notable", "tags": ["shipwright", "leadership"], "knownWeaponIds": [], "isMentor": false },
  { "id": "paulie", "name": "Paulie", "source": "canon", "referenceTier": "ordinary", "tags": ["shipwright", "rope"], "knownWeaponIds": [], "isMentor": false },
  { "id": "heracles", "name": "Heracles", "source": "canon", "referenceTier": "notable", "tags": ["shoot", "survival"], "knownWeaponIds": [], "isMentor": false },
  { "id": "haredas", "name": "Haredas", "source": "canon", "referenceTier": "notable", "tags": ["weather", "science"], "knownWeaponIds": [], "isMentor": false }
];
  const reviewed = {
    'monkey-d-luffy': { affiliations:['straw-hat-pirates'], roles:['captain','combatant'], encounterTags:['pirate','new-world'], combatProfileId:'combat-monkey-d-luffy-late-wano', fruitId:'gomu-gomu-no-mi', foundationIds:['basic-martial-arts'], disciplineIds:[], hakiProfile:{observation:true,armament:true,conquerors:true,advancedObservation:true,advancedArmament:true,conquerorsCoating:true} },
    'roronoa-zoro': { affiliations:['straw-hat-pirates'], roles:['combatant','swordsman'], encounterTags:['pirate','new-world','sword-user'], combatProfileId:'combat-roronoa-zoro-late-wano', weaponIds:['wado-ichimonji','sandai-kitetsu','enma'], foundationIds:['swordsmanship'], disciplineIds:['one-sword-style','two-sword-style','three-sword-style'], advancedStateIds:['asura-nine-sword'], hakiProfile:{observation:true,armament:true,conquerors:true,advancedObservation:false,advancedArmament:true,conquerorsCoating:true} },
    'sanji': { affiliations:['straw-hat-pirates'], roles:['combatant','cook'], encounterTags:['pirate','new-world'], combatProfileId:'combat-sanji-late-wano', foundationIds:['basic-martial-arts'], disciplineIds:['black-leg-style'], hakiProfile:{observation:true,armament:true,conquerors:false,advancedObservation:false,advancedArmament:false,conquerorsCoating:false} },
    'trafalgar-law': { affiliations:['heart-pirates'], roles:['captain','doctor','swordsman'], encounterTags:['pirate','new-world'], combatProfileId:'combat-trafalgar-law-late-wano', fruitId:'ope-ope-no-mi', foundationIds:['swordsmanship'], disciplineIds:['one-sword-style'], hakiProfile:{observation:true,armament:true,conquerors:false,advancedObservation:false,advancedArmament:false,conquerorsCoating:false} },
    'smoker': { affiliations:['marines'], roles:['marine','officer'], encounterTags:['marine','grand-line'], combatProfileId:'combat-smoker-late-wano', fruitId:'moku-moku-no-mi', weaponIds:['jitte'], foundationIds:['staff-fighting'], disciplineIds:[], hakiProfile:{observation:true,armament:true,conquerors:false,advancedObservation:false,advancedArmament:false,conquerorsCoating:false} },
    'rob-lucci': { affiliations:['world-government','cipher-pol'], roles:['agent','assassin'], encounterTags:['government','covert'], combatProfileId:'combat-rob-lucci-late-wano', fruitId:'neko-neko-no-mi-model-leopard', foundationIds:['basic-martial-arts'], disciplineIds:['rokushiki'], hakiProfile:{observation:true,armament:true,conquerors:false,advancedObservation:false,advancedArmament:true,conquerorsCoating:false} },
    'charlotte-katakuri': { affiliations:[], roles:['combatant'], encounterTags:['pirate','new-world'], combatProfileId:'combat-charlotte-katakuri-late-wano', fruitId:'mochi-mochi-no-mi', foundationIds:['brawling'], disciplineIds:[], hakiProfile:{observation:true,armament:true,conquerors:true,advancedObservation:true,advancedArmament:false,conquerorsCoating:false} },
    'dracule-mihawk': { affiliations:[], roles:['swordsman'], encounterTags:['warlord','sword-user'], combatProfileId:'combat-dracule-mihawk-late-wano', mentorProfileId:'mentor-dracule-mihawk', weaponIds:['yoru'], foundationIds:['swordsmanship'], disciplineIds:['one-sword-style'], hakiProfile:{observation:true,armament:true,conquerors:false,advancedObservation:false,advancedArmament:true,conquerorsCoating:false} }
  };
  V4.database.characters = references.map(record => ({ ...record, spoilerEra:'late-wano', affiliations:[], roles:record.tags || [], encounterTags:record.tags || [], combatProfileId:null, mentorProfileId:null, fruitId:null, weaponIds:record.knownWeaponIds || [], foundationIds:[], disciplineIds:[], techniqueIds:[], advancedStateIds:[], hakiProfile:{observation:false,armament:false,conquerors:false,advancedObservation:false,advancedArmament:false,conquerorsCoating:false}, relationshipIds:[], factionRank:null, bountyHistory:[], notes:[], ...reviewed[record.id] }));
}(window.OnePieceRollV4));

