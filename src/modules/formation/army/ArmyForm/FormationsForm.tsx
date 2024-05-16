import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { ArmyFormStore } from './ArmyForm.store.ts'

type FormationProps = {
  armyFormStore: ArmyFormStore
  brigades: string[]
  corps: string[]
  divisions: string[]
  loadingStore: LoadingStore
}

export const FormationsForm = observer((props: FormationProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleBrigadesChange = (_event: SyntheticEvent, newValue: string[]) => props.armyFormStore.setBrigades(newValue)
  const handleCorpsChange = (_event: SyntheticEvent, newValue: string[]) => props.armyFormStore.setCorps(newValue)
  const handleDivisionsChange = (_event: SyntheticEvent, newValue: string[]) => props.armyFormStore.setDivisions(newValue)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForFormation = (formationOption: string) => formationOption

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('formations')}
      </Typography>
      <Autocomplete
        getOptionLabel={getOptionLabelForFormation}
        multiple
        onChange={handleBrigadesChange}
        options={props.brigades}
        renderInput={(parameters) => <TextField {...parameters} label={t('brigades')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.armyFormStore.getBrigades()}
      />
      <Autocomplete
        getOptionLabel={getOptionLabelForFormation}
        multiple
        onChange={handleCorpsChange}
        options={props.corps}
        renderInput={(parameters) => <TextField {...parameters} label={t('corps')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.armyFormStore.getCorps()}
      />
      <Autocomplete
        getOptionLabel={getOptionLabelForFormation}
        multiple
        onChange={handleDivisionsChange}
        options={props.divisions}
        renderInput={(parameters) => <TextField {...parameters} label={t('divisions')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.armyFormStore.getDivisions()}
      />
    </>
  )
})
