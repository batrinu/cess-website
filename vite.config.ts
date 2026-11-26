import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  // Must be an absolute base now that routes are real paths: with './', assets on a
  // nested route such as /blog/post would resolve to /blog/assets/… and 404.
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // Split long-lived library code out of the app chunk so a content or
            // component change does not force visitors to re-download React.
            manualChunks: {
              react: ["react", "react-dom", "react-router"],
            },
          },
        },
  },
}))
