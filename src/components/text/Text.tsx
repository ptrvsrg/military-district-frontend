import { StyledHeaderText, StyledPlainText } from './Text.styled.ts'
import { TextProps } from './Text.types.ts'

export function PlainText(props: TextProps) {
  return <StyledPlainText {...props}>{props.text}</StyledPlainText>
}

export function HeaderText(props: TextProps) {
  return <StyledHeaderText {...props}>{props.text}</StyledHeaderText>
}
