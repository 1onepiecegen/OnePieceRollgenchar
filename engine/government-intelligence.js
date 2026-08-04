/* V4.5.3 public authority module. Keeps the old intelligence filename as a compatibility bridge. */
(function (V4) {
  'use strict';
  const governmentIntelligence = V4.engines.governmentIntelligence = V4.engines.governmentIntelligence || {};
  governmentIntelligence.assess = function (rng, character, options) {
    return V4.engines.intelligence.assess(rng, character, options);
  };
  governmentIntelligence.schema = Object.freeze(['baselineDossier', 'leakEvents', 'combinedAssessment']);
}(window.OnePieceRollV4));

