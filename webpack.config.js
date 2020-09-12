const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: ['index'],
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
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
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/css', to: 'css' }],
        }),
    ],
};
