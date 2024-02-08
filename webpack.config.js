const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

	plugins: [
	new HtmlWebpackPlugin({
		template: 'src/index.html'
    })
  ],
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: ["sass-loader"],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		],
	},
};
