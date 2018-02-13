import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

export default [
    {
        input: 'js/script.js',
        output: {
            file: 'build/bundle.js',
            format: 'iife',
        },
        plugins: [
            babel({ exclude: 'node_modules/**' }),
            resolve(),
            commonjs({
                include: 'node_modules/**',
                sourceMap: false,
                namedExports: {
                    'node_modules/react-dom/index.js': [ 'ReactDOM' ],
                    'node_modules/react/index.js': [ 'Component', 'Fragment', 'createElement' ]
                }
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify( 'production' )
            })
        ],
    },
];
