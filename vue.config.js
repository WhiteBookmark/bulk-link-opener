module.exports = {
	transpileDependencies: ['vuetify'],
	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false,
		},
	},
	chainWebpack: (config) => {
		config.module
			.rule('mp3')
			.test('/.mp3$/')
			.use('url-loader')
			.loader('url-loader');
	},
};
