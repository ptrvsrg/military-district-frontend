import { ReactNode } from 'react'

export enum MenuAlign {
  LEFT,
  RIGHT,
}

export interface MenuItemProps {
  onClick?: () => void
  size: number
  text: string
}

export interface DropdownProps {
  children?: ReactNode
  height: number
  image: string
  menuAlign?: MenuAlign
}
