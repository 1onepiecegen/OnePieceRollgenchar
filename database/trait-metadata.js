/* V5.5 trait categories and guardrails. Existing trait values remain unchanged. */
(function(V4){'use strict';const categories={
  'the-will-of-d':'inherited','voice-of-all-things':'worldSensitive','natural-leader':'behavioral','monster-constitution':'physical','battle-genius':'personality','iron-will':'personality','fearless':'personality','self-taught':'historical','lucky':'destiny','cowardly':'behavioral','hotheaded':'behavioral','reckless':'behavioral','patient':'personality','resourceful':'personality','disciplined':'personality','seafaring-veteran':'historical'
};for(const trait of V4.database.traits||[]){trait.category=trait.category||categories[trait.id]||'personality';trait.narrativeConsequences=trait.narrativeConsequences||[];trait.conflicts=trait.conflicts||[];}V4.database.traitSlots={guided:{inherited:1,personality:2,behavioral:1,physical:1,historical:1,destiny:1,worldSensitive:1},unrestricted:'creator-selected'};
}(window.OnePieceRollV4));

