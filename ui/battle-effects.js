/* Production battle effects API. The effects lab calls this same API. */
(function (V4) {
  'use strict';
  const names = ['impact', 'guard', 'dodge', 'counter', 'logia', 'haki', 'fruit', 'element', 'damage-number', 'status'];
  const api = V4.ui.battleEffects = V4.ui.battleEffects || {};
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  const durationFor = (kind, context = {}) => {
    const pacing = context.pacing || context.session?.presentation?.pacing || 'normal';
    const base = kind === 'damage-number' ? 1200 : kind === 'impact' ? 1200 : ['fruit','element'].includes(kind) ? 1500 : kind === 'haki' ? 1200 : ['guard','dodge','counter','logia'].includes(kind) ? 1000 : 850;
    if (pacing === 'cinematic') return Math.round(base * 1.45);
    if (pacing === 'fast') return Math.max(650, Math.round(base * .72));
    return base;
  };
  const rootFor = context => context.host || document.getElementById('battle-stage') || document.getElementById('battle-effects-preview');
  const addClass = (root, value) => {
    if (!root) return;
    root.classList.add(`production-effect-${value}`);
  };
  const visualFor = (kind, context, duration) => {
    const layer = document.getElementById('battle-arena-effects'); if (!layer || context.host) return null;
    const visual = document.createElement('div'); visual.className = `battle-production-visual visual-${kind}`;
    visual.dataset.sequenceId = String(context.sequenceId ?? Date.now()); visual.setAttribute('aria-hidden','true');
    layer.appendChild(visual); requestAnimationFrame(() => visual.classList.add('is-visible'));
    window.setTimeout(() => visual.remove(), duration + 180); return visual;
  };
  api.names = names;
  api.play = (kind, context = {}) => {
    const normalized = kind === 'logia-phase' ? 'logia' : kind === 'armament-contact' ? 'haki' : kind === 'major-impact' || kind === 'minor-impact' || kind === 'legendary-impact' ? 'impact' : kind;
    const root = rootFor(context); const duration = durationFor(normalized, context);
    if (!root) return { duration, completion: Promise.resolve({ visible:false }) };
    addClass(root, normalized);
    root.dataset.productionEffect = normalized;
    const accessibility = context.accessibility || context.session?.presentation?.accessibility || 'full';
    root.classList.add(`accessibility-${accessibility}`);
    let element = null;
    const visual = visualFor(normalized, context, duration);
    if (normalized === 'damage-number' && !context.host) {
      const layer = document.getElementById('battle-damage-layer');
      if (layer) {
        element = document.createElement('div');
        element.className = `battle-damage-float ${context.critical ? 'critical' : ''}`;
        element.dataset.sequenceId = String(context.sequenceId ?? Date.now());
        element.setAttribute('role', 'status');
        element.innerHTML = `<strong>-${Math.max(0, Math.round(context.damage || 0))}</strong>${context.critical ? '<em>CRITICAL</em>' : ''}${context.status ? `<span>${escapeHtml(context.status)}</span>` : ''}`;
        layer.appendChild(element);
        requestAnimationFrame(() => requestAnimationFrame(() => element?.classList.add('is-visible')));
      }
    }
    const completion = new Promise(resolve => {
      window.setTimeout(() => {
        if (element?.isConnected) { element.classList.remove('is-visible'); window.setTimeout(() => element?.remove(), 180); }
        resolve({ visible:!!element || !!visual, kind:normalized, duration });
      }, duration);
    });
    return { duration, element, visual, completion };
  };
  api.show = (effect, accessibility = document.getElementById('battle-accessibility')?.value || 'full') => {
    if (!names.includes(effect)) throw new Error(`Unknown battle effect: ${effect}`);
    const preview = document.getElementById('battle-effects-preview');
    if (!preview) throw new Error('Battle effects preview is unavailable.');
    preview.className = `battle-effects-preview effect-${effect} accessibility-${accessibility}`;
    preview.dataset.effect = effect;
    preview.querySelector('[data-effect-label]').textContent = effect.replace('-', ' ');
    preview.querySelector('[data-effect-detail]').textContent = accessibility === 'no-flash' ? 'No-flash accessibility mode is active.' : accessibility === 'reduce-motion' ? 'Reduced-motion mode is active.' : 'Full production-effect preview.';
    api.play(effect, { host:preview, accessibility });
    return preview;
  };
  api.test = () => {
    const errors = [];
    for (const effect of names) try { const preview = api.show(effect, 'full'); if (!preview.classList.contains(`production-effect-${effect}`)) errors.push(`${effect}: production API did not apply class`); } catch (error) { errors.push(`${effect}: ${error.message}`); }
    for (const mode of ['reduce-motion', 'no-flash']) try { const preview = api.show('impact', mode); if (!preview.classList.contains(`accessibility-${mode}`)) errors.push(`${mode}: accessibility class was not applied`); } catch (error) { errors.push(`${mode}: ${error.message}`); }
    return { pass:errors.length === 0, effects:[...names, 'reduced motion', 'no flash'], errors };
  };
  window.previewBattleEffect = effect => api.show(effect);
}(window.OnePieceRollV4));
