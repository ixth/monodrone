const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: ['index'],
    output: {
        clean: true,
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    resolve: {
        modules: [path.resolve(__dirname, 'src/js'), 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src/js'),
                use: 'ts-loader',
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src/js'),
                use: 'babel-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/css', to: 'css' }],
        }),
    ],
};
