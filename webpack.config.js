const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
	  src: path.join(__dirname, 'src')
};

module.exports = {
  mode: 'development',
  entry: {
	main: './src/index.js',
	app: './src/app/app.js'
  },
  output: {
	filename: '[name].[contenthash:8].js',
	path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
	runtimeChunk: 'single',
	splitChunks: {
	  chunks: 'all',
	  maxInitialRequests: Infinity,
	  minSize: 0,
	  cacheGroups: {
		  styles: {
				name: 'styles',
				test: /\.css$/,
				chunks: 'all',
				enforce: true
			  },
		vendor: {
		  test: /[\\/]node_modules[\\/]/,
		  name(module) {
			const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
			return `npm.${packageName.replace('@', '')}`;
		  },
		},
	  },
	},
  },
  plugins: [
	new HtmlWebpackPlugin({
		template: './src/app/index.html',
	}),
	new MiniCssExtractPlugin({
	  filename: 'style.[contenthash:8].css',
	  chunkFilename: 'style.[contenthash:8].css',
	}),
	new PurgecssPlugin({
		  paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
		  safelist: {
			  greedy: [/md/]
		}
	}),
	new CleanWebpackPlugin(),
	new webpack.ProvidePlugin({
	  jQuery: 'jquery',
	  $: 'jquery',
	  jquery: 'jquery',
	  "window.jQuery": "jquery"
	}),
	new CopyPlugin({
	  patterns: [
		{
		  from: '**',
		  to: 'assets/img/',
		  context: './src/assets/img/'
		}
	  ],
	}),
  ],
  module: {
	rules: [
		{
			test: /\.js$/,
			enforce: "pre",
			use: ["source-map-loader"],
		  },
		{
		  test: /\.html$/,
		  exclude: /index\.html$/,
		  use: [
			  {
				  loader: 'file-loader',
				  options: {
					  name: 'template.[contenthash:8].html',
					  outputPath: 'templates/'
				  }
			  },
			  'extract-loader',
			  {
			  loader: 'html-loader',
			  options: {
				  attributes: false
			  }
			 
				}
		  ],
		},
		{
			  test: /\.(scss)$/,
			  use: [{
				// inject CSS to page
				loader: 'style-loader'
			  }, {
				// translates CSS into CommonJS modules
				loader: 'css-loader'
			  }, {
				// Run postcss actions
				loader: 'postcss-loader',
				options: {
				  // `postcssOptions` is needed for postcss 8.x;
				  // if you use postcss 7.x skip the key
				  postcssOptions: {
					// postcss plugins, can be exported to postcss.config.js
					plugins: [require('autoprefixer')]
					}
				  }
			  }, {
				// compiles Sass to CSS
				loader: 'sass-loader'
			  }]
			},
		{
		test: /\.css$/,
		use: [ 'style-loader', 'css-loader' ]
	  },
	  {
		test: /\.(png|jpg|gif)$/i,
		use: [{
		  loader: 'url-loader',
		  options: {
			outputPath: 'assets/img/',
			limit: 8192,
		  },
		}, ],
	  },
	  {
		test: /\.svg$/i,
		use: [{
		  loader: 'svg-url-loader',
		  options: {
			outputPath: 'assets/img/',
			limit: 10000,
		  },
		}, ],
	  },
	  {
		test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
		use: [{
		  loader: 'file-loader',
		  options: {
			name: '[name].[ext]',
			outputPath: 'assets/fonts/'
		  }
		}]
	  }
	],
  },
};