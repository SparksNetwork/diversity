"use strict";
var path = require("path");
var webpack = require("webpack");
var srcPath = path.resolve('./src');
var assetsPath = path.resolve('./assets');
var DEV = 'development';
if (!process.env.BUILD_ENV)
    process.env.BUILD_ENV = DEV;
var stringify = JSON.stringify;
var Sparks = {
    buildEnv: stringify(process.env.BUILD_ENV),
    firebase: {
        databaseURL: stringify(process.env.FIREBASE_DATABASE_URL),
        apiKey: stringify(process.env.FIREBASE_API_KEY),
        authDomain: stringify(process.env.FIREBASE_AUTH_DOMAIN),
        storageBucket: stringify(process.env.FIREBASE_STORAGE_BUCKET),
        messagingSenderId: stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    },
};
var basePlugins = [
    new webpack.DefinePlugin({ Sparks: Sparks }),
];
var prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({ compress: true }),
    new webpack.NoErrorsPlugin(),
];
var plugins = process.env.BUILD_ENV === DEV
    ? basePlugins
    : basePlugins.concat(prodPlugins);
var TSLoader = {
    test: /\.ts$/,
    loader: 'awesome-typescript-loader',
    exclude: /node_modules/,
};
var SASSLoader = {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
};
var ImageLoader = {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
    ],
};
var config = {
    plugins: plugins,
    devtool: process.env.BUILD_ENV === DEV ? 'source-map' : '',
    entry: [
        path.join(srcPath, 'app.ts'),
    ],
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/',
    },
    // required by debug module used with webpack-dev-server
    externals: ['fs', 'net'],
    devServer: {
        inline: true,
        host: '0.0.0.0',
        contentBase: path.resolve('./dist'),
        historyApiFallback: true,
    },
    module: {
        loaders: [
            TSLoader,
            SASSLoader,
            ImageLoader,
        ],
    },
    resolve: {
        // module and jsnext:main are for tree-shaking compatibility
        mainFields: ['module', 'jsnext:main', 'browser', 'main'],
        extensions: ['.ts', '.js', '.json'],
        alias: {
            assets: assetsPath,
        },
    },
};
module.exports = config;
