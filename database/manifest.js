/* V4.2 migration boundary. Content may expand; the external-database architecture is frozen. */
(function (V4) {
  'use strict';
  V4.database.manifest = Object.freeze({
    databaseVersion: V4.build?.databaseVersion || 'unknown',
    migrationStatus: 'frozen',
    contentAuthority: 'external-modules',
    legacyFallbacksAllowed: false
  });
}(window.OnePieceRollV4));

