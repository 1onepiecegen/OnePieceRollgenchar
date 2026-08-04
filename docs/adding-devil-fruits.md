# Adding Devil Fruits

Add fruits to `database/fruits*.js`, not to the HTML. The active fruit catalog normalizes the existing fields `id`, `name`, `type`, `power`, `diff`, `vers`, `awk`, `source`/`src`, `desc`, and optional `elementTags`, `rarity`, `tier`, `strengths`, `weaknesses`, and `utility`.

Use a lowercase kebab-case stable ID. `source` must identify canon, supplemental, anime, expanded, or fan content. Fan fruits must carry `source:'fan'`, a clear description, and a deliberately low acquisition weight or high rarity tier. Do not silently give a fruit canon status.

Elements are simulator affinity tags in `database/elements.js`; they model future battle interactions, not an official universal weakness chart. Record explicit strengths and weaknesses only when they are supported by the source or clearly marked simulator interpretation.

After adding a batch, run catalog validation, a fixed-seed generation check, the 10,000-character smoke test, and compare the 100,000-roll report before changing any formula.
