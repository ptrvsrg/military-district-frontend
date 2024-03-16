import { ApolloClient, InMemoryCache } from '@apollo/client'

import { projectConfig } from './ProjectStore.ts'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: projectConfig.apolloServerConfig.url,
})

export default apolloClient
