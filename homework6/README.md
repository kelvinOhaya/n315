# The Jungle Cook

**Live site:** [https://in-info-web4.luddy.indianapolis.iu.edu/~kelohaya/homework6/dist/#home](https://in-info-web4.luddy.indianapolis.iu.edu/~kelohaya/homework6/dist/#home)

The Jungle Cook is a responsive recipe website built as a front-end class project. It includes a landing page, a browse page, a recipe creation page, and login and sign-up forms.

## Features

- Responsive desktop navigation and a mobile dropdown menu
- Hash-based navigation between pages
- Active-page underline in the navigation
- Login and sign-up forms with browser-required field validation
- A simulated authentication flag that reveals the “Create Recipe” navigation link after login or sign-up

Authentication is only simulated in the browser. There is no account service or persistent sign-in, so the flag resets when the page is reloaded.

## Built with

- JavaScript modules
- Vite
- Sass
- HTML and CSS

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

Vite writes the static site to `dist/`. To publish through FTP, upload the **contents** of `dist/` to the directory served by the web host. The project uses relative asset paths and hash-based routes, so the build can be hosted from a subdirectory without server-side route rewrites.
