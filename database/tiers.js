/* V5 open-ended combat tiers. The final tier intentionally has no upper bound. */
(function (V4) {
  'use strict';
  const tiers = [
    [0, 'East Blue Rookie', '#6b7280'], [9, 'Grand Line Rookie', '#3b82f6'], [16, 'Super Rookie', '#0ea5e9'], [25, 'Supernova', '#14b8a6'], [40, 'Rising Threat', '#a855f7'], [55, 'Commander', '#c026d3'], [70, 'Yonko Commander', '#ea580c'], [85, 'Admiral-Class', '#dc2626'], [100, 'Fleet Admiral', '#b91c1c'], [120, 'Emperor', '#fde047'], [150, 'Pirate King', '#ffffff']
  ];
  const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  V4.database.tiers = tiers.map(([min, name, color]) => ({ id: slug(name), min, name, color, source: 'expanded', description: name }));
}(window.OnePieceRollV4));

