import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-wrap: break-word;
  background-color: transparent;
  border-radius: 10px;
  border: ${Color.WHITE} solid 2px;
  gap: 20px;
  padding: 10px 20px;
  box-sizing: border-box;
  width: fit-content;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  gap: 10px;
  width: fit-content;
`

export const Input = styled.input<{ fontSize: number }>`
  padding: 0;
  margin: 0;
  background-color: transparent;
  color: ${Color.WHITE};
  font-size: ${(props) => `${props.fontSize}px`};
  line-height: ${(props) => `${props.fontSize}px`};
  overflow: hidden;
  border: none;
  text-align: center;

  &:focus {
    outline: none;
  }
`
