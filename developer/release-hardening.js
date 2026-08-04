/* Browser-facing release checks. These exercise real UI state without changing formulas. */
(function (V4) {
  'use strict';
  const hardening = V4.developer.releaseHardening = V4.developer.releaseHardening || {};
  const profileFor = characterId => (V4.database.combatProfiles || []).find(profile => profile.characterId === characterId);
  const build = (characterId, seed) => V4.engines.presetBuilder.build(profileFor(characterId).id, seed);
  const test = (name, fn, errors) => { try { fn(); } catch (error) { errors.push(`${name}: ${error.message}`); } };
  const need = (condition, message) => { if (!condition) throw new Error(message); };
  hardening.run = () => {
    const errors = [];
    test('Sandbox DOM navigation, persistence, validation, and summary', () => {
      const panel = document.getElementById('sandbox-panel');
      const enabled = document.getElementById('sandbox-enabled');
      const summary = document.getElementById('sandbox-stage-title'); const name = document.getElementById('sandbox-name');
      need(panel?.closest('#tab-sandbox'), 'Sandbox panel is not owned by the dedicated Sandbox page');
      need(!document.querySelector('#tab-generate #sandbox-panel'), 'Adventure still contains a Sandbox panel');
      need(document.querySelectorAll('#sandbox-panel [data-sandbox-step]').length === 8, 'Expected exactly eight persistent Sandbox step nodes');
      need(document.getElementById('sandbox-step-navigation'), 'Sandbox navigation is not mounted');
      const prior = enabled.value, priorName=name.value; enabled.value = 'true'; name.value='Release Test'; window.setSandboxStep(4); need(summary?.textContent.includes('Step 4 of 8'), 'Step summary did not update'); window.setSandboxStep(1); need(enabled.value === 'true' && name.value === 'Release Test', 'Selection did not persist across steps'); name.value=priorName;
      const validation = window.buildSandboxRequest(); need(validation?.mode, 'Sandbox request validation did not produce a request'); enabled.value = prior;
    }, errors);
    test('Final authored provenance', () => {
      const character = build('charlotte-katakuri', 551001);
      need(character.creation?.origin === 'canon-preset', 'Curated preset did not retain its origin');
      need(Array.isArray(character.generationProvenance?.forcedFields), 'Authored forced fields are missing');
      need(character.generationProvenance.forcedFields.length > 0, 'Authored forced fields are empty');
    }, errors);
    test('Unmodified Kaido reference bounty', () => {
      const kaido = build('kaido', 551002); const report = V4.engines.bounty.calculate(kaido);
      need(kaido.referenceBounty?.amount === 4611100000, 'Kaido reference value is not the late-Wano record');
      need(report.displayMode === 'canon-reference' && report.displayedAmount === 4611100000, 'Kaido did not display the unmodified reference bounty');
    }, errors);
    test('Modified Kaido alternate-build estimate', () => {
      const kaido = build('kaido', 551003); kaido.creation.modifiedFromPreset = true; const report = V4.engines.bounty.calculate(kaido);
      need(report.displayMode === 'alternate-build', 'Modified Kaido was not labeled an alternate build');
      need(report.displayedAmount === report.simulatorAmount, 'Modified Kaido did not use the simulator estimate');
    }, errors);
    test('Katakuri full identity', () => {
      const katakuri = build('charlotte-katakuri', 551004);
      need(katakuri.name === 'Charlotte Katakuri', 'Name mismatch'); need(katakuri.race?.id === 'human', 'Race mismatch'); need(katakuri.role?.name === 'Combatant', 'Role mismatch');
      need(katakuri.fruit?.id === 'mochi-mochi-no-mi', 'Fruit mismatch'); need(katakuri.haki?.hasAdvObs, 'Future Sight profile was not retained');
    }, errors);
    test('Goose OC classification', () => {
      const goose = build('goose-eclipsed-goddess', 551005);
      need(goose.creation?.origin === 'oc-preset', 'Goose is not classified as an OC preset'); need(goose.presetOf?.source === 'fan', 'Goose source is not explicitly fan/OC');
    }, errors);
    test('Unrestricted rarity is not applicable', () => {
      const goose = build('goose-eclipsed-goddess', 551006); const rarity = V4.engines.rarity.analyze(goose);
      need(rarity.percent === 'Not applicable' && rarity.source === 'not-applicable', 'Authored unrestricted rarity was presented as a natural chance');
    }, errors);
    test('Saved-character exact restoration', () => {
      const original = build('charlotte-katakuri', 551007); const restored = JSON.parse(JSON.stringify(original));
      V4.engines.career.ensure(restored);
      need(restored.id === original.id && restored.seed === original.seed && restored.name === original.name, 'Identity changed during restoration');
      need(restored.fruit?.id === original.fruit?.id, 'Fruit changed during restoration');
      need(JSON.stringify(restored.loadout?.weapons?.map(item => item.id)) === JSON.stringify(original.loadout?.weapons?.map(item => item.id)), 'Loadout changed during restoration');
    }, errors);
    test('Rendered encoding', () => need(V4.developer.encodingCheck.checkRenderedDocument().length === 0, 'Rendered document contains suspicious encoding'), errors);
    test('Battle visual effects', () => need(V4.ui.battleEffects.test().pass, V4.ui.battleEffects.test().errors.join('; ')), errors);
    const report = { pass: errors.length === 0, buildId: V4.build?.buildId, tests: ['sandbox DOM', 'authored provenance', 'Kaido reference', 'Kaido alternate', 'Katakuri', 'Goose OC', 'rarity N/A', 'save restoration', 'encoding', 'battle effects'], errors };
    return report;
  };
  window.runV551ReleaseHardeningTest = () => {
    const output = document.getElementById('test-output');
    const report = hardening.run();
    output.textContent = `=== V${V4.build?.appVersion || 'unknown'} RELEASE HARDENING ===\nBuild: ${report.buildId}\n\n${report.tests.map(name => `${report.errors.some(error => error.toLowerCase().startsWith(name.toLowerCase())) ? 'FAIL' : 'PASS'} ${name}`).join('\n')}\n\nOverall: ${report.pass ? 'PASS' : 'FAIL'}${report.errors.length ? `\n\n${report.errors.join('\n')}` : ''}`;
    return report;
  };
}(window.OnePieceRollV4));
