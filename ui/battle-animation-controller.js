/* CSS-stage controller. Visual state is derived from emitted battle events only. */
(function (V4) {
  'use strict';
  const controller = V4.ui.battleAnimation = V4.ui.battleAnimation || {};
  const cleanup = stage => [...stage.classList].filter(name => /^(power-|element-|haki-|impact-level-|battle-event-|accessibility-)/.test(name)).forEach(name => stage.classList.remove(name));
  const fighter = side => document.getElementById(`battle-fighter-${side}`);
  controller.reset = () => {
    const stage = document.getElementById('battle-stage'); if (!stage) return;
    cleanup(stage); ['left','right'].forEach(side => fighter(side)?.classList.remove('stance-attack','stance-guard','stance-hurt','stance-dodge','stance-counter','stance-charge','stance-down','position-close','position-far'));
  };
  controller.apply = (event, session) => {
    const stage = document.getElementById('battle-stage'); if (!stage) return;
    controller.reset();
    const accessibility = session.presentation?.accessibility || 'full';
    stage.classList.add(`accessibility-${accessibility}`, `power-${event.powerClass || 'standard'}`, `battle-event-${event.type || event.phase}`);
    (event.elementIds || (event.element ? [event.element] : [])).slice(0, 2).forEach(element => stage.classList.add(`element-${element}`));
    (event.hakiTypes || []).forEach(type => stage.classList.add(`haki-${type.toLowerCase().replace(/[^a-z]+/g, '-')}`));
    const sideFor = id => session.f1.combatant.id === id ? 'left' : session.f2.combatant.id === id ? 'right' : null;
    const actor = fighter(sideFor(event.actorId)); const target = fighter(sideFor(event.targetId));
    if (event.type === 'attack-telegraph') { actor?.classList.add(event.powerClass === 'light' ? 'stance-attack' : 'stance-charge','position-close'); }
    if (event.type === 'defense-telegraph') target?.classList.add('stance-charge');
    if (event.type === 'defense-result') {
      const stance = {guard:'stance-guard',dodge:'stance-dodge',counter:'stance-counter','logia-phase':'stance-dodge'}[event.result]; if (stance) target?.classList.add(stance);
    }
    if (event.type === 'impact') { stage.classList.add(event.impactLevel || 'minor-impact'); actor?.classList.add('stance-attack','position-close'); target?.classList.add(event.damage > 70 ? 'stance-down' : 'stance-hurt'); }
    if (event.hakiClash) stage.classList.add('haki-clash');
  };
}(window.OnePieceRollV4));
