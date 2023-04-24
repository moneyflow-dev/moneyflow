module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          // Use public API only
          "@app/**",
          "@processes/*/**",
          "@pages/*/**",
          "@widgets/*/**",
          "@features/*/**",
          "@entities/*/**",
          "@shared/*/*/**",

          "../**/app",
          "../**/processes",
          "../**/pages",
          "../**/widgets",
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
          "@widgets/**",
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
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // processes
          {
            target: "src/processes",
            from: "src/app",
          },
          // Cross import
          {
            target: "src/processes/*/**/*",
            from: "src/processes/*/*",
          },

          // pages
          {
            target: "src/pages",
            from: "src/app",
          },
          {
            target: "src/pages",
            from: "src/processes",
          },
          // Cross import
          {
            target: "src/pages/*/**/*",
            from: "src/pages/*/*",
          },

          // widgets
          {
            target: "src/widgets",
            from: "src/app",
          },
          {
            target: "src/widgets",
            from: "src/processes",
          },
          {
            target: "src/widgets",
            from: "src/pages",
          },
          // Cross import
          {
            target: "src/widgets/*/**/*",
            from: "src/widgets/*/*",
          },

          // features
          {
            target: "src/features",
            from: "src/app",
          },
          {
            target: "src/features",
            from: "src/processes",
          },
          {
            target: "src/features",
            from: "src/pages",
          },
          {
            target: "src/features",
            from: "src/widgets",
          },
          // Cross import
          {
            target: "src/features/*/**/*",
            from: "src/features/*/*",
          },

          // entities
          {
            target: "src/entities",
            from: "src/app",
          },
          {
            target: "src/entities",
            from: "src/processes",
          },
          {
            target: "src/entities",
            from: "src/pages",
          },
          {
            target: "src/entities",
            from: "src/widgets",
          },
          {
            target: "src/entities",
            from: "src/features",
          },
          // Cross import
          {
            target: "src/entities/*/**/*",
            from: "src/entities/*/*",
          },

          // shared
          {
            target: "src/shared",
            from: "src/app",
          },
          {
            target: "src/shared",
            from: "src/processes",
          },
          {
            target: "src/shared",
            from: "src/pages",
          },
          {
            target: "src/shared",
            from: "src/widgets",
          },
          {
            target: "src/shared",
            from: "src/features",
          },
          {
            target: "src/shared",
            from: "src/entities",
          },
        ],
      },
    ],
    "import/default": "off",
    "import/no-named-as-default-member": "off",
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
};
