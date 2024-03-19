import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'

export const StyledItem = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  width: fit-content;
  border-radius: 10px;
  border: none;
  outline: none;
  background: ${Color.WHITE};
  color: ${Color.BLACK};
  overflow: hidden;
  box-sizing: border-box;
  gap: 20px;

  &:focus {
    outline: none;
  }
`

export const StyledItemText = styled.div<{ size: number }>`
  color: ${Color.BLACK};
  font-size: ${(props) => `${props.size}px`};
  font-weight: normal;
  word-wrap: break-word;
`
