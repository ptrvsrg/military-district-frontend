import { HeaderText as Header } from '../../../components/text/Text.tsx'
import { TextProps } from '../../../components/text/Text.types.ts'
import { Variant } from '../../../styles/ts/types.ts'

export default {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: Object.values(Variant),
    },
  },
  component: Header,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Text',
}

const Template = (props: TextProps) => <Header {...props} />

export const HeaderText = Template.bind({})
// @ts-ignore
HeaderText.args = {
  bold: false,
  size: 40,
  text: 'Header text',
  underlined: false,
  variant: Variant.PRIMARY,
}
