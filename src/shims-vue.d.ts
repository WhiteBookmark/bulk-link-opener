import Vue from 'vue';
import { DollarApollo } from 'vue-apollo/types/vue-apollo';

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		metaInfo?: any;
	}
}

declare module 'vue/types/vue' {
	interface Vue {
		$globalEvent: any;
		$apollo: DollarApollo<this>;
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

	interface User {
		authenticated: boolean;
		session: string | null;
		data: string | null;
	}

	interface Settings {
		isThemeDark: boolean;
	}
	interface Selected {
		categories: string[];
		collections: string[];
		links: string[];
	}

	interface Category {
		id: string;
		name: string;
	}
	interface Collection {
		id: string;
		name: string;
		categoryId: {
			id: string;
		};
	}
	interface Link {
		id: string;
		name: string;
		uRL: string;
		collectionId: {
			id: string;
		};
	}

	interface AllData {
		categoriesList: {
			items: [
				{
					id: string;
					name: string;
					category_Collection: {
						items: [
							{
								id: string;
								name: string;
								collection_Link: {
									items: [
										{
											id: string;
											name: string;
											uRL: string;
										},
									];
								};
							},
						];
					};
				},
			];
		};
	}
}
