import Table from '../../../components/table/Table.tsx'
import { columns, nodes } from './data.tsx'

export default {
  component: Table,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Table',
}

const Template = () => {
  return <Table columns={columns} data={{ nodes }} />
}

export const Default = Template.bind({})
