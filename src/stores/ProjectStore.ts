export type ProjectConfig = {
  authConfig: AuthConfig
}

export type AuthConfig = {
  clientId: string
  realm: string
  url: string
}

export const projectConfig: ProjectConfig = {
  authConfig: {
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    url: import.meta.env.VITE_KEYCLOAK_URL,
  },
}
