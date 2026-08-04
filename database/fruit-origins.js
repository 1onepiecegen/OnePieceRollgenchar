/* Origin classification prevents artificial fruit products from leaking into the normal Devil Fruit pool. */
(function(V4){'use strict';for(const fruit of V4.database.fruits||[]){fruit.fruitOrigin=fruit.fruitOrigin||'natural-devil-fruit';if(fruit.fruitOrigin==='smile'){fruit.baseRollable=false;fruit.isSmile=true;fruit.smileRoute=fruit.smileRoute||['new-world','wano','dressrosa-underworld'];fruit.smileOutcome=fruit.smileOutcome||'unknown';fruit.tags=[...new Set([...(fruit.tags||[]),'smile','artificial'])];}}
  V4.database.smileRules={allowedRegions:['new-world','wano','dressrosa-underworld'],requiresRoute:true,standardPoolExcluded:true,failedSmileIsZoan:false};
}(window.OnePieceRollV4));

