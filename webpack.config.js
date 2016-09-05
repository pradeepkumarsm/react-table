'use strict';

var tasks, outputDir = "public",
	commonTasks = require("./build/tasks/CommonTasks");

if(process.env.NODE_ENV === "production") {
	tasks = require("./build/tasks/ProductionTasks");
} else {
	tasks = require("./build/tasks/DevelopmentTasks");
}


module.exports = {
	target: 'web',
	cache: true,
	entry: tasks.getEntry(),
	resolve: {
		extensions: ['', '.js']
	},
	output: tasks.getOutput(),
	module: {
		loaders: tasks.getLoaders()
	},
	plugins: tasks.getPlugins(),
	postcss : commonTasks.getPostCss(),
	port: 3000,
	devtool: tasks.getDevTool(),
	devServer: {
		contentBase: './' + outputDir,
		historyApiFallback: true,
		port: 3000,
		hot: true,
		inline: true
	}
};


