# V4 Release Checklist

## Database coverage

- [x] External authoritative databases and stable IDs.
- [x] Live V4.5 coverage report grouped by source.
- [ ] Reach reviewed content targets for references, fruits, weapons, traits, reputations, and accomplishments.
- [ ] Add movie/game/SBS content only in separately labelled, spoiler-safe batches.

## Sandbox

- [x] Lock/filter mentor, fruit, race, foundation, discipline, weapon family, named weapon, Haki, source pool, and minimum tier.
- [x] Sandbox generation uses the standard pipeline and validates its loadout/progression result.
- [ ] Add saved-character editing and a clearer incompatibility explanation for impossible filter combinations.

## Saves and imports

- [x] Existing saved characters migrate without rerolling.
- [x] Saved gallery records seed and export includes version/database metadata.
- [ ] Add import UI feedback for older schemas and missing catalog IDs.

## UI and branding

- [x] Visible generator branding is V4.5.
- [x] Character sheet shows source badges and concise tooltip text.
- [x] Technical character calculations remain inside Behind the Scenes.
- [ ] Mobile/responsive pass and saved-character search/sort.

## Canon and determinism

- [x] Catalog validation and progression/loadout invariants.
- [x] Fixed-seed determinism checks and 10,000-pull smoke test.
- [x] Deterministic 100,000-pull comparison against V4.4.1.
- [ ] Build a broader manual canon-reference ordering suite before release.

## Remaining compatibility code

- [x] UI calls the modular generator facade.
- [x] External databases are authoritative; live legacy-array reads are zero.
- [ ] Retire inline generation/calculation compatibility functions only after fixed-seed parity is proven module by module.

V4 is not ready to declare complete yet. The remaining work is reviewed content expansion, canon-reference validation, import polish, responsive UI work, and eventual removal of the inline compatibility adapter.

