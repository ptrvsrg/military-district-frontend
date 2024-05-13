import { Button, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { InlineWrapper } from '../../styles/ts/containers.ts'

type ReportParametersPanelProps = {
  onCreateClick: (parameters: Map<string, string>) => void
  onExportClick: (parameters: Map<string, string>) => void
  parameters: string[]
}

export function ReportParametersPanel(props: ReportParametersPanelProps) {
  const { t } = useTranslation()
  const [parameters, setParameters] = useState<Map<string, string>>(new Map())

  const handleValueChange = (parameter: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newParameters = new Map(parameters)
    newParameters.set(parameter, event.target.value)
    setParameters(newParameters)
  }

  const handleCreateClick = () => {
    props.onCreateClick(parameters)
  }

  const handleExportClick = () => {
    props.onExportClick(parameters)
  }

  return (
    <InlineWrapper>
      {props.parameters.map((parameter) => {
        const label = parameter.replaceAll('_', ' ')
        const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1)
        return <TextField label={capitalizedLabel} onChange={handleValueChange(parameter)} variant={'outlined'} />
      })}
      <Button onClick={handleCreateClick} style={{ height: 56 }} variant="contained">
        {t('create')}
      </Button>
      <Button onClick={handleExportClick} style={{ height: 56 }} variant="contained">
        {t('export')}
      </Button>
    </InlineWrapper>
  )
}
