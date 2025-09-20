import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
       "/api": {
        target: "http://localhost:5000", // your backend
        changeOrigin: true,
        secure:false,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix
      },
    },
  },
});
