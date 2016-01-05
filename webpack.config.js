var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var merge = require('webpack-merge');
var webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      {
        // Test expects a RegExp!  Note the slashes!
        test: /\.css$/,
        loaders: [ 'style', 'css' ],
        // Include accepts either a path or an array of paths
        include: PATHS.app
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }, 
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ]
  },
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'node_modules/html-webpack-template/index.html',
      title: 'Kanban app',
      appMountId: 'app'
    })
  ]//,
//  postcss: function plugins(bundler) {
//    return [
//      require('postcss-import')({ addDependencyTo: bundler }),
//      require('precss')(),
//      require('postcss-url')({
//        copy: 'rebase',
//      }),
//      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
//    ];
//  }
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output
      stats: 'errors-only',

      // Parse host and port from the env so this is easy to customize
      host: process.env.HOST,
      port: process.env.PORT
    }, 
    plugins: [
      new webpack.HotModuleReplacementPlugin()
   ] 
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
