import { useKeycloak } from '@react-keycloak/web'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { Header } from '../components/header/Header.tsx'

const Container = styled.div`
  display: block;
  width: 100%;
  height: max-content;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

type LayoutProps = {
  children: ReactNode
}

export function Layout(props: LayoutProps) {
  const { keycloak } = useKeycloak()
  return (
    <Container>
      {keycloak.authenticated && <Header />}
      <Content>{props.children}</Content>
    </Container>
  )
}
