const path = require('path');

module.exports = {
    entry: 'script',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: ['node_modules', 'js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'js'),
                use: 'babel-loader',
            },
        ]
    },
};
