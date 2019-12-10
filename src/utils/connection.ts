import { Component, Vue } from 'vue-property-decorator';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

const httpLink = createHttpLink({ uri: process.env.VUE_APP_WORKSPACE_ENDPOINT });
const cache: InMemoryCache = new InMemoryCache();
const errorHandlers: GraphQLErrorHandler = {
	TokenExpiredError: () => store.dispatch('logout'),
	InvalidTokenError: (message: string) => console.log(`[Token error]: Message: ${message}`),
	default: (message: string, locations: string, path: string) => {
		console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
	},
};
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		// Do something about this, ignoring linintg error is not a good idea
		// @ts-ignore
		graphQLErrors.map((args: any) => (this.errorHandlers[args.code] || this.errorHandlers.default)(args));
	}

	if (networkError) {
		console.log(`[Network error]: ${networkError}`);
	}
});
const authLink = setContext((_, { headers }) => ({
	headers: {
		authorization: `Bearer ${window.store.get('user@session')}`,
		...headers,
	},
}));
const apolloClient = new ApolloClient({
	link: errorLink.concat(authLink.concat(httpLink)),
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

export default apolloClient;
