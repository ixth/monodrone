module.exports = {
    root: true,
    extends: ['@ixth/eslint-config-base', '@ixth/eslint-config-typescript'],
    rules: {
        'consistent-return': 'warn',
    },
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
            },
        },
    ],
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
