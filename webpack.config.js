/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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

var entries = [
    {
        name: 'test-1',
        path: path.join(paths.source, 'test-1', 'main.js'),
        commons: ['phaser_and_pixi'],
    },
    {
        name: 'test-2',
        path: path.join(paths.source, 'test-2.js'),
        commons: ['phaser_and_pixi', 'tilemap_plus'],
    },
    {
        name: 'test-3',
        path: path.join(paths.source, 'test-3.js'),
        commons: ['phaser_and_pixi', 'tilemap_plus', 'rot_js'],
    },
    {
        name: 'test-4',
        path: path.join(paths.source, 'test-4.js'),
        commons: ['rot_js'],
    },
    },
];

// NOTE: `entry` is an Object of { 'test-1': "test-1.js", 'test-2': "test-2.js" }
var entry = entries.reduce((obj, e) => {
    obj[e.name] = e.path;
    return obj;
}, {});

// NOTE: gathers each unique common and pushes each entry that needs it onto it:
var commons = {};
entries.forEach(function(e) {
    e.commons.forEach(function(common) {
        commons[common] = commons[common] || [];
        commons[common].push(e.name);
    });
});

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
        new CopyWebpackPlugin([
            {
                from: path.join(paths.static),
                to: path.join(paths.content),
            },
        ]),
    ].concat(
        Object.keys(commons).map(function(common) {
            return new webpack.optimize.CommonsChunkPlugin({
                name: common,
                chunks: ['common'].concat(commons[common]),
            });
        }),
        entries.map(function(e) {
            return new HtmlWebpackPlugin({
                chunks: [e.name].concat(e.commons),
                template: path.resolve(paths.source, 'index.html'),
                filename: e.name + '.html',
            });
        }),
    ),
};
