import { useKeycloak } from '@react-keycloak/web'
import { BrowserRouter, Navigate, Outlet, Routes } from 'react-router-dom'

import LoaderPage from '../pages/LoaderPage.tsx'
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
  console.log(keycloak?.authenticated)
  return keycloak?.authenticated && arrayContains(getPrivileges(), props.privileges) ? <Outlet /> : <Navigate replace to={'/login'} />
}

export function UnauthenticatedRoute() {
  const { keycloak } = useKeycloak()
  console.log(keycloak?.authenticated)
  return keycloak?.authenticated ? <Navigate replace to={'/'} /> : <Outlet />
}

export const AppRouter = () => {
  const { initialized } = useKeycloak()

  if (initialized) return <LoaderPage />
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<UnauthenticatedRoute />}> */}
        {/*  <Route element={<LoginPage />} path={'/login'} /> */}
        {/* </Route> */}
        {/* <Route element={<PrivateRoute privileges={[]} />}> */}
        {/*  <Route element={<MainPage />} path={'/'} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}
