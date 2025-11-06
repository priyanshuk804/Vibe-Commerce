import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000", // only for local dev
    },
  },
  build: {
    outDir: "dist",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(command === "serve" ? "development" : "production"),
  },
}));
