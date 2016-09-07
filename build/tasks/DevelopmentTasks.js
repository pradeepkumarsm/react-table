var extract = require('extract-text-webpack-plugin'),
	webpack = require('webpack'),
	path = require('path');

var DevelopmentTasks = {
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
				exclude: /(node_modules|\.raw.css?)/,
				loader: extract.extract('css?modules&localIdentName=[path][name]_[local]!postcss')
			},
			{
				test: /\.raw.css$/,
				loader: "style-loader!css-loader!postcss-loader"
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
				loader: 'image-size'
			}
		];
		return loaders;
	},
	getPlugins: function () {
		var plugins = [
			new extract("bundle.css", {allChunks: true}),
			new webpack.NoErrorsPlugin(),
			new webpack.HotModuleReplacementPlugin()
		];
		return plugins;
	},
	getEntry: function () {
		return [
			'webpack-hot-middleware/client?http://localhost:3000/',
			'./app.js'
		];
	},
	getOutput: function () {
		return {
			path: path.join(__dirname, "../../public"),
			publicPath: '/',
			filename: 'bundle.js',
			pathInfo: true
		};
	},
	getDevTool: function () {
		return "eval";
	}
};

module.exports = DevelopmentTasks;