import Keycloak from 'keycloak-js'

import { projectConfig } from './ProjectStore.ts'

const keycloakConfig = {
  clientId: projectConfig.authConfig.clientId,
  realm: projectConfig.authConfig.realm,
  url: projectConfig.authConfig.url,
}
const keycloak = new Keycloak(keycloakConfig)

export function getPrivileges(): string[] {
  if (keycloak?.resourceAccess && keycloak.resourceAccess[projectConfig.authConfig.clientId]?.roles)
    return keycloak.resourceAccess[projectConfig.authConfig.clientId].roles
  return []
}

export default keycloak
