/* V4 root namespace. Load this before every other external V4 script. */
(function (global) {
  'use strict';
  const V4 = global.OnePieceRollV4 = global.OnePieceRollV4 || {};
  V4.version = V4.build?.appVersion || V4.version || 'unknown';
  V4.database = V4.database || {};
  V4.engines = V4.engines || {};
  V4.ui = V4.ui || {};
  V4.developer = V4.developer || {};
  V4.legacy = V4.legacy || {};
}(window));

