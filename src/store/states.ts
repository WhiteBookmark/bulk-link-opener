import { defaultData } from '@/store/defaultData';

export default {
	user: {
		authenticated: false,
		session: null,
		data: null,
	},
	settings: {
		isThemeDark: true,
	},
	selected: {
		categories: [],
		collections: [],
		links: [],
	},
	data: {
		categories: [],
		collections: [],
		links: [],
		all: [],
		default: defaultData,
	},
};
