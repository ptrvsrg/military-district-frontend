import { useKeycloak } from '@react-keycloak/web'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import logo from '../assets/logo.png'
import { Button } from '../components/button/Button.tsx'
import { HeaderText, PlainText } from '../components/text/Text.tsx'
import { TextAlign } from '../components/text/Text.types.ts'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 50px 0;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 40%;
  height: 100%;
  gap: 30px;
  box-sizing: border-box;
`

const Img = styled.img`
  height: 40vh;
`

export default function LoginPage() {
  const { t } = useTranslation()
  const { keycloak } = useKeycloak()

  return (
    <>
      <Container>
        <Content>
          <HeaderText align={TextAlign.CENTER} size={36} text={t('appTitle')} />
          <Img src={logo} />
          <PlainText align={TextAlign.CENTER} size={24} text={t('accessIsLimited')} />
          <Button onClick={() => keycloak.login()} size={24} text={t('doLogin')} />
        </Content>
      </Container>
    </>
  )
}
