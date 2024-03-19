import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'

export const InputFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: fit-content;
  gap: 0;
  padding: 0;
  margin: 0;
  border: 2px solid ${Color.WHITE};
  border-radius: 10px;
`

export const InlineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`
