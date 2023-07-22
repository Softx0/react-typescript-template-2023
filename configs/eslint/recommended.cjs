module.exports = {
    extends: [
        "./-private/eslint/best-practices.cjs",
        "./-private/eslint/es6.cjs",
        "./-private/eslint/possible-errors.cjs",
        "./-private/eslint/stylistic-issues.cjs",
        "./-private/eslint/variables.cjs"
    ],
    overrides: [
        {
            files: ["**/*.json"],
            plugins: [
                "prettier",
                "eslint-comments",
                "import",
                "filenames",
                "i18n-text",
                "no-only-tests",
                "json",
            ],
            extends: ["plugin:json/recommended"],
        },
    ],
};
