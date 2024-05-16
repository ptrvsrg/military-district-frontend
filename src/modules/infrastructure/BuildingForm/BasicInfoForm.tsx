import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { ColumnWrapper, RowWrapper } from '../../../styles/ts/containers.ts'
import { BuildingFormStore } from './BuildingForm.store.ts'

type BasicInfoFormProps = {
  buildingFormStore: BuildingFormStore
  units: string[]
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => props.buildingFormStore.setName(event.target.value)
  const handleUnitChange = (_event: SyntheticEvent, value: null | string) => props.buildingFormStore.setUnit(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForUnits = (unitOption: string) => unitOption

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('basicInfo')}
      </Typography>
      <RowWrapper>
        <ColumnWrapper>
          <TextField
            label={t('name')}
            onChange={handleNameChange}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getName()}
            variant={'outlined'}
          />
        </ColumnWrapper>
        <ColumnWrapper>
          <Autocomplete
            getOptionLabel={getOptionLabelForUnits}
            onChange={handleUnitChange}
            options={props.units}
            renderInput={(parameters) => <TextField {...parameters} label={t('unit')} variant={'outlined'} />}
            sx={{ width: '100%' }}
            value={props.buildingFormStore.getUnit()}
          />
        </ColumnWrapper>
      </RowWrapper>
    </>
  )
})
