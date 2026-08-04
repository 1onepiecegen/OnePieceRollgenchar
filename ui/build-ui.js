/* Renders the single build authority into visible UI without duplicating version strings. */
(function (V4) {
  'use strict';
  const build = V4.build || {};
  const apply = () => {
    document.querySelectorAll('[data-build-version]').forEach(node => { node.textContent = build.appVersion || 'unknown'; });
    document.querySelectorAll('[data-release-name]').forEach(node => { node.textContent = build.releaseName || 'Build'; });
    if (build.appVersion) document.title = `One Piece Sandbox Simulator V${build.appVersion}`;
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true }); else apply();
}(window.OnePieceRollV4));
