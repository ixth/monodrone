const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['react', 'index'],
    devtool: 'source-map',
    resolve: {
        modules: [path.resolve(__dirname, 'src/js'), 'node_modules'],
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src/js'),
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new webpack.ProvidePlugin({ 'React.createElement': ['react', 'createElement'] }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/css', to: 'css' }],
        }),
    ],
};
