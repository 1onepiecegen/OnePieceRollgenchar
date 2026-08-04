# One Piece Sandbox Simulator — Release Hardening

Open `index.html` to play. `onepiecerollv4.html` remains a compatibility redirect. The project has no build step and keeps all authoritative game content in external `database/` modules.

## Current highlights

- 202 Devil Fruits total: 126 canon, 1 supplemental, and 75 clearly labelled fan/original records.
- Stable fruit IDs, source labels, rarity weights, lore rarity, and 65 battle affinities.
- World-unique/anomaly fruits are extremely rare in standard generation but remain selectable in Sandbox.
- The Gomu Gomu no Mi late-Wano identity, magma-over-flame interaction, darkness nullification, and Blackbeard's explicit two-fruit exception are represented without inventing a confirmed cause.
- 24 reviewed Battle profiles and 24 savable Sandbox character-copy presets, including Goose, the Eclipsed Goddess.
- Standard Adventure and Brutal Grand Line are separate roll modes, with transparent, optional Voyage Luck and separate records.
- Roll 1, Roll 10, and Roll 100 produce compact result cards so rare discoveries do not require repeated clicking.
- A separate Battle Match page has phase presentation, pacing, pause/skip controls, arena choices, accessible effects, replay export, Player-versus-AI, and AI-versus-AI modes.
- Wanted Poster Studio creates local, editable Canvas posters and exports PNG files without a backend.
- Editable character names preserve the generated Build ID and seed.

Combat profiles are curated simulator interpretations, not official numeric power rankings. Battle affinities are game rules rather than a claim that One Piece has a universal elemental type chart.

## Validation

Run `node developer/run-encoding-check.cjs` for the source encoding guard. Run `node developer/run-v5.2-tests.cjs 10000` for the smoke suite, or `node developer/run-v5.2-tests.cjs 100000 --v54 --v54-full` for the full mode comparison. Start `node developer/local-static-server.cjs` for a GitHub-Pages-like local check.

