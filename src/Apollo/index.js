import fetch from 'node-fetch';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

const isDev = process.env.NODE_ENV === 'development';

const devUri = process.env.VUE_APP_GRAPHQL_URL || 'http://localhost:9000/.netlify/functions/graphql';
const prodUri = '/.netlify/functions/graphql';
const uri = isDev ? devUri : prodUri;

const cache = new InMemoryCache();
const link = createHttpLink({
	fetch,
	uri,
});
const client = new ApolloClient({
	cache,
	link,
	name: 'planificApp-client',
	version: '1.0',
	queryDeduplication: false,
});

export default client;
