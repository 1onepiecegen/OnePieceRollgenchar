/* Small roster-support weapon batch. */
(function(V4){'use strict';const additions=[
  {id:'gryphon',name:'Gryphon',source:'canon',grade:'Great',quality:'great',type:'sword',family:'blade',subtype:'saber',power:88,handlingDifficulty:84,unique:true,named:true,rarityClass:'legendary-unique',acquisitionWeight:.01,tags:['blade','saber','named','haki'],desc:'Shanks’s saber, represented without assigning unsupported special properties.',description:'Shanks’s saber, represented without assigning unsupported special properties.',advantages:['Excellent reach and Haki compatibility'],disadvantages:['Requires elite swordsmanship'],history:'Carried by Shanks.'}
];for(const weapon of additions)if(!(V4.database.weapons||[]).some(item=>item.id===weapon.id||item.name===weapon.name))V4.database.weapons.push(weapon);}(window.OnePieceRollV4));


