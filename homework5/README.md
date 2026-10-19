# Summit Ridge Outfitters

web4 link: <https://in-info-web4.luddy.indianapolis.iu.edu/~kelohaya/homework5/dist/#contact>

A client-side outdoor outfitter storefront built with vanilla JavaScript, Vite, and Sass. The site presents Summit Ridge's gear categories, company story, adventure guides, and contact information, with simulated login and signup flows.

## Getting started

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Vite prints a local URL in the terminal. Open it in a browser to use the site.

## Available commands

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the local development server.                  |
| `npm run build`   | Create a production build in `dist/`.                |
| `npm run preview` | Preview the production build locally after building. |

## Pages

The site uses hash-based navigation. Open a page using the navigation menu or the corresponding hash route:

| Route                | Page                                                         |
| -------------------- | ------------------------------------------------------------ |
| `#/shop` (default)   | Storefront, product/category sections, and featured content. |
| `#/about`            | Company story, values, team, history, and store details.     |
| `#/adventure-guides` | Adventure and guided-trip information.                       |
| `#/contact`          | Contact details and frequently asked questions.              |
| `#/login`            | Login form.                                                  |
| `#/signup`           | Account registration form.                                   |

Unknown routes fall back to the shop page. Shared navigation, footer, and toast components are in `src/scripts/components/`.

## Project structure

```text
index.html
public/                 Static icons and favicon
src/
  assets/               Images and SVG artwork
  scss/                 Global styles and page/component styles
  scripts/
    auth.js             Local-storage authentication simulation
    main.js             App startup, routing, and delegated events
    components/         Shared navigation, footer, toast, and shop title
    pages/              Page templates and form submission handlers
    utils/              Validation and form feedback helpers
```

The page templates are JavaScript functions that render into the `#app` element. `main.js` reads the route from the URL hash and renders the matching page from `src/scripts/pages/pages.js`.

## Authentication behavior

Signup and login are simulated in the browser; there is no server or API. User records and the login state are stored in `localStorage`, and signup/login return the user to the shop page. This is coursework/demo behavior only: passwords are stored as plain text in the browser and must not be used for real accounts.

## Notes

- Sass is loaded through the Vite entry point at `src/scripts/main.js`.
- Vite uses relative asset URLs so the production build can be hosted from a subdirectory. Upload the **contents** of `dist/` to the directory that serves the site.
- Shop category and product photography is served by Unsplash Images at responsive resolutions; those photos and the Google Fonts require an internet connection. Replace the photo IDs in `src/scripts/pages/shop.js` with your own image URLs or local assets when you have product photography.
- The storefront is a presentation/demo site; no checkout or product inventory backend is configured.
