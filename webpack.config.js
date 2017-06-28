/**
 * Created by qi on 2016/12/8.
 */

module.exports = {
    entry: "./src/app.js",
    output: {
        //publicPath: '/static/',        // Where bundles (build results) are served
        path: '/',                       // (not path, just prefix for requests)
        //filename: '[name].js',
        //chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: '/node_modules/',query:{presets: ["stage-3","es2015"]}},
            {test: /\.(njk|nunjucks)$/, loader: 'nunjucks-loader'},
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    babel: {
        compact: false
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};