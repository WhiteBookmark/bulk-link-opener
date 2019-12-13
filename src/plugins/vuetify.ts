import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				background: colors.shades.white,
				primary: colors.pink.base,
				secondary: colors.pink.base,
				accent: colors.pink.accent4,
				error: colors.red.base,
				info: colors.lightBlue.base,
				success: colors.green.base,
				warning: colors.orange.base,
			},
			dark: {
				background: colors.deepPurple.base,
				primary: colors.shades.white,
				secondary: colors.deepPurple.base,
				accent: colors.pink.accent4,
				error: colors.red.base,
				info: colors.lightBlue.base,
				success: colors.green.base,
				warning: colors.orange.base,
			},
		},
	},
});
