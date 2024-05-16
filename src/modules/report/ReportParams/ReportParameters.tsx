import { Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { ReportInfoOutput } from '../../../models/report/report.types.ts'
import { useServices } from '../../../services/useServices.ts'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../styles/ts/containers.ts'
import { ReportDataStore } from '../ReportData/ReportData.store.ts'
import { ReportParametersStore } from './ReportParameters.store.ts'

type ReportParametersPanelProps = {
  loadingStore: LoadingStore
  report?: ReportInfoOutput
  reportDataStore: ReportDataStore
  reportParametersStore: ReportParametersStore
}

export const ReportParameters = observer((props: ReportParametersPanelProps) => {
  const { t } = useTranslation()
  const { reportService } = useServices()

  const handleValueChange = (parameter: string) => (event: ChangeEvent<HTMLInputElement>) => {
    props.reportParametersStore.setParameter(parameter, event.target.value === '' ? null : event.target.value)
  }
  const handleCreateClick = () => {
    const parameters: Record<string, null | string> = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const parameter of props.report?.parameters ?? []) {
      parameters[parameter] = props.reportParametersStore.getParameter(parameter)
    }

    const fetchData = async () => {
      const reportData = await reportService.build({ parameters }, { name: props.report?.name ?? '' })
      props.reportDataStore.setReportData(reportData.data)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleExportClick = () => {
    const parameters: Record<string, null | string> = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const parameter of props.report?.parameters ?? []) {
      parameters[parameter] = props.reportParametersStore.getParameter(parameter)
    }
    reportService.export({ parameters }, { name: props.report?.name ?? '' })
  }

  return (
    <>
      <InlineWrapper>
        {(props.report?.parameters ?? []).map((parameter) => {
          const label = parameter.replaceAll(/([A-Z])/g, ' $1').toLowerCase()
          const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1)
          return <TextField label={capitalizedLabel} onChange={handleValueChange(parameter)} variant={'outlined'} />
        })}
      </InlineWrapper>
      <InlineWrapper>
        <Button onClick={handleCreateClick} style={{ height: 56 }} variant="contained">
          {t('create')}
        </Button>
        <Button onClick={handleExportClick} style={{ height: 56 }} variant="contained">
          {t('export')}
        </Button>
      </InlineWrapper>
    </>
  )
})
