const { EnvironmentPlugin } = require('webpack');
const { mergeWithRules } = require('webpack-merge');

const common = require('./webpack.common');

const merge = mergeWithRules({
    module: {
        rules: {
            test: 'match',
            use: 'prepend',
        },
    }
});

module.exports =
    merge(common, {
        mode: 'development',
        devtool: 'eval-source-map',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader'],
                },
            ]
        },
        plugins: [
            new EnvironmentPlugin({ NODE_ENV: 'development' }),
        ],
    });
