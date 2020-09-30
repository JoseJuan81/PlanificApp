import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.BASE_URL || 'localhost:8080',
  cache: new InMemoryCache(),
});
