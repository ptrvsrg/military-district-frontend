import styled from 'styled-components'

import { Spinner } from '../components/spinner/Spinner.tsx'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export function LoaderPage() {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}
