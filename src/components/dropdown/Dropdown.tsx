import { FC, useEffect, useState } from 'react'

import { Variant } from '../../styles/ts/types.ts'
import { PlainText } from '../text/Text.tsx'
import { Img, Menu, StyledDropdown, StyledMenuItem } from './Dropdown.styled.ts'
import { DropdownProps, MenuItemProps } from './Dropdown.types.ts'

export const MenuItem: FC<MenuItemProps> = ({ onClick, size, text }) => {
  return (
    <StyledMenuItem onClick={onClick}>
      <PlainText size={size} text={text} variant={Variant.SECONDARY} />
    </StyledMenuItem>
  )
}

export function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    const clickOutside = (event) => {
      if (event.target && !event.target.closest('.dropdown') && !event.target.closest('.dropdown-menu') && isOpen) {
        toggleDropdown()
      }
    }

    document.addEventListener('mousedown', clickOutside)
    return () => document.removeEventListener('mousedown', clickOutside)
  }, [toggleDropdown])

  return (
    <StyledDropdown>
      <Img className={'dropdown'} height={props.height} onClick={toggleDropdown} src={props.image} />
      {isOpen && (
        <Menu align={props.menuAlign} className={'dropdown-menu'}>
          {props.children}
        </Menu>
      )}
    </StyledDropdown>
  )
}
