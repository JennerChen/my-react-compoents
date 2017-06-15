const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: {
		app:['babel-polyfill','./src/index.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname,'static/js')
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
				// this assumes your vendor imports exist in the node_modules directory, 把所有node_modules下的文件一律加入类库包
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		})
	],
	module: {
		rules: [
			{
				test: [/.jsx?$/, /.js?$/],
				loader: 'babel-loader',
				exclude: '/node_modules',
				query: {
					presets: [
						["es2015", { "loose": true }],
						"stage-1",
						'react'
					],
					plugins: [
						"transform-es2015-modules-commonjs",
						"transform-decorators-legacy"
					]
				}
			}
		]
	},
	externals: {
		'cheerio': 'window',
		'react/addons': 'react',
		'react/lib/ExecutionEnvironment': 'react',
		'react/lib/ReactContext': 'react'
	}
};
