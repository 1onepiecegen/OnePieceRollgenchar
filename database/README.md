# V5.3 Database Modules

These files are the authoritative game-content source. The HTML contains no live database arrays.

- Give every record a stable `id`, `source`, visible `name`, and description.
- Allowed sources are `canon`, `supplemental`, `anime`, `sbs`, `movie`, `game`, `expanded`, and `fan`.
- The active spoiler boundary is the end of Wano. Do not silently mix later facts into canon records.
- Character references, mentor teaching profiles, and curated combat profiles remain separate concepts.
- New fruits require `rarityTier`, nonnegative `rollWeight`, and one or more `elementTags` registered in `elements.js`.
- `anomaly` and world-unique powers should receive very small standard weights; Sandbox presets may expose them directly without changing standard odds.
- Multiple Devil Fruits are rejected unless the character record contains an explicit exception. Blackbeard's exception records the mechanism as unknown.
- Weapons need family, subtype, tags, quality, handling difficulty, uniqueness, and acquisition weight.
- Styles need progression type, parents, tags, and explicit equipment requirements when applicable.

Run the Developer **Canon Database Authority Report** and **V5.3 Fruit & Battle Test** after every content batch. Combat profiles are simulator interpretations, not official power levels, and battle affinities are transparent game abstractions rather than universal canon rules.

