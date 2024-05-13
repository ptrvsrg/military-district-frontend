import { Typography } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../components/table/Table.tsx'
import { ParameterInput, ReportData, ReportInfo } from '../../models/report/report.types.ts'
import { ReportParametersPanel } from '../../modules/report/ReportParametersPanel.tsx'
import { useServices } from '../../services/useServices.ts'
import { ColumnContent, RowWrapper, SpinnerWrapper } from '../../styles/ts/containers.ts'
import { Error404Page } from '../Error404Page.tsx'
import { Layout } from '../Layout.tsx'

export function ReportBuildPage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const reportName = searchParameters.get('reportName')
  if (reportName === null) {
    return <Error404Page />
  }

  // Fetch report
  const [report, setReport] = useState<ReportInfo | null | undefined>()
  const [loading, setLoading] = useState(true)
  const { reportService } = useServices()

  useEffect(() => {
    const fetchData = async () => {
      const reportData = await reportService.getByName({ reportName })
      setReport(reportData)
    }

    setLoading(true)
    fetchData().finally(() => setLoading(false))
  }, [])

  // Fetch report data
  const [reportData, setReportData] = useState<ReportData | null | undefined>()
  const [loadingData, setLoadingData] = useState(false)
  const handleCreateClick = (parameters: Map<string, string>) => {
    const parameterInputs =
      report?.parameters.map((parameter) => {
        return {
          name: parameter,
          value: parameters.get(parameter) ?? null,
        } as ParameterInput
      }) ?? []

    const fetchData = async () => {
      const reportDataData = await reportService.build({
        name: report?.name ?? '',
        parameters: parameterInputs.filter((parameterInput) => parameterInput.value !== null && parameterInput.value !== ''),
      })
      setReportData(reportDataData)
    }

    setLoadingData(true)
    fetchData().finally(() => setLoadingData(false))
  }

  // Export report
  const handleExportClick = (parameters: Map<string, string>) => {
    const parameterInputs =
      report?.parameters.map((parameter) => {
        return {
          name: parameter,
          value: parameters.get(parameter) ?? null,
        } as ParameterInput
      }) ?? []

    const fetchData = async () => {
      await reportService.export({
        name: report?.name ?? '',
        parameters: parameterInputs.filter((parameterInput) => parameterInput.value !== null && parameterInput.value !== ''),
      })
    }

    fetchData()
  }

  // Table
  const tableColumns: Column[] =
    reportData?.columns.map((column) => {
      return {
        label: <b>{column.toUpperCase().replaceAll('_', ' ')}</b>,
      }
    }) ?? []
  const tableData: ReactNode[][] =
    reportData?.data.map((record) => {
      return reportData?.columns.map((column) => <p>{record[column]}</p>) ?? []
    }) ?? []

  // Render
  if (loading) {
    return (
      <Layout>
        <SpinnerWrapper style={{ height: 'calc(100vh - 110px)' }}>
          <Spinner />
        </SpinnerWrapper>
      </Layout>
    )
  }

  if (!loading && (report === null || report === undefined)) {
    return <Error404Page />
  }

  return (
    <Layout>
      <ColumnContent>
        <Typography align={'center'} color={'white'} variant={'h5'}>
          {report?.name.toUpperCase().replaceAll('_', ' ') ?? ''}
        </Typography>
        <ReportParametersPanel onCreateClick={handleCreateClick} onExportClick={handleExportClick} parameters={report?.parameters ?? []} />
        {loadingData ? (
          <SpinnerWrapper style={{ height: 400 }}>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <RowWrapper>
            <Table columns={tableColumns} data={tableData} />
          </RowWrapper>
        )}
      </ColumnContent>
    </Layout>
  )
}
