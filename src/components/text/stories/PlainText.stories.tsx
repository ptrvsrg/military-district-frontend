import { Variant } from '../../../styles/ts/types.ts'
import { PlainText as Plain } from '../Text.tsx'
import { TextProps } from '../Text.types.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: Object.values(Variant),
    },
  },
  component: Plain,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Text',
}

const Template = (props: TextProps) => <Plain {...props} />

export const PlainText = Template.bind({})
// @ts-ignore
PlainText.args = {
  bold: false,
  size: 40,
  text: 'Plain text',
  underlined: false,
  variant: Variant.PRIMARY,
}
