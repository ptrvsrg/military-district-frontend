import { StyledItem, StyledItemText } from './Item.styled.ts'
import { ItemProps } from './Item.types.ts'

export function Item(props: ItemProps) {
  return (
    <StyledItem>
      <StyledItemText size={props.size}>{props.text}</StyledItemText>
      <a onClick={props.onClick}>
        <img alt={''} height={props.size * 0.8} src={props.image} />
      </a>
    </StyledItem>
  )
}
