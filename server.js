var express = require("express");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var webpackDevMiddleware = require("webpack-dev-middleware");
var path = require("path");
var bodyParser = require("body-parser");

var techVisit = require("./dist/server/techVisit");

var app = express();
app.use(bodyParser.json());

var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	stats: {colors: true}
}));
app.use(require("webpack-hot-middleware")(compiler));


app.use("/techvisit", techVisit);


app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(3000, function () {
	console.log('Server started at port 3000');
});


