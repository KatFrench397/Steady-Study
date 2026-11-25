[README.md](https://github.com/user-attachments/files/35389779/README.md)
# Steady Study (standalone web app)

A free, private weekly planner for students. It breaks each assessment into small dated steps, keeps resources together, shows progress and reminder banners, exports the plan to a calendar, and reads due dates from a calendar file or pasted unit-outline text.

It is a static site. There is no server, no database, no accounts and no tracking. Each student's plan is stored in their own browser. It installs on phones and computers and works offline.


## Privacy by design

- The page's Content Security Policy (in `index.html` and `_headers`) only allows connections to the site itself, so the app cannot send data anywhere else. 
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
