# Versioning

New Self Practice uses product releases that increase in increments of `0.1`.

- Current release: `v1.2`
- Next completed release: `v1.3`
- Following completed release: `v1.4`

For every completed release:

1. Update `APP_VERSION` in `app.js`.
2. Update the cache-busting versions in `index.html`.
3. Update `CACHE_NAME` and asset versions in `service-worker.js`.
4. Update the current release in `README.md` and this file.
5. Verify the app and smoke test.
6. Commit and push `main`; GitHub Actions deploys the public app automatically.
