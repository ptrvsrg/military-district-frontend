import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../components/spinner/Spinner.tsx'
import { ReportInfoOutput } from '../../models/report/report.types.ts'
import reportDataStore from '../../modules/report/ReportData/ReportData.store.ts'
import { ReportData } from '../../modules/report/ReportData/ReportData.tsx'
import { ReportParameters } from '../../modules/report/ReportParams/ReportParameters.tsx'
import reportParametersStore from '../../modules/report/ReportParams/ReportParametersStore.ts'
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
  const [report, setReport] = useState<ReportInfoOutput | undefined>()
  const { reportService } = useServices()
  useEffect(() => {
    const fetchData = async () => {
      const reportData = await reportService.getByName({ name })
      setReport(reportData)
    }

    loadingStore.setLoading(true)
    fetchData().finally(() => loadingStore.setLoading(false))
  }, [name])

  // Render
  if (loadingStore.getLoading()) {
    return (
      <Layout>
        <SpinnerWrapper style={{ height: 'calc(100vh - 110px)' }}>
          <Spinner />
        </SpinnerWrapper>
      </Layout>
    )
  }

  if (!loadingStore.getLoading() && (report === null || report === undefined)) {
    return <Error404Page />
  }

  return (
    <Layout>
      <ColumnContent>
        <Typography align={'center'} color={'white'} variant={'h5'}>
          {report?.name ?? ''}
        </Typography>
        <Typography align={'center'} color={'#999'} variant={'subtitle1'}>
          {report?.description ?? ''}
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
