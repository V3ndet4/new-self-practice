# New Self Practice

A private, local-first companion for practicing the four-week process in *Breaking the Habit of Being Yourself*.

Current release: `v1.1`

## Product rules

- One active journey focuses on one primary habit or identity pattern.
- The Introduction and Chapters 1-9 are required sequential Foundations before the four-week practice begins at Chapter 10.
- Each week requires seven completed practice days.
- A completed day requires a Change Declaration, meditation, and short reflection.
- After Day 7, a weekly review is required before advancing or repeating.
- Repeated cycles and all prior entries remain available for comparison.
- Sequential progression is the default; Settings includes an explicit flexible-progression override for practice days after Foundations.
- All data stays in the browser unless the user exports an encrypted backup.
- Every Foundation and daily session ends with a required One Move action contract: cue, observable response, smallest version, and proof.
- Sunset glow, return streaks, milestones, and practice sparks make consistency visible without weakening the required sequence.
- Pattern Lab supports Review the Moment and Rehearse the Moment with personalized branching choices.
- An optional deterministic private reflection coach specializes observations from local Pattern Lab sessions without sending data anywhere.
- The v1.0 Island Journey UI replaces the dashboard/sidebar layout with a map-first practice world and sticky compass navigation.
- The v1.1 Personal Journey Map shows the current island location, current practice point, completed path, and next unlock.

The app uses original companion exercises and page references. It does not reproduce the book's long-form text or guided scripts.

## Versioning and publishing

- This Island Journey setup started at `v1.0`; completed releases increase by `0.1`: `v1.1`, `v1.2`, and so on.
- Each completed release is committed and pushed to `main`.
- GitHub Actions automatically publishes `main` to the public GitHub Pages URL.
- GitHub deployment verifies JavaScript syntax and version consistency before publishing.

## Run locally

```powershell
node server.mjs
```

Open `http://127.0.0.1:4174`.

## Verify

With the local server running:

```powershell
node smoke-test.mjs
```

The smoke test uses headless Microsoft Edge to verify preparation, all required Foundations, precise One Moves, enforced follow-through, the meditation completion gate, seven sequential practice days, weekly repeat behavior, preserved entries, and the Settings progression override.

Verify release version consistency:

```powershell
node version-check.mjs
```
