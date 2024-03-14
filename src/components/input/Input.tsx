import { Img, InputContainer, StyledInput } from './Input.styled.ts'
import { InputConfig, InputWithActionConfig } from './Input.type.ts'

export function Input({ config }: { config: InputConfig }) {
  return (
    <InputContainer config={config}>
      <StyledInput
        config={config}
        onBlur={config.onBlur}
        onChange={config.onChange}
        onFocus={config.onFocus}
        type={'text'}
        value={config.value}
      ></StyledInput>
    </InputContainer>
  )
}

export function InputWithAction({ config }: { config: InputWithActionConfig }) {
  return (
    <InputContainer config={config}>
      <StyledInput
        config={config}
        onBlur={config.onBlur}
        onChange={config.onChange}
        onFocus={config.onFocus}
        type={'text'}
        value={config.value}
      ></StyledInput>
      <Img onClick={config.action} src={config.image} />
    </InputContainer>
  )
}
