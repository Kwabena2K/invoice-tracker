import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    watch: {
      usePolling: true,   
      interval: 100,     
    },
  },
  plugins: [react(), tailwindcss()],
});
