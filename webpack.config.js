const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: {
		all:['babel-polyfill','./src/index.js'],
		modal: ['babel-polyfill','./src/modal/modal.js'],
		fabric: ['babel-polyfill','./src/fabric/index.js'],
		motion: ['babel-polyfill','./src/motion/index.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname,'dist/js')
	},
	watch: true,
	devtool: "inline-source-map",
	plugins:[
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ["vendor","manifest"],
			minChunks: function (module) {
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		})
	],
	externals: {
		fabric: 'fabric',
		'cheerio': 'window',
		'react/addons': 'react',
		'react/lib/ExecutionEnvironment': 'react',
		'react/lib/ReactContext': 'react'
	},
	module: {
		rules: [
			{
				test: [/.jsx?$/, /.js?$/],
				loader: 'babel-loader',
				exclude: '/node_modules'
			}
		]
	}
};
