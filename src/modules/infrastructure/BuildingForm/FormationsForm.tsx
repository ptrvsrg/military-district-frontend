import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { BuildingFormStore } from './BuildingForm.store.ts'

type FormationProps = {
  buildingFormStore: BuildingFormStore
  companies: string[]
  loadingStore: LoadingStore
  platoons: string[]
  squads: string[]
}

export const FormationsForm = observer((props: FormationProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleCompaniesChange = (_event: SyntheticEvent, newValue: string[]) => props.buildingFormStore.setCompanies(newValue)
  const handlePlatoonsChange = (_event: SyntheticEvent, newValue: string[]) => props.buildingFormStore.setPlatoons(newValue)
  const handleSquadsChange = (_event: SyntheticEvent, newValue: string[]) => props.buildingFormStore.setSquads(newValue)
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
        onChange={handleCompaniesChange}
        options={props.companies}
        renderInput={(parameters) => <TextField {...parameters} label={t('companies')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.buildingFormStore.getCompanies()}
      />
      <Autocomplete
        getOptionLabel={getOptionLabelForFormation}
        multiple
        onChange={handlePlatoonsChange}
        options={props.platoons}
        renderInput={(parameters) => <TextField {...parameters} label={t('platoons')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.buildingFormStore.getPlatoons()}
      />
      <Autocomplete
        getOptionLabel={getOptionLabelForFormation}
        multiple
        onChange={handleSquadsChange}
        options={props.squads}
        renderInput={(parameters) => <TextField {...parameters} label={t('squads')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.buildingFormStore.getSquads()}
      />
    </>
  )
})
