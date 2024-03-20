import styled from 'styled-components'

import { Color } from '../../styles/ts/colors.ts'

export const Row = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  border-bottom-style: solid;
  border-bottom-color: ${Color.DARK_GRAY};
  border-bottom-width: 3px;
  background-color: ${Color.DARK_BLUE};
  z-index: 999;
`

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: fit-content;
  height: fit-content;
`

export const Img = styled.img`
  height: 22px;
  cursor: pointer;
`
