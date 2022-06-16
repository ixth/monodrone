module.exports = {
    root: true,
    extends: ['@ixth/eslint-config', 'plugin:react/jsx-runtime'],
    rules: {
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Node.js builtins.
                    ['^node:'],
                    [`^(${require('module').builtinModules.join('|')})(/|$)`],
                    // Packages. `react` related packages come first.
                    ['^react', '^@?\\w'],
                    // Side effect imports.
                    ['^\\u0000'],
                    // Internal packages.
                    ['^(?:components|containers|html|lib|reducers|webaudio)\\/'],
                    // Parent imports. Put `..` last.
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    // Style imports.
                    [
                        '^.+\\.css$',
                        '^.+\\.less$',
                        '^.+\\.sass$',
                        '^.+\\.scss$',
                        '^.+\\.styl$',
                        '^.+\\.pcss$',
                    ],
                ],
            },
        ],
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
    },
};
