/* eslint-disable */

'use strict';

var path = require('path'),
    webpack = require('webpack');

var is_server = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

var rootDir = path.resolve(__dirname),
    phaserModules = path.join(rootDir, 'node_modules', 'phaser-ce', 'build', 'custom'),
    source = path.join(rootDir, 'src'),
    content = path.join(
        rootDir, is_server
        ? 'static'
        : 'dist'),
    main = 'main.js',
    min = 'main.min.js',
    entry = path.join(source, main);

var pixi = path.join(phaserModules, 'pixi.js');
var phaser = path.join(phaserModules, 'phaser-minimum.js');

module.exports = {
    entry: entry,

    output: {
        path: content,
        filename: min
    },

    devtool: 'source-map',

    resolve: {
        alias: {
            pixi: pixi,
            phaser: phaser
        }
    },

    module: {
        rules: [
            // exposing pixi and correct phaser into global scope
            {
                test: pixi,
                use: {
                    loader: 'expose-loader',
                    options: 'PIXI'
                }
            }, {
                test: phaser,
                use: {
                    loader: 'expose-loader',
                    options: 'Phaser'
                }
            },
            // pass source through babel
            {
                test: /\.js$/,
                include: source,
                loader: 'babel-loader',
                // query: {
                //     presets: ['es2015']
                // }
            }
        ]
    },

    devServer: {
        contentBase: content,
        publicPath: '/'
    },

    plugins: [new webpack.LoaderOptionsPlugin({debug: true})]
};
