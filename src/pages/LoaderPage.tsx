import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'

import { Color } from '../styles/ts/colors.ts'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export default function LoaderPage() {
  return (
    <Container>
      <BeatLoader color={Color.WHITE} size={20} />
    </Container>
  )
}
