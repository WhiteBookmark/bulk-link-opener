module.exports = {
	transpileDependencies: ['vuetify'],
	chainWebpack: (config) => {
		config.module
			.rule('mp3')
			.test('/.mp3$/')
			.use('url-loader')
			.loader('url-loader');

		config.module
			.rule('graphql')
			.test(/\.(graphql|gql)$/)
			.use('graphql-tag/loader')
			.loader('graphql-tag/loader')
			.end();
	},
};
