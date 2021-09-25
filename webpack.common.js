const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcRoot = path.resolve(__dirname, 'src');

const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;
const xmlPrologue = /<\?xml.+?\?>[^\S]*/g;

const encodeSVG = (data, externalQuotesValue = 'double') => {
    if (externalQuotesValue === 'double') {
        data = data.replace(/"/g, `'`);
    } else {
        data = data.replace(/'/g, `"`);
    }

    data = data.replace(xmlPrologue, ``);
    data = data.replace(/>\s{1,}</g, `><`);
    data = data.replace(/\s{2,}/g, ` `);

    return data.replace(symbols, encodeURIComponent);
};

const svgToDataURI = (data, mimeType = 'image/svg+xml') => `data:${mimeType},${encodeSVG(data)}`;

module.exports = {
    entry: ['index', 'html/styles/style.css'],
    output: {
        clean: true,
        filename: 'js/[name].[contenthash:6].js',
    },
    resolve: {
        modules: [srcRoot, 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: srcRoot,
                use: [
                    'css-loader'
                ],
            },
            {
                test: /((?<!\.d)\.ts|\.tsx|\.js|\.jsx)$/,
                include: srcRoot,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                include: srcRoot,
                loader: 'source-map-loader',
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'monotron',
            template: 'src/html/index.ejs',
            faviconDataUrl: svgToDataURI(
                fs.readFileSync(path.resolve(__dirname, 'src/favicon.svg'), { encoding: 'utf-8' })
            ),
        }),
    ],
};
