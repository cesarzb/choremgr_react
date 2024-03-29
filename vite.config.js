import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

let base = "/";

try {
  base = process.env.VITE_BASE_PATH;
  if (base === undefined) {
    throw new Error("Base url is undefined!");
  }
} catch {
  base = "/choremgr_react";
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  base: base,
});
