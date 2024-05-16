import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { createFragmentRegistry } from '@apollo/client/cache'

import { MilitaryBriefFragment, UnitPlacementFragment } from '../models/graphql/fragments.ts'
import { projectConfig } from './ProjectStore.ts'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(gql`
      ${UnitPlacementFragment}
      ${MilitaryBriefFragment}
    `),
  }),
  defaultOptions: {
    mutate: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
  uri: projectConfig.microserviceConfig.msRouterUrl,
})

export default apolloClient
