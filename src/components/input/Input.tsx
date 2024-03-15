import { Img, InputWrapper, StyledInput } from './Input.styled.ts'
import { InputProps, InputWithActionProps } from './Input.type.ts'

export function Input(props: InputProps) {
  return (
    <InputWrapper variant={props.variant}>
      <StyledInput {...props} type={'text'}></StyledInput>
    </InputWrapper>
  )
}

export function InputWithAction(props: InputWithActionProps) {
  return (
    <InputWrapper variant={props.variant}>
      <StyledInput {...props} type={'text'}></StyledInput>
      <a onClick={props.action}>
        <Img src={props.image} />
      </a>
    </InputWrapper>
  )
}
