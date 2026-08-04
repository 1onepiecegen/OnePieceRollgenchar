/* V5.4 transparent session luck. It is player-session state, never hidden seed state. */
(function (V4) {
  'use strict';
  const luck = V4.engines.voyageLuck = V4.engines.voyageLuck || {};
  const KEY = 'op-v54-voyage-luck';
  const clean = value => ({
    version: V4.build?.appVersion || 'unknown', enabled: value?.enabled !== false,
    rollStreak: Math.max(0, Number(value?.rollStreak) || 0),
    currentBonus: Math.max(0, Number(value?.currentBonus) || 0),
    milestones: Array.isArray(value?.milestones) ? value.milestones : [],
    lastMajorResultAt: Math.max(0, Number(value?.lastMajorResultAt) || 0),
    totalRolls: Math.max(0, Number(value?.totalRolls) || 0),
    pirateKingStreak: Math.max(0, Number(value?.pirateKingStreak) || 0)
  });
  luck.load = () => { try { return clean(JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (_) { return clean({}); } };
  luck.save = state => { const cleanState = clean(state); localStorage.setItem(KEY, JSON.stringify(cleanState)); return cleanState; };
  luck.reset = () => luck.save({ enabled: luck.load().enabled });
  luck.toggle = enabled => luck.save({ ...luck.load(), enabled: !!enabled });
  luck.nextMilestone = state => [10, 25, 50, 100, 250, 500, 1000, 3500, 4000, 4500, 5000].find(value => value > state.rollStreak) || null;
  luck.isMajor = character => !!character && (
    (character.combatRating || 0) >= 25 || ['legendary', 'mythic', 'anomaly'].includes(character.fruit?.rarityTier) ||
    character.weapon?.grade === 'Supreme' || character.haki?.hasAdvCoc || character.hasAwakened ||
    (character.synergyBonus || 0) >= 60 || (character.combatRating || 0) >= 150
  );
  luck.describe = state => ({
    meter: Math.min(100, Math.round(state.currentBonus)), next: luck.nextMilestone(state),
    text: state.enabled ? `Voyage Luck: ${Math.min(100, Math.round(state.currentBonus))} / 100` : 'Voyage Luck is disabled.'
  });
  luck.afterRoll = function (state, character) {
    const next = clean(state);
    next.totalRolls++;
    const major = luck.isMajor(character);
    const pirateKing = (character.combatRating || 0) >= 150;
    if (major) {
      next.rollStreak = 0; next.currentBonus = 0; next.lastMajorResultAt = next.totalRolls;
    } else if (next.enabled) {
      next.rollStreak++; next.currentBonus = Math.min(100, Math.round((1 - Math.exp(-next.rollStreak / 85)) * 100));
    }
    next.pirateKingStreak = pirateKing ? 0 : next.pirateKingStreak + 1;
    const activated = [];
    for (const threshold of [10,25,50,100,250,500,1000,3500,4000,4500,5000]) {
      if (next.rollStreak === threshold || next.pirateKingStreak === threshold) {
        const marker = `${threshold}-roll`;
        if (!next.milestones.includes(marker)) { next.milestones.push(marker); activated.push(threshold); }
      }
    }
    return { state: luck.save(next), major, pirateKing, activated };
  };
  /* A clear, limited package selector. It changes the input quality, never a final CR multiplier. */
  luck.packageFor = function (seed, state) {
    if (!state?.enabled) return null;
    let value = (Math.imul((Number(seed) | 0) ^ 0x5f3759df, 1103515245) + 12345) >>> 0;
    const roll = value / 4294967296;
    const streak = state.pirateKingStreak || 0;
    if (streak >= 5000 || (streak >= 3500 && roll < Math.min(.9, .03 + (streak - 3500) / 1650))) return { id:'pirate-king-safeguard', target:'Pirate King', assisted:true, reason:`After ${streak.toLocaleString()} journeys without a Pirate King, fate turns overwhelmingly in your favor.` };
    if (state.rollStreak >= 1000 && roll < .12) return { id:'emperor-candidate', target:'Emperor', assisted:true, reason:'A thousand quiet voyages build toward an Emperor candidate.' };
    if (state.rollStreak >= 500 && roll < .22) return { id:'legendary-package', target:'Yonko Commander', assisted:true, reason:'Long voyages without a major result invite a legendary opportunity.' };
    if (state.rollStreak >= 250 && roll < .28) return { id:'commander-opportunity', target:'Commander', assisted:true, reason:'Voyage Luck opens an exceptional Commander-level opportunity.' };
    if (state.rollStreak >= 100 && roll < .38) return { id:'supernova-protection', target:'Supernova', assisted:true, reason:'The 100-roll protection ensures a coherent Supernova-or-better candidate.' };
    if (state.rollStreak >= 50 && roll < .52) return { id:'notable-feature', target:'Rising Threat', assisted:true, reason:'The voyage grants a notable rare feature after a long dry streak.' };
    return null;
  };
}(window.OnePieceRollV4));

