# New Self Practice

A private, local-first companion for practicing the four-week process in *Breaking the Habit of Being Yourself*.

## Product rules

- One active journey focuses on one primary habit or identity pattern.
- Each week requires seven completed practice days.
- A completed day requires a Change Declaration, meditation, and short reflection.
- After Day 7, a weekly review is required before advancing or repeating.
- Repeated cycles and all prior entries remain available for comparison.
- Sequential progression is the default; Settings includes an explicit flexible-progression override.
- All data stays in the browser unless the user exports an encrypted backup.

The app uses original companion exercises and page references. It does not reproduce the book's long-form text or guided scripts.

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

The smoke test uses headless Microsoft Edge to verify preparation, the meditation completion gate, seven sequential practice days, weekly repeat behavior, preserved entries, and the Settings progression override.
