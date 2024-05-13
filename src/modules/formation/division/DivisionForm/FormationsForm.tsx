import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { DivisionFormStore } from './DivisionForm.store.ts'

type FormationsFormProps = {
  armies: string[]
  divisionFormStore: DivisionFormStore
  units: string[]
}

export const FormationsForm = observer((props: FormationsFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleUnitsChange = (_event: SyntheticEvent, newValue: string[]) => props.divisionFormStore.setUnits(newValue)
  const handleArmiesChange = (_event: SyntheticEvent, newValue: string[]) => props.divisionFormStore.setArmies(newValue)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForFormation = (formationOption: string) => formationOption

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('formation')}
      </Typography>
      <Autocomplete
        getOptionLabel={getOptionLabelForFormation}
        multiple
        onChange={handleUnitsChange}
        options={props.units}
        renderInput={(parameters) => <TextField {...parameters} label={t('units')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.divisionFormStore.getUnits()}
      />
      <Autocomplete
        getOptionLabel={getOptionLabelForFormation}
        multiple
        onChange={handleArmiesChange}
        options={props.armies}
        renderInput={(parameters) => <TextField {...parameters} label={t('armies')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.divisionFormStore.getArmies()}
      />
    </>
  )
})
