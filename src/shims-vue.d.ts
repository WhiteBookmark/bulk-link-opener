import Vue from 'vue';

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		metaInfo?: any;
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$globalEvent: any;
	}
}

declare module '*.vue' {
	export default Vue;
}

declare global {
	var store: any;
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
}
