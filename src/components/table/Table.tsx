import { CompactTable } from '@table-library/react-table-library/compact'
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui'
import { useTheme } from '@table-library/react-table-library/theme'

import { TableProps } from './Table.types.ts'

export default function Table(props: TableProps) {
  const materialTheme = getTheme(DEFAULT_OPTIONS)
  const theme = useTheme(materialTheme)

  return <CompactTable {...props} theme={theme} />
}
