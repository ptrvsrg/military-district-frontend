import { useKeycloak } from '@react-keycloak/web'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Error404Page } from '../pages/Error404Page.tsx'
import { LoaderPage } from '../pages/LoaderPage.tsx'
import { PrivateRoute } from './PrivateRoute.tsx'
import { RouteWithTitle } from './RouteWithTitle.tsx'
import { UnauthenticatedRoute } from './UnauthenticatedRoute.tsx'
import { usePrivateRoutes, useUnauthenticatedRoutes } from './routes.tsx'

export const AppRouter = () => {
  const { t } = useTranslation()
  const { initialized } = useKeycloak()
  const privateRoutes = usePrivateRoutes(t)
  const unauthenticatedRoutes = useUnauthenticatedRoutes(t)

  if (!initialized) return <LoaderPage />

  return (
    <BrowserRouter>
      <Routes>
        {privateRoutes.map((route, index) => (
          <Route element={<PrivateRoute key={`p${index}`} privileges={route.privileges} />}>
            <Route element={<RouteWithTitle title={route.title}>{route.page}</RouteWithTitle>} path={route.path} />
          </Route>
        ))}
        <Route element={<UnauthenticatedRoute />}>
          {unauthenticatedRoutes.map((route) => (
            <Route element={<RouteWithTitle title={route.title}>{route.page}</RouteWithTitle>} path={route.path} />
          ))}
        </Route>
        <Route
          element={
            <RouteWithTitle title={t('error404Title')}>
              <Error404Page />
            </RouteWithTitle>
          }
          path={'*'}
        />
      </Routes>
    </BrowserRouter>
  )
}
