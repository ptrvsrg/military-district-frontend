export type ProjectConfig = {
  apolloServerConfig: ApolloServerConfig
  authConfig: AuthConfig
}

export type AuthConfig = {
  clientId: string
  realm: string
  url: string
}

export type ApolloServerConfig = {
  url: string
}

export const projectConfig: ProjectConfig = {
  apolloServerConfig: {
    url: import.meta.env.VITE_APOLLO_SERVER_URL,
  },
  authConfig: {
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    url: import.meta.env.VITE_KEYCLOAK_URL,
  },
}
