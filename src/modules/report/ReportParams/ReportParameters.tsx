import { Autocomplete, Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { useServices } from '../../../services/useServices.ts'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../styles/ts/containers.ts'
import { ReportDataStore } from '../ReportData/ReportData.store.ts'
import { ReportParametersStore } from './ReportParameters.store.ts'

type ReportParametersPanelProps = {
  loadingStore: LoadingStore
  parameterValues?: Record<string, string[]> | null
  reportDataStore: ReportDataStore
  reportName: string
  reportParametersStore: ReportParametersStore
}

export const ReportParameters = observer((props: ReportParametersPanelProps) => {
  const { t } = useTranslation()
  const { reportService } = useServices()

  const handleInputValueChange = (parameter: string) => (event: ChangeEvent<HTMLInputElement>) =>
    props.reportParametersStore.setParameter(parameter, event.target.value === '' ? null : event.target.value)
  const handleSelectValueChange = (parameter: string) => (_event: SyntheticEvent, newValue: null | string) =>
    props.reportParametersStore.setParameter(parameter, newValue)
  const processParameters = () => {
    const parameters: Record<string, null | string> = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const parameter of Object.keys(props.parameterValues ?? {})) {
      parameters[parameter] = props.reportParametersStore.getParameter(parameter)
    }
    return parameters
  }
  const handleCreateClick = () => {
    const fetchData = async () => {
      const parameters = processParameters()
      const reportData = await reportService.build({ parameters }, { report: props.reportName ?? '' })
      props.reportDataStore.setReportData(reportData.data)
    }

    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleExportClick = () => {
    const parameters = processParameters()
    reportService.export({ parameters }, { report: props.reportName ?? '' })
  }

  return (
    <>
      <InlineWrapper>
        {Object.keys(props.parameterValues ?? {})
          .sort()
          .map((parameter) => {
            const label = parameter.replaceAll(/([A-Z])/g, ' $1').toLowerCase()
            const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1)

            const parameterValues = props.parameterValues ? props.parameterValues[parameter] : null
            if (!parameterValues || parameterValues.length === 0) {
              return <TextField label={capitalizedLabel} onChange={handleInputValueChange(parameter)} variant={'outlined'} />
            }

            // eslint-disable-next-line unicorn/consistent-function-scoping
            const getOptionLabelForSpecialty = (option: string) => option
            return (
              <Autocomplete
                getOptionLabel={getOptionLabelForSpecialty}
                onChange={handleSelectValueChange(parameter)}
                options={parameterValues}
                renderInput={(parameters) => <TextField {...parameters} label={capitalizedLabel} variant={'outlined'} />}
                sx={{ width: 230 }}
              />
            )
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
