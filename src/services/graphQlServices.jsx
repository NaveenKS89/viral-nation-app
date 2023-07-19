import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
const API = require('./config').graphql_api_server;

const Service = {
	query: async (query, variables) => {
		const httpLink = new HttpLink({
			uri: API,
		});

		const authLink = new ApolloLink((operation, forward) => {
			// Retrieve the authorization token from local storage.
			const token = localStorage.getItem('usertoken');

			// Use the setContext method to set the HTTP headers.
			operation.setContext({
				headers: {
					authorization: token ? `${token}` : '',
				},
			});

			// Call the next link in the middleware chain.
			return forward(operation);
		});

		const apolloClient = new ApolloClient({
			cache: new InMemoryCache(),
			link: authLink.concat(httpLink),
		});

		return await apolloClient.query({
			query,
			variables,
		});
	},
	mutation: async (mutation, variables) => {
		const httpLink = new HttpLink({
			uri: API,
		});
		const authLink = new ApolloLink((operation, forward) => {
			// Retrieve the authorization token from local storage.
			const token = localStorage.getItem('usertoken');

			// Use the setContext method to set the HTTP headers.
			operation.setContext({
				headers: {
					authorization: token ? `${token}` : '',
				},
			});

			// Call the next link in the middleware chain.
			return forward(operation);
		});

		const apolloClient = new ApolloClient({
			cache: new InMemoryCache(),
			link: authLink.concat(httpLink),
		});

		return await apolloClient.mutate({
			mutation,
			variables,
		});
	},
};

export default Service;
