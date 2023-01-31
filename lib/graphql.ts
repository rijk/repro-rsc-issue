import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.DATA_ACCESS_GRAPHQL,
  headers: {
    apiKey: `${process.env.DATA_ACCESS_API_KEY}`,
  },
  cache: new InMemoryCache(),
})

export const getClient = (token: string) =>
  new ApolloClient({
    uri: process.env.DATA_ACCESS_GRAPHQL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: new InMemoryCache(),
  })
