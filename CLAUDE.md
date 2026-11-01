# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 18 + TypeScript admin dashboard for a QR code service, built on Create React App (`react-scripts` 5). It talks to a separate backend API that is not in this repo. Admins manage QR codes and other admins; the public landing page for a scanned QR code is also served from this app.

## Commands

```bash
npm install
npm run dev                  # Dev server on http://localhost:3000
npm run build                # Production build to build/
npm start                    # Serves an existing build/ with `serve -s`; NOT the dev server (the README is out of date here)
npx tsc --noEmit             # Type-check
npx eslint --ext .ts,.tsx src  # Lint (uses the eslintConfig in package.json)
```

There are currently no test files, so `npm test` reports "No tests found" and exits 1. Jest is configured through CRA and picks up `src/**/*.{spec,test}.{ts,tsx}`. To run once, or to run a single file:

```bash
CI=true npx react-scripts test --watchAll=false --watchman=false
CI=true npx react-scripts test --watchAll=false --watchman=false src/path/to/File.test.tsx
```

Keep `--watchman=false`: without it the run hung for over 3 minutes on this machine.

## Configuration

Two environment variables live in a gitignored `.env`, and CRA inlines them at build time, so changing either requires a rebuild:

- `REACT_APP_API_URL`: backend base URL, also used to build media and QR image URLs.
- `REACT_APP_APP_URL`: this app's public URL, used for the scan link in `QrListItem`.

Docker builds need `--build-arg REACT_APP_API_URL=...`. The Dockerfile has no build arg for `REACT_APP_APP_URL`, so on a checkout without `.env` the scan links render as `undefined/<qrId>`.

## Architecture

### Routing (`src/App.tsx`)

Route segments come from the `RoutesPath` enum in `src/libs/constants/index.ts`. There are three top-level areas:

- `/` renders `RootLayout`, which holds the authenticated dashboard pages. `RootLayout` is the auth guard: it calls `useProtectedRouteWrapper`, which only checks that a token exists in `localStorage`.
- `/auth` is the login page.
- `/:id` is `ScanPage`, the public page for a scanned QR code. It sits outside `RootLayout` and has no auth guard. It records the scan, then redirects (`WEBSITE`) or renders the matching preview component for the QR type.

### State and data fetching

All feature API calls use RTK Query. `src/reducers/apiSlice.ts` defines the base API; each feature slice adds its endpoints with `apiSlice.injectEndpoints` in the same file as its plain Redux slice:

- `qrSlice.ts` and `adminSlice.ts` each hold endpoints plus UI state (dialogs, selected row). Both export actions named `openConfirmDialog`/`closeConfirmDialog`, so check which slice you are importing from.
- `appSlice.ts` holds global UI state: app bar title (set with the `useChangeAppTitle` hook) and the toast (`openSnackbar`).

Caching works through a single tag per resource (`REDUX_TOOLKIT_TAGS`): any QR mutation invalidates all QR queries, and likewise for admins.

Use `useAppDispatch`/`useAppSelector` from `src/store.ts`. Paths, tags, HTTP methods and shared enums belong in `src/libs/constants/index.ts`.

Mutations are typically called with `.unwrap()` inside `try/catch`; errors go through `HTTPResponseError.fromResponse` (`src/utils/error.ts`) and are shown with `openSnackbar`.

### Auth

- Login is the only caller of `src/api/client.ts` (`ApiClient`); everything else goes through RTK Query. New API calls should too.
- Tokens are stored in `localStorage`. Every RTK Query request sends both `Authorization: Bearer` and `x-refresh-token`, including from the public `ScanPage`.
- `baseQueryWithReauth` clears `localStorage` and redirects to `/auth` on any 403, again including on `ScanPage`. 401 is not handled, and the client never refreshes tokens itself.

### QR codes: the type-driven form

`QRType` (`WEBSITE`, `V_CARD`, `PDF`, `IMAGE`, `SOCIAL`) drives most of the QR code. `QR.data` is a union: a plain URL string for `WEBSITE`, otherwise `Employee`, `Media` or `Social`.

`src/components/features/qr/QrCoreForm.tsx` is shared by the create and edit pages. It keeps all type-specific fields in one react-hook-form instance, renders the sub-form for the selected type, and shows a live preview beside it. The preview components are also what `ScanPage` renders publicly, so changes to them affect both.

Adding or changing a QR type touches these places:

1. `QRType` in `src/libs/constants/index.ts`
2. Data model in `src/libs/models/qr.ts`
3. `qrSchema` in `src/libs/schemas/qr.schema.ts` (its enum lists feed the `QRInput` type)
4. `QrCoreForm`: default values, radio button, sub-form, `FormData` building in `onSubmit`, preview
5. The per-type branches in `ScanPage` and `QRDetailPage`

Adding a social platform is a separate change, and the icons are duplicated: update `SocialType`, the enum in `qrSchema`, `socialList` in `src/libs/constants/social-list.tsx` (form dropdown) and `src/utils/SocialTypeIcon.tsx` (preview).

Things to know about this form:

- `qrSchema` is not connected to the form: there is no `zodResolver`, so only its `QRInput` type is used. Validation comes from `required` on the inputs. `AdminForm` does use `zodResolver`.
- Create and update send multipart `FormData`, with the file under `data` and fields in bracket notation (`data[title]`, `data[socialMedia][0][url]`). Do not set `Content-Type` on these requests.
- In edit mode, `file` defaults to the stored media key (a string), not a `FileList`, yet `onSubmit` and the previews read `file[0]`.
- `onSubmit` navigates to `/all` in `finally`, so it leaves the form on errors as well.

### Conventions

- `src/pages` holds thin route components; logic lives in `src/components/features/{qr,admins}`. Reusable UI is in `components/shared` and `components/form`.
- Styling is Tailwind utility classes, with `primary`, `secondary` and `success` colors from `tailwind.config.js`. Tailwind runs through CRA, so there is no PostCSS config.
- Media files are loaded from `${REACT_APP_API_URL}/media/<key>`.

## Deployment

- `Dockerfile`: multi-stage build (Node 18, then nginx). `nginx.conf` handles the SPA fallback and listens on port 80, although the Dockerfile says `EXPOSE 3000`, so map to container port 80.
- `buildspec.yml`: AWS CodeBuild on Node 20, publishing `build/` as the artifact.
