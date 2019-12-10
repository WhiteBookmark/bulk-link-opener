module.exports = {
	transpileDependencies: ['vuetify'],
	pluginOptions: {
      webpackBundleAnalyzer: {
        openAnalyzer: false
      },
      apollo: {
        enableMocks: false,
        enableEngine: false
      }
    },
};
