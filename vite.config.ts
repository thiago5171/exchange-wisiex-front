import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["318f-2804-788-5c1-a300-618a-5475-6ab3-135e.ngrok-free.app"],
  },
});
