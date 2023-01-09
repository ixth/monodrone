module.exports = {
    root: true,
    extends: ['@ixth/eslint-config-base'],
    rules: {
        'consistent-return': 'warn',
    },
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
};
