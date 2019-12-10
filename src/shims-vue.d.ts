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

interface navigations {
	name: string;
	to: string;
	requiresAuth: boolean;
}

interface GraphQLErrorHandler {
	TokenExpiredError(): void;
	InvalidTokenError(message: string): void;
	default(message: string, locations: string, path: string): void;
}
