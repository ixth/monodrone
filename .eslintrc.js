module.exports = {
    root: true,
    extends: [
        '@ixth/eslint-config-base',
        '@ixth/eslint-config-react/tsx',
        '@ixth/eslint-config-typescript',
    ],
    overrides: [
        {
            files: ['*.jsx', '*.tsx'],
            rules: {
                'react/jsx-props-no-spreading': 'warn',
            },
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
            },
        },
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.common.js',
            },
            typescript: {
                project: './tsconfig.json',
            },
            workspaces: {
                sources: {
                    '@ixth/wa-components/*': ['./packages/wa-components/src/*'],
                    '@ixth/midi-utils/*': ['./packages/midi-utils/src/*'],
                },
            },
        },
        react: {
            version: 'detect',
        },
    },
};
