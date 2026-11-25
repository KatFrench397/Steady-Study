[README.md](https://github.com/user-attachments/files/35389779/README.md)
# Steady Study (standalone web app)

A free, private weekly planner for students. It breaks each assessment into small dated steps, keeps resources together, shows progress and reminder banners, exports the plan to a calendar, and reads due dates from a calendar file or pasted unit-outline text.

It is a static site. There is no server, no database, no accounts and no tracking. Each student's plan is stored in their own browser. It installs on phones and computers and works offline.

**Before you publish, read `PUBLISHING-CHECKLIST.md`.** The first item is confirming who owns the app.

## Commands

Requires Node.js 22 or later.

```bash
npm install
npm test          # unit tests for the date importers
npm run build     # type-check, bundle, write dist/ (warns about unfilled placeholders)
npm run serve     # preview dist/ at http://localhost:4173 (offline mode works on localhost)
npm run fonts     # re-embed the fonts from @fontsource into src/app/fonts.ts
```

`dist/` is the whole site. Upload that folder to any static host.

## What is where

```
src/main.ts              starts the app, asks the browser to keep storage, registers the service worker
src/app/app.ts           clicks, forms, downloads, import actions
src/app/views.ts         the screens (This week, Assessments, Comfort and reminders)
src/app/store.ts         saved state, example units, input checking
src/app/templates.ts     the step plans for each assessment type
src/app/importer.ts      calendar-file (.ics) and pasted-text date finders
src/app/calendar.ts      .ics and Outlook .csv export
src/app/styles.ts        all CSS, scoped under .steady (edit this by hand)
src/app/fonts.ts         generated font data (do not edit)
public/                  index.html, About / Privacy / Terms, manifest, icons, _headers, licences
scripts/build.mjs        bundles, copies public/, writes the offline service worker
tests/                   importer tests
```

## Changing the step plans

Edit `src/app/templates.ts`. Each plan is a list of rows: position across the work window (0 to 1), step text, minutes, and an optional `'revise'` flag. Plans are worked back from the due date over the window length for that type. Run `npm test` and `npm run build` afterwards.

## How updates reach students

Every build gets a new version number inside `sw.js`. After you upload a new `dist/`, a student's device picks it up on their next visit and uses it from the visit after that. Their saved plan is not touched.

## Privacy by design

- The page's Content Security Policy (in `index.html` and `_headers`) only allows connections to the site itself, so the app cannot send data anywhere else. This is also what the Privacy page relies on, so do not loosen it without updating that page.
- Fonts are embedded, so no request goes to a font host.
- Nothing is stored except in the browser's local storage on the student's device, under the key `steady-study-v1`.

## Known limits

- **A plan lives in one browser on one device.** It does not sync. Students back up and restore with a file. Syncing through the student's own OneDrive or Google Drive would need accounts and sign-in, which is a larger piece of work.
- **Reminder banners show only while the app is open.** Reminders on a phone come from importing the downloaded calendar file into the student's calendar app.
- **Date import is best effort.** It reads common date styles (day first, as in Australia) and always shows the results for the student to check.
- **No link to any learning platform.** Students bring their dates in by file or paste.
- **Accessibility has had developer checks only,** not a formal audit or testing with assistive technology.
- **Tested in desktop Chromium** (install files, offline, import, phone-width and dark layouts). It has not been tested on real iPhones or Android phones.

## Licences

The app code has no licence yet. Choose one after ownership is settled. The bundled fonts (Atkinson Hyperlegible and Lexend) are under the SIL Open Font License 1.1, and `public/licenses.txt` ships with the site.
