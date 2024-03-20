import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '../../../components/header/Header.tsx'

export default {
  component: Header,
  decorators: [
    (Story) => (
      <ReactKeycloakProvider authClient={new Keycloak()}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </ReactKeycloakProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Header',
}

const Template = () => {
  return <Header />
}

export const Default = Template.bind({})
