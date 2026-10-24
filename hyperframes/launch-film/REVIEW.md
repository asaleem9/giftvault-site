# Review: launch film (45 s, 1920×1080, 30 fps)

## Creative calls
- Built storyline 1, "The drawer" (`STORYLINES.md`): a dumped-out drawer of merchant-coloured cards gathers into the phone, then the real app does the real task. Not built: "At the register" (result-first endless zoom) and "The honest ledger" (type carries the argument).
- Every product frame is the product: the App Store screenshots and five trimmed UI-test recordings, inside a plain CSS phone at 1.6–1.9×. Nothing on the screen is drawn.
- One accent word per title in brass; the frame floods to linen at the flip (33.4 s) because the app ramps brightness there.
- Copy comes from the app's onboarding and Settings text; the only authored lines are the hook ("Nine stores. One drawer." / "Which one still has money on it?") and they make no claim.

## Measured
- `check --json` clean: 0 lint, runtime, layout or contrast errors. Kept warnings: `first_frame_empty` (frame 0 is the full drawer; the cards are marked `data-layout-ignore` so the audit cannot see them) and `nested_structure_needs_subcomposition` on the two-level hosts.
- Render: 45.00 s, H.264 + AAC, 9.0 MB. `audio --json`: onsets at 2.34 s (tag pop), 8.62 s (gather whoosh), 33.48 s (flip impact, the film's peak), 42.95 s (CTA pop); integrated −16.6 LUFS, true peak −9.6 dBTP, no clipping. The sound was measured, not heard.
- Looked at: the beat sheet (14 frames), seams 2 and 4 at ±0.2 s, and eight targeted frames after the fixes.

## Fixes made from the review
- Quiet lines rendered without spaces (word spans had no margin) → `.quiet .w` spacing.
- The phone vanished at the reveal → proof-add seam and again at proof-spend → payoff → the phone now sits at the same spot from 8 s to 36.6 s; only its screen cuts, and the payoff phone's body turns light with the flood instead of being a different phone.
- The payoff punch-in pushed the phone over the title → punch stays centred on the phone (1.18×, no x travel).
- The expiry tag sat over the DoorDash card → anchored to the Target card's top-left.
- The CTA held 1.6 s → now 2.2 s.
- Cards reached the title band → rows raised; titles at 800/920 px.

## Not done, and why
- No music bed: no HeyGen sign-in and MusicGen's Python deps are not installed. Sounds on the four visible actions come from the bundled offline library (CC0, no credit needed). To add music later: sign in with `heygen auth login --oauth` and run `npx hyperframes media-use resolve --type bgm --intent "calm minimal pulse, 100 bpm, warm"` in this folder, then place the file as an `<audio>` in `index.html` at 0.14 volume.

## Weakest shot
The tension beat (3.5–8 s) is a push-in on a tag; with more time it would be a card flipped over to a faded, unreadable barcode so the "old way" fails on screen.
