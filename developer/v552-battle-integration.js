/* Browser-visible test: launches the normal Battle Match renderer with a fixed fixture. */
(function (V4) {
  'use strict';
  const api = V4.developer.v553BattleRuntime = V4.developer.v553BattleRuntime || {};
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  const visible = element => {
    if (!element?.isConnected || element.hidden || element.closest('[hidden]')) return false;
    const style = getComputedStyle(element), rect = element.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0 && rect.width > 0 && rect.height > 0;
  };
  api.run = async () => {
    const errors = [], diagnostics = [], seen = new Set();
    if (typeof window.startBattleFixture !== 'function') return { pass:false, errors:['The ordinary Battle Match fixture launcher is unavailable.'] };
    const session = window.startBattleFixture({ firstProfileId:'combat-monkey-d-luffy-late-wano', secondProfileId:'combat-rob-lucci-late-wano', seed:553001, arena:'rooftop' });
    if (!session) return { pass:false, errors:['The ordinary Battle Match did not start.'] };
    V4.engines.battle.step(session);
    const events = session.events || [];
    for (const event of events) {
      seen.add(event.type); session.presentation.currentEvent = event; window.renderBattleMatch?.();
      const presentation = V4.ui.battlePresenter.present(event, session);
      if (event.type !== 'impact') continue;
      await pause(80);
      const node = document.querySelector(`#battle-damage-layer [data-sequence-id="${event.sequenceId}"]`);
      const wasVisible = visible(node);
      diagnostics.push({ sequenceId:event.sequenceId, emitted:true, nodeCreated:!!node, browserVisible:wasVisible, minDuration:presentation?.duration || 0, text:node?.textContent?.trim() || '' });
      if (!node) errors.push(`Impact ${event.sequenceId}: no production damage node was created.`);
      else if (!wasVisible) errors.push(`Impact ${event.sequenceId}: damage node was present but not browser-visible.`);
      if ((presentation?.duration || 0) < 1200) errors.push(`Impact ${event.sequenceId}: display duration was under 1200ms.`);
    }
    for (const required of ['attack-telegraph','defense-telegraph','impact','defense-result']) if (!seen.has(required)) errors.push(`No ${required} event was emitted by the ordinary fixture match.`);
    const effectApi = V4.ui.battleEffects;
    for (const effect of ['guard','dodge','counter','logia','haki','element']) {
      const result = effectApi?.play(effect, { accessibility:'full' });
      if (!result?.duration) errors.push(`${effect}: production effects API did not return a duration.`);
    }
    return { pass:errors.length === 0, status:errors.length ? 'Browser-visible failure' : 'Browser-visible pass', scenario:'Luffy vs Rob Lucci through the ordinary Battle Match renderer', presentedEvents:events.length, eventTypes:[...seen], diagnostics, errors };
  };
  window.runV552BattleIntegrationTest = async () => {
    const output = document.getElementById('test-output'); if (output) output.textContent = 'Running the real Battle Match presentation test…';
    const result = await api.run();
    if (output) output.textContent = `=== V5.5.3 REAL BATTLE RUNTIME ===\nScenario: ${result.scenario || 'Unavailable'}\nEvents: ${result.presentedEvents || 0}\nTypes: ${(result.eventTypes || []).join(', ')}\n\nDamage nodes:\n${(result.diagnostics || []).map(item => `#${item.sequenceId}: created=${item.nodeCreated}, visible=${item.browserVisible}, duration=${item.minDuration}ms, ${item.text}`).join('\n') || 'No impact diagnostics.'}\n\n${result.pass ? 'PASS — Browser-visible runtime evidence recorded.' : 'FAIL'}${result.errors?.length ? `\n${result.errors.join('\n')}` : ''}`;
    return result;
  };
}(window.OnePieceRollV4));
