import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: colors.shades.white,
				secondary: colors.pink.base,
				accent: colors.pink.accent4,
				error: colors.red.base,
				info: colors.lightBlue.base,
				success: colors.green.base,
				warning: colors.orange.base,
			},
			dark: {
				primary: colors.deepPurple.base,
				secondary: colors.shades.white,
				accent: '#82B1FF',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
			},
		},
	},
});
