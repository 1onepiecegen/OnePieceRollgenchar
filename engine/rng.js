/* Seeded PRNG contract. The legacy function remains active until parity migration. */
(function (V4) {
  'use strict';
  V4.engines.rng = V4.engines.rng || {};
  V4.engines.rng.create = V4.engines.rng.create || function (seed) {
    let state = seed | 0;
    return {
      seed: seed,
      next: function () {
        state |= 0; state = state + 0x6D2B79F5 | 0;
        let value = Math.imul(state ^ state >>> 15, 1 | state);
        value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
        return ((value ^ value >>> 14) >>> 0) / 4294967296;
      },
      roll: function (min, max) { return Math.floor(this.next() * (max - min + 1)) + min; },
      chance: function (probability) { return this.next() < probability; },
      pick: function (items) { return items[Math.floor(this.next() * items.length)]; },
      weightedPick: function (items, weightOf) {
        let remaining = this.next() * items.reduce(function (total, item) { return total + weightOf(item); }, 0);
        for (const item of items) { remaining -= weightOf(item); if (remaining <= 0) return item; }
        return items[items.length - 1];
      }
    };
  };
}(window.OnePieceRollV4));

