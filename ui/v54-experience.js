/* V5.4 roll modes, batch reveal, and transparent Voyage Luck UI. */
(function (V4, global) {
  'use strict';
  const experience = V4.ui.experience = V4.ui.experience || {};
  const mode = () => document.querySelector('input[name="generation-mode"]:checked')?.value || 'standard-adventure';
  const format = value => Number(value || 0).toLocaleString();
  const displayName = c => c.name || c.id || 'Unnamed Voyager';
  const tierValue = c => c.combatRating || 0;
  const modeLabel = value => value === 'brutal-grand-line' ? 'BRUTAL ROLL' : 'STANDARD ADVENTURE';
  experience.currentMode = mode;
  experience.refreshLuck = function () {
    const panel = document.getElementById('voyage-luck-panel'); if (!panel) return;
    const currentMode = mode(), state = V4.engines.voyageLuck.load(), summary = V4.engines.voyageLuck.describe(state);
    if (currentMode === 'brutal-grand-line') { panel.innerHTML = '<strong>BRUTAL ROLL</strong> — Voyage Luck is off in Brutal Grand Line. Your result uses the frozen V5.3 probability path.'; return; }
    panel.innerHTML = `<strong>${summary.text}</strong> <progress max="100" value="${summary.meter}"></progress><br><span>${summary.next ? `Next protection milestone: ${summary.next} rolls without a major result.` : 'All Voyage Luck milestones reached.'}</span> <button class="btn-small" onclick="toggleVoyageLuck()">${state.enabled ? 'Disable' : 'Enable'}</button> <button class="btn-small" onclick="resetVoyageLuck()">Reset</button>`;
  };
  const generateOne = (requestedMode, suppliedSeed) => {
    const state = V4.engines.voyageLuck.load();
    const activeLuck = requestedMode === 'standard-adventure' ? state : { ...state, enabled:false };
    const character = V4.engines.generator.generate({ generationMode:requestedMode, voyageLuck:activeLuck }, suppliedSeed, { generationMode:requestedMode, voyageLuck:activeLuck });
    const result = requestedMode === 'standard-adventure' ? V4.engines.voyageLuck.afterRoll(activeLuck, character) : null;
    character.voyageLuck = result ? { enabled:result.state.enabled, rollStreakBefore:activeLuck.rollStreak, rollStreakAfter:result.state.rollStreak, currentBonus:result.state.currentBonus, milestones:result.activated, major:result.major, assisted:!!character.voyageLuckContribution?.assisted } : { enabled:false, brutal:true };
    character.meta = { ...(character.meta || {}), generationMode:requestedMode, voyageLuck:character.voyageLuck };
    character.rarity = V4.engines.rarity.analyze(character);
    if (typeof global.buildLuckEvents === 'function') character.luckEvents = global.buildLuckEvents(character);
    return character;
  };
  experience.roll = function (count, suppliedSeed) {
    const requestedMode = mode();
    const results = [];
    for (let index = 0; index < count; index++) results.push(generateOne(requestedMode, index === 0 ? suppliedSeed : null));
    return results;
  };
  experience.renderBatch = function (results) {
    const host = document.getElementById('batch-results'); if (!host) return;
    const ordered = [...results].sort((a,b) => tierValue(b) - tierValue(a));
    const best = ordered[0];
    const visible = ordered.slice(0, Math.min(5, ordered.length));
    const rarity = best?.rarity?.odds || 'unmeasured';
    host.innerHTML = `<div class="stat-group" style="grid-column:1/-1;margin:0;"><strong>Best result: ${best?.tier?.name || 'Unknown'}.</strong> Rarest shown combination: approximately ${rarity}. ${results.length > 1 ? `Top ${visible.length} of ${results.length} rolls shown.` : ''}</div>${visible.map((character,index) => `<article class="batch-card${index===0?' best':''}"><h4>${displayName(character)}</h4><small>${modeLabel(character.generationMode)} · ${character.tier?.name || 'Unknown'}</small><small>Combat ${character.combatRating?.toFixed(1) || 0} · \u0E3F${format(character.bounty?.displayedAmount || character.bounty?.amount)}</small><small>${character.rarity?.rank || 'Unmeasured'} · ${character.rarity?.odds || ''}</small><small>${character.fruit?.name || 'No Devil Fruit'} · ${character.mentor?.name || 'Self-Taught'}</small><small>${character.voyageLuckContribution?.assisted ? '✦ Fate of the Voyage assisted this result.' : character.adventureFate ? '✦ Natural rare convergence.' : character.voyageLuck?.major ? '✦ Major result.' : 'Standard voyage result.'}</small><div class="batch-actions"><button class="btn-small" onclick="viewBatchCharacter(${index})">View</button><button class="btn-small" onclick="saveBatchCharacter(${index})">Save</button></div></article>`).join('')}`;
    experience.lastBatch = visible;
  };
  experience.generateFromUi = function (count = 1, seed) {
    const sandbox = global.buildSandboxRequest?.();
    if (sandbox) {
      if (count > 1) throw new Error('Batch rolling is available for random modes. Turn Sandbox off to roll a batch.');
      const character = global.generateSandboxCharacter(sandbox, seed ?? null); global.showGeneratedCharacter(character, { origin:'sandbox', returnPage:'tab-sandbox' }); return [character];
    }
    const results = experience.roll(count, seed);
    experience.renderBatch(results);
    global.showGeneratedCharacter(results.reduce((best, item) => tierValue(item) > tierValue(best) ? item : best, results[0]));
    experience.refreshLuck();
    return results;
  };
  global.refreshVoyageLuckUI = experience.refreshLuck;
  global.toggleVoyageLuck = () => { const state = V4.engines.voyageLuck.load(); V4.engines.voyageLuck.toggle(!state.enabled); experience.refreshLuck(); };
  global.resetVoyageLuck = () => { if (confirm('Reset local Voyage Luck progress?')) { V4.engines.voyageLuck.reset(); experience.refreshLuck(); } };
  global.uiBatchGenerate = count => { try { experience.generateFromUi(count); } catch (error) { alert(error.message); } };
  global.viewBatchCharacter = index => { const c = experience.lastBatch?.[index]; if (c) global.showGeneratedCharacter(c); };
  global.saveBatchCharacter = index => { const c = experience.lastBatch?.[index]; if (!c) return; global.showGeneratedCharacter(c); global.uiSaveCharacter(); };
  if (typeof global.addEventListener === 'function') global.addEventListener('DOMContentLoaded', experience.refreshLuck);
  else if (typeof document?.addEventListener === 'function') document.addEventListener('DOMContentLoaded', experience.refreshLuck);
}(window.OnePieceRollV4, window));



