import { Variant } from '../../../styles/ts/types.ts'
import { HeaderText as Header } from '../Text.tsx'
import { TextConfig } from '../Text.types.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [Variant.PRIMARY, Variant.SECONDARY],
    },
  },
  component: Header,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Text',
}

const Template = (config: TextConfig) => <Header config={config} />

export const HeaderText = Template.bind({})
// @ts-ignore
HeaderText.args = {
  bold: false,
  size: 40,
  text: 'Header text',
  underlined: false,
  variant: Variant.PRIMARY,
}
