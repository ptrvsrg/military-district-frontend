import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '../Header.tsx'
import { HeaderProps } from '../Header.types.ts'

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

const Template = (props: HeaderProps) => {
  return (
    <>
      <Header {...props} />
    </>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  selectedTab: undefined,
}
