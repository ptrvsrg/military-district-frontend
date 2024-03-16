import Keycloak from 'keycloak-js'

import { projectConfig } from './ProjectStore.ts'

const keycloakConfig = {
  clientId: projectConfig.authConfig.clientId,
  realm: projectConfig.authConfig.realm,
  url: projectConfig.authConfig.url,
}
const keycloak = new Keycloak(keycloakConfig)

export function getPrivileges(): string[] {
  return keycloak.resourceAccess ? keycloak.resourceAccess[projectConfig.authConfig.clientId].roles : []
}
export default keycloak
