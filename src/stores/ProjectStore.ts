export type ProjectConfig = {
  authConfig: AuthConfig
  microserviceConfig: MicroserviceConfig
  mode: string
}

export type AuthConfig = {
  clientId: string
  realm: string
  url: string
}

export type MicroserviceConfig = {
  msReportUrl: string
  msRouterUrl: string
}

export const projectConfig: ProjectConfig = {
  authConfig: {
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    url: import.meta.env.VITE_KEYCLOAK_URL,
  },
  microserviceConfig: {
    msReportUrl: `${import.meta.env.VITE_API_GATEWAY_URL}/api/v0/reports`,
    msRouterUrl: `${import.meta.env.VITE_API_GATEWAY_URL}/api/v0/router/graphql`,
  },
  mode: import.meta.env.MODE,
}
