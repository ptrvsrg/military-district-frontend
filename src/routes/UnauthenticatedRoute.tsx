import { useKeycloak } from '@react-keycloak/web'
import { Navigate, Outlet } from 'react-router-dom'

export function UnauthenticatedRoute() {
  const { keycloak } = useKeycloak()
  return keycloak?.authenticated ? <Navigate replace to={'/'} /> : <Outlet />
}
