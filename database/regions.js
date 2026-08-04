/* Narrative regions. They gate story routes and access; they never add raw combat power. */
(function(V4){'use strict';
  V4.database.regions=[
    {id:'east-blue',name:'East Blue',source:'canon',danger:'low',accessTags:['starter-training','ordinary-weapons','safe-harbors'],smileAccess:false,description:'A comparatively quiet sea where a beginning can last long enough to matter.'},
    {id:'west-blue',name:'West Blue',source:'canon',danger:'low',accessTags:['underworld-rumors','ordinary-weapons'],smileAccess:false,description:'A sea of kingdoms, trade routes, and old criminal connections.'},
    {id:'north-blue',name:'North Blue',source:'canon',danger:'medium',accessTags:['science-rumors','military-training'],smileAccess:false,description:'A colder, politically entangled sea with a stronger military presence.'},
    {id:'south-blue',name:'South Blue',source:'canon',danger:'low',accessTags:['trade','starter-training'],smileAccess:false,description:'A broad sea of islands, merchants, and local rivalries.'},
    {id:'grand-line-paradise',name:'Grand Line (Paradise)',source:'canon',danger:'high',accessTags:['unusual-cultures','fruit-rumors','strong-rivals'],smileAccess:false,description:'A volatile route where strange weather and dangerous rivals accelerate reputations.'},
    {id:'new-world',name:'New World',source:'canon',danger:'extreme',accessTags:['advanced-haki','rare-weapons','emperor-territory','underworld-market'],smileAccess:'conditional',description:'The most hostile seas, where survival, injury, and opportunity all become more likely.'},
    {id:'wano',name:'Wano Country',source:'canon',danger:'extreme',accessTags:['sword-training','ryuo','beast-pirates'],smileAccess:'conditional',description:'A closed country with a distinct warrior culture and a late-Wano SMILE route.'},
    {id:'dressrosa-underworld',name:'Dressrosa Underworld Route',source:'canon',danger:'high',accessTags:['underworld-market','donquixote-network'],smileAccess:'conditional',description:'An illegal trade route, not an ordinary birthplace or a casual starting reward.'}
  ];
}(window.OnePieceRollV4));

