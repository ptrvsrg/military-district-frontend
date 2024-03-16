import { ReactKeycloakProvider } from '@react-keycloak/web'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import i18n from './i18n.ts'
import { AppRouter } from './routes/AppRouter.tsx'
import keycloak from './stores/AuthStore.ts'
import './styles/css/index.css'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <I18nextProvider i18n={i18n}>
      <AppRouter />
    </I18nextProvider>
  </ReactKeycloakProvider>
)
