import { Button, Typography } from '@mui/material'
import { useKeycloak } from '@react-keycloak/web'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import logo from '../assets/icons/logo.png'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 50px 0;
  box-sizing: border-box;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  height: 100%;
  gap: 30px;
  box-sizing: border-box;
`

const Img = styled.img`
  height: 30vh;
`

export function LoginPage() {
  const { t } = useTranslation()
  const { keycloak } = useKeycloak()

  return (
    <>
      <Container>
        <Content>
          <Typography align={'center'} color={'white'} variant={'h4'}>
            {t('appTitle')}
          </Typography>
          <Img src={logo} />
          <Typography align={'center'} color={'white'} variant={'body1'}>
            {t('accessIsLimited')}
          </Typography>
          <Button onClick={() => keycloak.login()} variant="contained">
            {t('doLogin')}
          </Button>
        </Content>
      </Container>
    </>
  )
}
