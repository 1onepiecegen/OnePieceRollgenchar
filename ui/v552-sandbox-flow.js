/* Eight persistent Sandbox steps. Moving fields preserves selections between steps. */
(function () {
  'use strict';
  const stages = ['Identity','Personality & traits','Life & origin','Power source','Combat training','Haki & attributes','World presence','Review & create'];
  let step = 1;
  const panel = () => document.getElementById('sandbox-panel');
  const grid = () => { const root=panel(); return typeof root?.querySelector === 'function' ? root.querySelector('.sandbox-grid') : null; };
  const field = id => document.getElementById(id);
  const category = id => {
    if (/sandbox-(name|source-classification|enabled|mode|character-preset|role|reputation)/.test(id)) return 1;
    if (/traits|personality|dream|values|fears/.test(id)) return 2;
    if (/mentor|accomplishment|custom-intel|birth|current|age|background|life/.test(id)) return 3;
    if (/fruit|source$/.test(id)) return 4;
    if (/foundation|discipline|weapon|loadout|advanced-state|duplicates/.test(id)) return 5;
    if (/haki|stat-preset|custom-combat/.test(id)) return 6;
    if (/world|government|crew-quality|bounty|min-tier|target-tier|override-tier/.test(id)) return 7;
    return 8;
  };
  const updateReview = () => {
    const summary = document.getElementById('sandbox-review-summary'); if (!summary) return;
    const request = typeof window.buildSandboxRequest === 'function' ? window.buildSandboxRequest() : null;
    const selected = request?.selected || {};
    summary.innerHTML = `<strong>Authored Sandbox Build</strong><div>Name: ${field('sandbox-name')?.value || 'Not set'} · Mode: ${request?.mode || field('sandbox-mode')?.value || 'guided'}</div><div>Race: ${selected.race?.name || 'Random'} · Fruit: ${selected.fruit?.name || 'Random'} · Haki: ${selected.haki || 'Random'}</div><div>Foundation: ${selected.foundation?.name || 'Random'} · Discipline: ${selected.discipline?.name || 'Random'} · World: ${selected.worldPresence || 'Random'}</div><small>Natural-roll rarity does not apply. Any conflicts and required bypasses are retained in final provenance.</small>`;
  };
  const validate = target => {
    if (target > 1 && field('sandbox-enabled')?.value !== 'true') return 'Enable Sandbox in Step 1 before continuing.';
    if (target > 1 && !String(field('sandbox-name')?.value || '').trim()) return 'Step 1: enter a character name.';
    if (target > 4 && field('sandbox-mode')?.value === 'guided' && field('sandbox-fruit-mastery')?.value === 'awakened' && !field('sandbox-fruit')?.value) return 'Step 4: choose a Devil Fruit before selecting Awakening.';
    return '';
  };
  const show = target => {
    const error = validate(target); const errorEl = document.getElementById('sandbox-flow-error');
    if (error) { if (errorEl) errorEl.textContent = error; return false; }
    step = Math.max(1, Math.min(8, target)); if (errorEl) errorEl.textContent = '';
    panel()?.querySelectorAll('[data-sandbox-step]').forEach(section => { section.hidden = Number(section.dataset.sandboxStep) !== step; });
    document.querySelectorAll('[data-go-to-sandbox-step]').forEach(button => button.classList.toggle('active', Number(button.dataset.goToSandboxStep) === step));
    const title = document.getElementById('sandbox-stage-title'); if (title) title.textContent = `Step ${step} of 8 — ${stages[step - 1]}`;
    const previous = document.getElementById('sandbox-prev'), next = document.getElementById('sandbox-next'), create = document.getElementById('sandbox-create');
    if (previous) previous.hidden = step === 1; if (next) next.hidden = step === 8; if (create) create.hidden = step !== 8;
    updateReview(); return true;
  };
  const addExtraFields = fields => {
    const add = html => { const label = document.createElement('label'); label.innerHTML = html; fields.prepend(label); };
    add('<span>Personality archetype</span><input id="sandbox-personality" maxlength="60" placeholder="e.g. bold idealist">');
    add('<span>Dream</span><input id="sandbox-dream" maxlength="100" placeholder="e.g. find a free horizon">');
    add('<span>Core values</span><input id="sandbox-values" maxlength="120" placeholder="e.g. freedom, friends">');
    add('<span>Fears</span><input id="sandbox-fears" maxlength="120" placeholder="e.g. losing the crew">');
    add('<span>Age</span><input id="sandbox-age" type="number" min="1" max="140" placeholder="Optional">');
    add('<span>Birth region</span><input id="sandbox-birth-region" maxlength="60" placeholder="Optional">');
    add('<span>Current region</span><input id="sandbox-current-region" maxlength="60" placeholder="Optional">');
    add('<span>Background difficulty</span><select id="sandbox-background"><option value="derived">Derived</option><option value="hardship">Hardship</option><option value="ordinary">Ordinary</option><option value="privileged">Privileged</option></select>');
    add('<span>Life events</span><input id="sandbox-life-events" maxlength="180" placeholder="Comma-separated notable events">');
    add('<span>Character name</span><input id="sandbox-name" maxlength="60" placeholder="Name your authored character">');
    add('<span>Source classification</span><select id="sandbox-source-classification"><option value="fan">Original / fan build</option><option value="expanded">Expanded simulator build</option><option value="canon">Canon-compatible alternate build</option></select>');
  };
  const setup = () => {
    const root = panel(), fields = grid(); if (!root || !fields || root.dataset.v553Complete) return;
    root.dataset.v553Complete = 'true'; root.open = true; addExtraFields(fields);
    const labels = [...fields.querySelectorAll(':scope > label')]; const sections = stages.map((_, index) => { const section = document.createElement('section'); section.className = 'sandbox-step-node'; section.dataset.sandboxStep = String(index + 1); return section; });
    labels.forEach(label => { label.hidden=false; label.removeAttribute('data-sandbox-step'); sections[category(label.querySelector('[id]')?.id || '') - 1].appendChild(label); });
    fields.replaceChildren(...sections);
    root.querySelector('.pill-row')?.remove(); root.querySelector('#sandbox-step-summary')?.remove();
    const header = document.createElement('header'); header.className = 'sandbox-flow-header'; header.innerHTML = `<strong id="sandbox-stage-title"></strong><nav id="sandbox-step-navigation" class="sandbox-progress" aria-label="Sandbox steps">${stages.map((name,index) => `<button type="button" data-go-to-sandbox-step="${index + 1}" aria-label="Step ${index + 1}: ${name}">${index + 1}</button>`).join('')}</nav>`; root.insertBefore(header, fields);
    const footer = document.createElement('div'); footer.className = 'sandbox-flow-footer'; footer.innerHTML = '<p id="sandbox-flow-error" role="alert"></p><div id="sandbox-review-summary" class="sandbox-review"></div><button type="button" id="sandbox-prev" class="btn-small">Previous</button><button type="button" id="sandbox-next" class="btn">Next</button><button type="button" id="sandbox-create" class="btn btn-pulse">Create Character</button>'; fields.after(footer);
    header.addEventListener('click', event => { const button = event.target.closest('[data-go-to-sandbox-step]'); if (button) show(Number(button.dataset.goToSandboxStep)); });
    document.getElementById('sandbox-prev').addEventListener('click', () => show(step - 1)); document.getElementById('sandbox-next').addEventListener('click', () => show(step + 1)); document.getElementById('sandbox-create').addEventListener('click', () => window.uiGenerateCharacter?.());
    fields.addEventListener('change', updateReview); fields.addEventListener('input', updateReview);
    window.setSandboxStep = show; window.getSandboxRuntimeState = () => ({ step, nodeCount:root.querySelectorAll('[data-sandbox-step]').length, valuesPersist:true }); show(1);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once:true }); else setup();
}());
