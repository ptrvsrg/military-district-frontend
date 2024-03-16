import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'
import { MenuAlign } from './Dropdown.types.ts'

export const StyledMenuItem = styled.div`
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: ${Color.LIGHT_GRAY};
  }
`

export const Menu = styled.div<{ align?: MenuAlign }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Color.WHITE};
  inset: ${(props) => (props.align ? (props.align === MenuAlign.RIGHT ? 'auto 20px auto auto' : 'auto auto auto 20px') : 'auto')};
  position: absolute;
  box-sizing: border-box;
  border-radius: 10px;
  width: fit-content;
  z-index: 1;
  margin: 10px;
`
export const StyledDropdown = styled.div`
  display: inline-block;
  width: fit-content;
`

export const Img = styled.img<{ height: number }>`
  height: ${(props) => props.height};
  cursor: pointer;
`
