import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import z from "zod";

const envSchema = z.object({
  VITE_APP_VERSION: z.string(),
  VITE_APP_GITHUB_LINK: z.string().url(),
  VITE_APP_RELEASES_LINK: z.string().url(),
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Validate env
  const env = Object.assign({}, process.env, loadEnv(mode, process.cwd()));
  envSchema.parse(env);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@app": path.resolve("src/app"),
        "@processes": path.resolve("src/processes"),
        "@pages": path.resolve("src/pages"),
        "@widgets": path.resolve("src/widgets"),
        "@features": path.resolve("src/features"),
        "@entities": path.resolve("src/entities"),
        "@shared": path.resolve("src/shared"),
      },
    },
  };
});
