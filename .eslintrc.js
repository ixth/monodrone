module.exports = {
    root: true,
    extends: ['@ixth/eslint-config-react', 'plugin:react/jsx-runtime'],
    rules: {
        'react/jsx-props-no-spreading': 'warn',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.common.js',
            },
        },
        react: {
            version: 'detect',
        },
    },
};
