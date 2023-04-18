import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": "src/app",
      "@processes": "src/processes",
      "@pages": "src/pages",
      "@widgets": "src/widgets",
      "@features": "src/features",
      "@entities": "src/entities",
      "@shared": "src/shared",
    },
  },
});
