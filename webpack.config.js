/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var is_server = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

var root_dir = path.resolve(__dirname);
var phaser_modules = path.join(
    root_dir,
    'node_modules',
    'phaser-ce',
    'build',
    'custom',
);

var paths = {
    static: path.join(root_dir, 'static'),
    source: path.join(root_dir, 'src'),
    content: path.join(root_dir, 'dist'), // is_server ? 'static' : 'dist');
    pixi: path.join(phaser_modules, 'pixi.js'),
    phaser: path.join(phaser_modules, 'phaser-arcade-physics.js'),
};

var entry = {
    'test-1': path.join(paths.source, 'test-1', 'main.js'),
    'test-2': path.join(paths.source, 'test-2.js'),
};

module.exports = {
    entry,

    output: {
        path: paths.content,
        filename: '[name].min.js',
        sourceMapFilename: '[name].js.map',
    },

    devtool: 'source-map',

    resolve: {
        alias: {
            pixi: paths.pixi,
            phaser: paths.phaser,
        },
    },

    module: {
        rules: [
            // exposing pixi and correct phaser into global scope
            {
                test: paths.pixi,
                use: {
                    loader: 'expose-loader',
                    options: 'PIXI',
                },
            },
            {
                test: paths.phaser,
                use: {
                    loader: 'expose-loader',
                    options: 'Phaser',
                },
            },
            // pass source through babel
            {
                test: /\.js$/,
                include: path.join(paths.source),
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                },
            },
        ],
    },

    devServer: {
        contentBase: paths.content,
        publicPath: '/',
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new webpack.optimize.CommonsChunkPlugin('common'),
        new CopyWebpackPlugin([
            {
                from: path.join(paths.static),
                to: path.join(paths.content),
            },
        ]),
    ].concat(
        Object.keys(entry).map(function(name) {
            return new HtmlWebpackPlugin({
                chunks: ['common', name],
                template: path.resolve(paths.source, 'index.html'),
                filename: name + '.html',
            });
        }),
    ),
};
