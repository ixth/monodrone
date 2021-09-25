const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        mode: 'production',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader],
                },
            ],
        },
        plugins: [
            new EnvironmentPlugin({ NODE_ENV: 'production' }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:6].css'
            }),
            new HtmlWebpackPartialsPlugin([
                {
                    path: './src/html/analytics.ejs',
                    location: 'head',
                    options: {
                        GA_ID: 'UA-123352333-1'
                    },
                },
            ]),
        ],
    });
