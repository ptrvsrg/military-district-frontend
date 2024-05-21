import { useKeycloak } from '@react-keycloak/web'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { Error404Page } from '../pages/Error404Page.tsx'
import { getPrivileges } from '../stores/AuthStore.ts'
import { RouteWithTitle } from './RouteWithTitle.tsx'

function arrayContains(array, subArray) {
  return subArray.every((element) => {
    return array.includes(element)
  })
}

export function PrivateRoute({ privileges }: { privileges: string[] }) {
  const { t } = useTranslation()
  const { keycloak } = useKeycloak()

  if (!keycloak?.authenticated) return <Navigate replace to={'/login'} />
  if (!arrayContains(getPrivileges(), privileges))
    return (
      <Routes>
        <Route
          element={
            <RouteWithTitle title={t('error404Title')}>
              <Error404Page />
            </RouteWithTitle>
          }
          path={'*'}
        />
      </Routes>
    )
  return <Outlet />
}
