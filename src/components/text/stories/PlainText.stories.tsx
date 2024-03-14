import { Variant } from '../../../styles/ts/types.ts'
import { PlainText as Plain } from '../Text.tsx'
import { TextConfig } from '../Text.types.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [Variant.PRIMARY, Variant.SECONDARY],
    },
  },
  component: Plain,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Text',
}

const Template = (config: TextConfig) => <Plain config={config} />

export const PlainText = Template.bind({})
// @ts-ignore
PlainText.args = {
  bold: false,
  size: 40,
  text: 'Plain text',
  underlined: false,
  variant: Variant.PRIMARY,
}
