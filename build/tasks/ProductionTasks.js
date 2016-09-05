var extract = require('extract-text-webpack-plugin'),
	webpack = require('webpack'),
	path = require('path');

var ProductionTasks = {
	getLoaders: function () {
		var loaders = [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel?cacheDirectory'
			},
			{
				test: /\.js?$/,
				include: /node_modules\/fk-cs-shared/,
				loader: 'babel?cacheDirectory'
			},
			{
				test: /\.css?$/,

				loader: extract.extract('css-loader?minimize&module!postcss')
			},
			{
				test: /\.(otf|eot|ttf|woff|svg|png)\??/,
				include: /node_modules/,
				loader: 'url-loader?limit=8192'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file"
			},
			{
				test: /\.(woff|woff2)$/,
				loader: "url?prefix=font/&limit=5000"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream"
			},
			{
				test: /\.png|\.jpg|\.jpeg|\.gif|\.svg/,
				exclude: /node_modules/,
				loader: 'image-size?name=[name]-[hash:8].[ext]'
			}
		];
		return loaders;
	},
	getPlugins: function () {
		var plugins = [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new extract("grid-design.css", {allChunks: true}),
			new webpack.NoErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				minimize: true,
				comments: false,
				sourceMap: false,
				mangle:true,
				compress: {
					sequences: true,
					properties: true,
					dead_code: true,
					drop_debugger: true,
					unsafe: false,
					conditionals: true,
					comparisons: true,
					evaluate: true,
					booleans: true,
					loops: true,
					unused: true,
					hoist_funs: true,
					hoist_vars: false,
					if_return: true,
					join_vars: true,
					cascade: true,
					side_effects: true,
					warnings: true
				}
			})
		];
		return plugins;
	},
	getEntry: function () {
		var entry = path.join(__dirname, "../../app.js");
		return [
			entry
		];
	},
	getOutput: function () {
		return {
			path: path.join(__dirname, "../../dist"),
			publicPath: '/',
			filename: 'react-grid.js',
			pathInfo: true,
			libraryTarget: 'umd',
			library: 'reactGrid'
		};
	},
	getDevTool: function () {
		return "";
	}
};

module.exports = ProductionTasks;