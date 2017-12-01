/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

var is_server = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

var root_dir = path.resolve(__dirname);

var source = path.join(root_dir, 'src');
var content = path.join(root_dir, is_server ? 'static' : 'dist');
var phaser_modules = path.join(
    root_dir,
    'node_modules',
    'phaser-ce',
    'build',
    'custom',
);

var main = 'main.js';
var min = 'main.min.js';
var entry = path.join(source, main);

var pixi = path.join(phaser_modules, 'pixi.js');
var phaser = path.join(phaser_modules, 'phaser-minimum.js');

module.exports = {
    entry,

    output: {
        path: content,
        filename: min,
    },

    devtool: 'source-map',

    resolve: {
        alias: {
            pixi: pixi,
            phaser: phaser,
        },
    },

    module: {
        rules: [
            // exposing pixi and correct phaser into global scope
            {
                test: pixi,
                use: {
                    loader: 'expose-loader',
                    options: 'PIXI',
                },
            },
            {
                test: phaser,
                use: {
                    loader: 'expose-loader',
                    options: 'Phaser',
                },
            },
            // pass source through babel
            {
                test: /\.js$/,
                include: source,
                loader: 'babel-loader',
                // query: {
                //     presets: ['es2015']
                // }
            },
        ],
    },

    devServer: {
        contentBase: content,
        publicPath: '/',
    },

    plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
};
