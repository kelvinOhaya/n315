# The Jungle Cook

**Live site:** [https://in-info-web4.luddy.indianapolis.iu.edu/~kelohaya/homework8/dist/](https://in-info-web4.luddy.indianapolis.iu.edu/~kelohaya/homework8/dist/)

The Jungle Cook is a recipe management web app (originally built as a class project, `homework7`, now homework 8). Users sign in, create recipes with ingredients, instructions, and an optional photo, then browse, search, view, edit, and delete their own recipes — all backed live by Firebase Authentication and Cloud Firestore.

## Features

- **Authentication** — email/password login and sign-up via Firebase Auth (`#login`, aliased as `#auth`). The navbar and page greetings update live as auth state resolves.
- **Create a recipe** (`#create-recipie`) — name, description, total time (a numeric value plus a Seconds/Minutes/Hours/Days unit dropdown), serving size (validated to a whole number between 1 and 1,000), an optional image (stored as a base64 data URL on the recipe document), and dynamically add/remove ingredient and instruction rows.
- **Browse & search** (`#browse`) — fetches only the signed-in user's recipes from Firestore (`where("uid", "==", ...)`) into a card grid, with a live search box that filters cards by title as you type.
- **Recipe detail modal** — clicking a card opens a modal with the full description, serving size, total time, an ingredients list, and a numbered instructions list; dismissible via its close button, clicking outside the card, or the <kbd>Escape</kbd> key.
- **Edit & delete** — each card's "Edit Recipe" button opens `#edit` with the form pre-filled from that recipe's Firestore document for updating in place; "Delete" removes the document immediately and refreshes the grid.

## Tech stack & architecture

- **Build tool:** [Vite](https://vite.dev/)
- **Language:** vanilla JavaScript — no UI framework. Each page/component is a plain function that returns an HTML template-literal string, with an optional `init()` export used to attach event listeners after the markup is inserted into the DOM.
- **Routing:** a small custom hash router in `src/main.js` maps a URL hash (e.g. `#create-recipie`) to a matching file in `src/pages/` (kebab-case hashes are converted to camelCase filenames), renders its default export, and calls its `init()` if present.
- **Styling:** Sass/SCSS, with one partial per page/component under `src/styles/`, all aggregated through `src/styles/styles.scss`.
- **Backend:** [Firebase](https://firebase.google.com/) — Authentication and Cloud Firestore, initialized in `src/firebase/firebase.js`. Security rules live in `firestore.rules` and `storage.rules`, deployed per `firebase.json`.

### Project layout

```
src/
├── main.js                # Hash router + Firebase auth-state wiring
├── firebase/
│   └── firebase.js         # Firebase app/auth/Firestore/Storage initialization
├── pages/                  # One file per route: default export renders HTML, optional init()
│   ├── home.js              # "#home" (default route)
│   ├── login.js             # "#login" / "#auth" — login & sign-up forms
│   ├── createRecipie.js     # "#create-recipie" — recipe creation form
│   ├── browse.js            # "#browse" — recipe grid, search, detail modal, edit/delete
│   └── edit.js               # "#edit" — recipe edit form, pre-filled from Firestore
├── components/              # Reusable render functions
│   ├── navbar.js, footer.js, snackbar.js, logoutModal.js
│   ├── recipiePreview.js     # Recipe summary card used in the browse grid
│   └── recipieModal.js       # Recipe detail modal
└── styles/                  # One .scss partial per page/component
```

## Run locally

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

## Build and publish

Create a production build with:

```sh
npm run build
```

Vite writes the static site to `dist/`. To publish through FTP, upload the **contents** of `dist/` to the directory served by the web host.
