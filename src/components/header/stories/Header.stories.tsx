import { Header } from '../Header.tsx'
import { HeaderProps } from '../Header.types.ts'

export default {
  component: Header,
  parameters: {
    layout: 'padded',
  },
  title: 'Components/Header',
}

const Template = (props: HeaderProps) => {
  return (
    <>
      <Header {...props} />
    </>
  )
}

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  accountUrl: undefined,
  homeUrl: undefined,
  selectedTab: 'Item 1',
  tabs: [
    {
      name: 'Item 1',
    },
    {
      name: 'Item 2',
    },
    {
      name: 'Item 3',
    },
    {
      name: 'Item 4',
    },
    {
      name: 'Item 5',
    },
  ],
}
