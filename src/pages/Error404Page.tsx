import { useKeycloak } from '@react-keycloak/web'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '../components/button/Button.tsx'
import { Header } from '../components/header/Header.tsx'
import { HeaderText, PlainText } from '../components/text/Text.tsx'
import { TextAlign } from '../components/text/Text.types.ts'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
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

export default function Error404Page() {
  const { t } = useTranslation()
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()

  const backToMain = () => navigate('/')

  return (
    <>
      <Container>
        {keycloak?.authenticated && <Header />}
        <Content>
          <HeaderText align={TextAlign.CENTER} size={48} text={t('error404Title')} />
          <PlainText align={TextAlign.CENTER} size={18} text={t('error404Info')} />
          <Button onClick={backToMain} size={22} text={t('backToMain')} />
        </Content>
      </Container>
    </>
  )
}
