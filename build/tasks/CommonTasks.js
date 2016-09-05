var cssnext = require('cssnext'),
	postcssNested = require('postcss-nested'),
	postcssMixins = require('postcss-mixins'),
	postcssSimpleVars = require('postcss-simple-vars');

var CommonTasks = {
	getPostCss: function () {
		return [
			cssnext({url: false}),
			postcssSimpleVars,
			postcssMixins,
			postcssNested
		];
	}
};

module.exports = CommonTasks;