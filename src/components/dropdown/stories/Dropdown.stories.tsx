import logo from '../../../assets/logo.svg'
import { Dropdown, MenuItem } from '../Dropdown.tsx'
import { DropdownProps } from '../Dropdown.types.ts'

export default {
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Dropdown',
}

const Template = (props: DropdownProps) => {
  return (
    <Dropdown height={props.height} image={props.image}>
      <MenuItem size={16} text={'Item 1'} />
      <MenuItem size={16} text={'Item 2'} />
      <MenuItem size={16} text={'Item 3'} />
      <MenuItem size={16} text={'Item 4'} />
    </Dropdown>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  height: 64,
  image: logo,
}
