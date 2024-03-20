import { Column } from '@table-library/react-table-library/compact'
import { Data, TableNode } from '@table-library/react-table-library/types/table'

export interface TableProps {
  columns: Column<TableNode>[]
  data: Data<TableNode>
}
