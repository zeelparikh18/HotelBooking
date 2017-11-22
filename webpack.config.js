var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var SRC_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
    'entry': SRC_DIR + '/index.js',
    'output': {
        'path': BUILD_DIR,
        'filename': 'bundle.js'
    },
    'module': {
        'loaders': [
            {
                'test': /\.js?/,
                'include': SRC_DIR,
                'loader': 'babel-loader',
                'query': {
                    'presets': ['react', 'es2015', 'stage-2']
                }
            },
            {
                'test': /\.(scss|css)$/,
                'loader': 'style-loader!css-loader!sass-loader'
            },
        ]
    }
};

module.exports = config;