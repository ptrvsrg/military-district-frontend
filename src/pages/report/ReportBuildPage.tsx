import { Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../components/spinner/Spinner.tsx'
import { ReportInfoOutput } from '../../models/report/report.types.ts'
import { ReportDataStore } from '../../modules/report/ReportData/ReportData.store.ts'
import { ReportData } from '../../modules/report/ReportData/ReportData.tsx'
import { ReportParameters } from '../../modules/report/ReportParams/ReportParameters.tsx'
import { ReportParametersStore } from '../../modules/report/ReportParams/ReportParameters.store.ts'
import { useServices } from '../../services/useServices.ts'
import loadingStore from '../../stores/LoadingStore.ts'
import { ColumnContent, SpinnerWrapper } from '../../styles/ts/containers.ts'
import { Error404Page } from '../Error404Page.tsx'
import { Layout } from '../Layout.tsx'

export function ReportBuildPage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch report
  const [report, setReport] = useState<ReportInfoOutput | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { reportService } = useServices()

  const fetchReport = useCallback(async () => {
    const reportData = await reportService.getByName({ name })
    setReport(reportData)
  }, [name])
  useEffect(() => {
    setLoading(true)
    fetchReport().finally(() => setLoading(false))
  }, [fetchReport])

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

  if (report === null) {
    return <Error404Page />
  }

  const reportParametersStore = new ReportParametersStore()
  const reportDataStore = new ReportDataStore()
  return (
    <Layout>
      <ColumnContent>
        <Typography align={'center'} color={'white'} variant={'h5'}>
          {report.name ?? ''}
        </Typography>
        <Typography align={'center'} color={'#999'} variant={'subtitle1'}>
          {report.description ?? ''}
        </Typography>
        <ReportParameters
          loadingStore={loadingStore}
          report={report}
          reportDataStore={reportDataStore}
          reportParametersStore={reportParametersStore}
        />
        <ReportData loadingStore={loadingStore} reportDataStore={reportDataStore} />
      </ColumnContent>
    </Layout>
  )
}
