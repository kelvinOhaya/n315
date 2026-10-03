# Homework 4 — User Feedback (Toasts, Validation & Navigation)

A small vanilla JavaScript site that demonstrates reusable toast/alert
notifications, client-side form validation, a login modal, and simple
hash-based page navigation.

## Live Links

- **GitHub Repository:** https://github.com/kelvinOhaya/n315/tree/main/homeworkFour
- **Web4 Deployment:** https://in-info-web4.luddy.indianapolis.iu.edu/~kelohaya/homeworkFour/

## Project Structure

```
homeworkFour/
├── index.html          # App shell: nav, login modal, toast container
├── css/
│   └── styles.css      # Page, modal, form, and toast/notification styling
├── src/
│   ├── app.js           # App entry point: routing, login, and data-loading logic
│   ├── model.js         # Loads page content into #app based on the URL hash
│   └── utility.js        # Reusable showToast() notification utility
└── pages/
    ├── home.js          # Home page markup (includes "Load Data" demo)
    └── about.js         # About page markup
```

## Features

### 1. Reusable Toast/Alert Utility

[`src/utility.js`](./src/utility.js) exports a single `showToast(message, type)`
function that any page or script can import to display a notification. Toasts
are appended to a fixed-position container, auto-dismiss after a few seconds,
and animate in/out.

```js
import { showToast } from "./utility.js";

showToast("Saved successfully!", "success");
```

Supported `type` values (each mapped to its own style in `styles.css`):

| Type      | Used for                            |
| --------- | ----------------------------------- |
| `success` | Confirming a successful action      |
| `error`   | Validation failures / problems      |
| `info`    | Neutral messages (e.g. logging out) |
| `loading` | Indicating an action is in progress |

### 2. Notification Styling

Toasts live in `#toastContainer` (top-right, fixed position) and share a base
`.toast` style with a colored left border per type (`.toast--success`,
`.toast--error`, `.toast--info`, `.toast--loading`). Toasts slide/fade in on
creation and slide/fade out before being removed from the DOM.

### 3. Pages & Navigation

The site uses hash-based routing (`#home`, `#about`). [`src/app.js`](./src/app.js)
listens for `hashchange`/`load` events and calls `loadPages()` in
[`src/model.js`](./src/model.js), which swaps the markup injected into `#app`
between [`pages/home.js`](./pages/home.js) and [`pages/about.js`](./pages/about.js).
Navigation links live in the header `<nav>` in [`index.html`](./index.html).

### 4. Login / Sign-In

Clicking the **LOGIN** button in the nav opens a modal (`#loginModal`)
containing an email field and a password field. Submitting the form is
intercepted (`preventDefault`) and validated before anything is "submitted".

### 5. Form Validation

The login form is validated in `app.js` before it is accepted:

- Empty email / empty password
- Leading/trailing whitespace trimmed before checking
- Minimum length checks (email length, password length ≥ 6 characters)
- Email must contain an `@` character
- Each failure shows a specific `error` toast describing what to fix, and
  stops the submission

### 6. Validation & Success Feedback

- Any validation failure → red `error` toast with a specific message
  (e.g. "Please enter a valid email address").
- Successful login → green `success` toast ("You have successfully signed
  in!"), the modal closes, the form resets, and the button switches to
  "Logout".
- Logging out → blue `info` toast confirming the user was signed out.

### 7. Additional User Feedback Example

On the Home page, clicking **Load Data** shows a `loading` toast, simulates a
network delay with `setTimeout`, then injects sample data into the page and
shows a `success` toast once it's "loaded" (see `loadData()` in `app.js`).

## Running Locally

This is a static site with ES module scripts, so it needs to be served over
HTTP (not opened directly as a `file://` URL). From the project folder:

```powershell
npx serve .
# or any other static file server
```

Then open the printed local URL in your browser.

## Deployment

The project is deployed as static files to the Web 4 server at the link above
and mirrored in the GitHub repository for grading.
