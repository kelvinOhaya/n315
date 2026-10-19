import { defineConfig } from "vite";

// Keep generated asset URLs relative so the site also works from a hosted
// subdirectory, such as the course server's per-user web folder.
export default defineConfig({
  base: "./",
});
