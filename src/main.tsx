import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import i18n from './i18n.ts'
import { AppRouter } from './routes/AppRouter.tsx'
import keycloak from './stores/AuthStore.ts'
import apolloClient from './stores/GraphQlStore.ts'
import './styles/css/index.css'
import { theme } from './styles/ts/colors.ts'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AppRouter />
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </I18nextProvider>
    </ApolloProvider>
  </ReactKeycloakProvider>
)
