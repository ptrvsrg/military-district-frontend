import { StyledText } from './Text.styled.ts'
import { TextConfig } from './Text.types.ts'

export function PlainText({ config }: { config: TextConfig }) {
  return <StyledText config={config}>{config.text}</StyledText>
}

export function HeaderText({ config }: { config: TextConfig }) {
  return <StyledText config={config}>{config.text}</StyledText>
}
