const path = require('node:path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const pkgJson = require('./package.json');
const dependencies = pkgJson.dependencies;

const port = process.env.PORT || 9696;

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, { mode }) => {
	const isProd = mode === 'production';

	return {
		mode,
		entry: path.resolve(__dirname, 'src/bootstrap.ts'),
		output: {
			publicPath: 'auto',
			filename: isProd
				? 'static/js/[name].[contenthash].js'
				: 'static/js/[name].js',
			chunkFilename: isProd
				? 'static/js/[name].[contenthash].js'
				: 'static/js/[name].chunk.js',
			assetModuleFilename: isProd
				? 'static/media/[name][hash:8][ext]'
				: 'static/media/[name][ext]',
			path: path.resolve(__dirname, 'build'),
			clean: true,
		},

		resolve: {
			extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
		},

		target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',

		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								importLoaders: 1,
								modules: {
									auto: true,
									localIdentName: isProd
										? '[hash:base64]'
										: '[path][name]__[local]',
								},
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
				{
					test: /\.ts$/,
					use: {
						loader: 'esbuild-loader',
						options: {
							loader: 'ts',
							target: 'es2020',
						},
					},
				},
				{
					test: /\.tsx$/,
					use: {
						loader: 'esbuild-loader',
						options: {
							loader: 'tsx',
							target: 'es2020',
						},
					},
				},
				{
					test: /\.js$/,
					use: {
						loader: 'esbuild-loader',
						options: {
							loader: 'js',
							target: 'es2020',
						},
					},
				},
				{
					test: /\.jsx$/,
					use: {
						loader: 'esbuild-loader',
						options: {
							loader: 'jsx',
							target: 'es2020',
						},
					},
				},
				{
					// The general 'asset' type will choose to 'inline' or 'resource' depends on file size.
					// see https://webpack.js.org/guides/asset-modules/#general-asset-type
					test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
					type: 'asset',
					parser: {
						dataUrlCondition: {
							maxSize: 10000,
						},
					},
				},
			],
		},

		devtool: isProd ? 'source-map' : 'cheap-module-source-map',

		plugins: [
			new ModuleFederationPlugin({
				name: 'ui',
				filename: 'remoteEntry.js',
				exposes: {
					'.': './src/exposes',
				},
				remotes: {},
				shared: {
					...dependencies,
					react: {
						singleton: true,
						requiredVersion: '*',
						version: '0',
					},
					'react-dom': {
						singleton: true,
						requiredVersion: '*',
						version: '0',
					},
				},
			}),
			new HtmlWebPackPlugin({
				template: './index.html',
			}),
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].[contenthash].css',
				chunkFilename: 'static/css/[name].[contenthash].css',
			}),
		],

		optimization: {
			minimize: isProd,
			minimizer: [
				'...', // keep existing minimizer
				new CssMinimizerPlugin(),
			],
		},

		devServer: {
			port: port,
			historyApiFallback: true,
			hot: false,
		},
	};
};
