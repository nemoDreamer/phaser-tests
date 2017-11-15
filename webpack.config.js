'use strict';

var path    = require('path'),
    webpack = require('webpack');

var is_server = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

var source  = path.join(__dirname, 'src'),
    content = path.join(__dirname, is_server ? 'static' : 'dist'),
    main    = 'main.js',
    min     = 'main.min.js',
    entry   = path.join(source, main);

module.exports = {
    entry: entry,

    output: {
        path:       content,
        filename:   min
    },

    debug:   true,
    devtool: 'source-map',

    module: {
        loaders: [
            {
                test:    /\.js$/,
                include: source,
                loader:  'babel-loader',
                query:   {
                    presets: ['es2015']
                }
            }
        ]
    },

    devServer: {
        contentBase: content,
        publicPath: '/',
    }
}
