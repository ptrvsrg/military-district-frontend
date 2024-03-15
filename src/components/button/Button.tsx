import { StyledButton, StyledButtonText } from './Button.styled.ts'
import { ButtonProps } from './Button.types.ts'

export function Button(props: ButtonProps) {
  return (
    <StyledButton {...props}>
      <StyledButtonText {...props}>{props.text}</StyledButtonText>
    </StyledButton>
  )
}
