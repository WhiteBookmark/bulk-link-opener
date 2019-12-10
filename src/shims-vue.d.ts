declare module '*.vue' {
	import Vue from 'vue';
	module 'vue/types/options' {
		interface ComponentOptions<V extends Vue> {
			metaInfo?: any;
		}
	}

	export default Vue;
}

declare var store: any;
interface Window {
	store: any;
}
