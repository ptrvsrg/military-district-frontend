import { InputWrapper, StyledInput } from './Input.styled.ts'
import { InputProps, InputWithActionProps } from './Input.type.ts'

export function Input(props: InputProps) {
  return (
    <InputWrapper style={props.styles?.wrapper} variant={props.variant}>
      <StyledInput {...props} style={props.styles?.input} type={'text'}></StyledInput>
    </InputWrapper>
  )
}

export function InputWithAction(props: InputWithActionProps) {
  return (
    <InputWrapper style={props.styles?.wrapper} variant={props.variant}>
      <StyledInput
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        size={props.size}
        style={props.styles?.input}
        type={'text'}
        value={props.value}
        variant={props.variant}
      />
      <a onClick={props.onClick}>
        <img alt={''} height={props.size} src={props.image} />
      </a>
    </InputWrapper>
  )
}
