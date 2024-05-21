import { Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Layout } from './Layout.tsx'

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  height: calc(100vh - 90px);
  gap: 30px;
  box-sizing: border-box;
`

export function Error404Page() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const backToMain = () => navigate('/')

  return (
    <>
      <Layout>
        <Content>
          <Typography align={'center'} color={'white'} variant={'h4'}>
            {t('error404Title')}
          </Typography>
          <Typography align={'center'} color={'white'} variant={'body1'}>
            {t('error404Info')}
          </Typography>
          <Button onClick={backToMain} variant="contained">
            {t('backToMain')}
          </Button>
        </Content>
      </Layout>
    </>
  )
}
