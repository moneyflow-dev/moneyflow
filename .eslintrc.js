module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:boundaries/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "boundaries", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          // Use public API only
          "@app/**",
          "@pages/*/**",
          "@features/*/**",
          "@entities/*/**",
          "@shared/*/*/**",

          "../**/app",
          "../**/pages",
          "../**/features",
          "../**/entities",
          "../**/shared",
        ],
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
        pathGroups: [
          "@processes/**",
          "@pages/**",
          "@features/**",
          "@entities/**",
          "@shared/**",
        ].map((pattern) => ({
          pattern,
          group: "internal",
          position: "after",
        })),
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            from: "app",
            allow: [
              "processes",
              "pages",
              "widgets",
              "features",
              "entities",
              "shared",
            ],
          },
          {
            from: "processes",
            allow: ["pages", "widgets", "features", "entities", "shared"],
          },
          {
            from: "pages",
            allow: ["widgets", "features", "entities", "shared"],
          },
          { from: "widgets", allow: ["features", "entities", "shared"] },
          {
            from: "features",
            allow: ["entities", "shared"],
          },
          { from: "entities", allow: ["shared"] },
          { from: "shared", allow: ["shared"] },
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
    "boundaries/elements": [
      { type: "app", pattern: "src/app/*" },
      { type: "processes", pattern: "src/processes/*" },
      { type: "pages", pattern: "src/pages/*" },
      { type: "widgets", pattern: "src/widgets/*" },
      { type: "features", pattern: "src/features/*" },
      { type: "entities", pattern: "src/entities/*" },
      { type: "shared", pattern: "src/shared/*" },
    ],
  },
};
