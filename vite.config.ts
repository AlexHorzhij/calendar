import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/calendar/",
  plugins: [react()],
  server: {
    proxy: {
      "/tasks": "http://localhost:3001",
      "/countries": "http://localhost:3001",
    },
  },
});
