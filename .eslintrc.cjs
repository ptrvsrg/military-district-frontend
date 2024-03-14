module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:prettier/recommended",
        "plugin:sonarjs/recommended",
        "plugin:unicorn/recommended",
        "plugin:perfectionist/recommended-natural",
        "plugin:storybook/recommended"
    ],
    ignorePatterns: ["dist", "build_keycloak", "node_modules", "dist_keycloak"],
    parser: "@typescript-eslint/parser",
    plugins: [
        "react-refresh",
        "prettier",
        "sonarjs",
        "unicorn",
        "perfectionist",
    ],
    settings: {
        "import/resolver": {
            "node": {
                "paths": ["src"]
            }
        },
    },
    rules: {
        "prettier/prettier": ["warn", { endOfLine: "auto" }],

        "no-console": "off",
        "no-debugger": "warn",

        "import/prefer-default-export": "off",
        "import/no-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        'import/extensions': 'off',
        "perfectionist/sort-classes": "off",

        "unicorn/filename-case": [
            "error",
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                    kebabCase: true,
                },
            },
        ],
        "unicorn/no-null": "off",
        "unicorn/prefer-node-protocol": "off",
        "unicorn/prefer-ternary": "off",
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-lonely-if": "off",
        "unicorn/no-array-reduce": "off",
        "unicorn/no-nested-ternary": "off",
        "unicorn/prevent-abbreviations": [
            "error",
            {
                replacements: {
                    props: false,
                    ref: false,
                    env: false,
                },
            },
        ],
        "unicorn/consistent-destructuring": "off",
        "unicorn/no-unused-properties": "error",
        "unicorn/prefer-json-parse-buffer": "error",
        "unicorn/require-post-message-target-origin": "error",
        "unicorn/no-for-loop": 'off',

        "@typescript-eslint/semi": "off",
        "@typescript-eslint/quotes": "off",
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/no-param-reassign": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                args: "none",
                ignoreRestSiblings: true,
            },
        ],
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/no-use-before-define": "off",

        "sonarjs/max-switch-cases": ["error", 10],
        "sonarjs/no-inverted-boolean-check": "error",
        "sonarjs/elseif-without-else": "error",

        "getter-return": ["warn", {allowImplicit: true}],
        "class-methods-use-this": "off",
        "max-lines": ["warn", 300],
        "no-restricted-exports": ["error", {restrictDefaultExports: {defaultFrom: false}}],
        "max-len": ["error", {code: 150}],
        "object-curly-newline": "off",
        "arrow-body-style": "off",
        "operator-linebreak": "off",
        "implicit-arrow-linebreak": "off",
        "no-param-reassign": "off",
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: "latest",
        sourceType: "module",
    },
}