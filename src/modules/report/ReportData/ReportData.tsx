import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../components/table/Table.tsx'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { ReportDataStore } from './ReportData.store.ts'

type ReportDataProps = {
  loadingStore: LoadingStore
  reportDataStore: ReportDataStore
}

export const ReportData = observer((props: ReportDataProps) => {
  // Table
  const reportData = props.reportDataStore.getReportData() ?? []
  const columns = Object.keys(reportData.length > 0 ? reportData[0] : {})
  const tableColumns: Column[] =
    columns.map((column) => {
      return {
        label: <b>{column.toUpperCase().replaceAll('_', ' ')}</b>,
      }
    }) ?? []
  const tableData: ReactNode[][] =
    reportData.map((row) => {
      return columns.map((column) => <p>{row[column]}</p>) ?? []
    }) ?? []

  if (props.loadingStore.getLoading()) {
    return (
      <SpinnerWrapper style={{ height: 400 }}>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  return (
    <RowWrapper>
      <Table columns={tableColumns} data={tableData} />
    </RowWrapper>
  )
})
