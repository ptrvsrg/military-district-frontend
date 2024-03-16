import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import Error404Page from '../pages/Error404Page.tsx'
import LoaderPage from '../pages/LoaderPage.tsx'
import LoginPage from '../pages/LoginPage.tsx'
import MainPage from '../pages/MainPage.tsx'
import { getPrivileges } from '../stores/AuthStore.ts'

function arrayContains(array, subArray) {
  return subArray.every((element) => {
    return array.includes(element)
  })
}

interface PrivateRouteProps {
  privileges: string[]
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { keycloak } = useKeycloak()
  if (!keycloak?.authenticated) return <Navigate replace to={'/login'} />
  if (!arrayContains(getPrivileges(), props.privileges)) return <Navigate to={'/not-found'} />
  return <Outlet />
}

export function UnauthenticatedRoute() {
  const { keycloak } = useKeycloak()
  return keycloak?.authenticated ? <Navigate replace to={'/'} /> : <Outlet />
}

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (!initialized) return <LoaderPage />
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnauthenticatedRoute />}>
          <Route element={<LoginPage />} path={'/login'} />
        </Route>
        <Route element={<PrivateRoute privileges={[]} />}>
          <Route element={<MainPage />} path={'/'} />
        </Route>
        <Route element={<Error404Page />} path={'*'} />
      </Routes>
    </BrowserRouter>
  )
}
