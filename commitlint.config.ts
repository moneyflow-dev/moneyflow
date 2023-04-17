import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: { "subject-case": [2, "always", ["sentence-case"]] },
};

export default config;
