import { Column } from '@table-library/react-table-library/compact'
import { TableNode } from '@table-library/react-table-library/types/table'
import { DocumentNode } from 'graphql/language'

export interface GraphQLTableProps {
  columns: Column<TableNode>[]
  query: DocumentNode
}
