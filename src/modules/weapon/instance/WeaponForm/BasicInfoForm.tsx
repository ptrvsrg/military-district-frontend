import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { WeaponType } from 'models/graphql/schema.ts'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { ColumnWrapper } from '../../../../styles/ts/containers.ts'
import { WeaponFormStore } from './WeaponForm.store.ts'

type BasicInfoFormProps = {
  types: WeaponType[]
  units: string[]
  weaponFormStore: WeaponFormStore
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleSerialNumberChange = (event: ChangeEvent<HTMLInputElement>) => props.weaponFormStore.setSerialNumber(event.target.value)
  const handleUnitChange = (_event: SyntheticEvent, value: null | string) => props.weaponFormStore.setUnit(value ?? undefined)
  const handleTypeChange = (_event: SyntheticEvent, value: WeaponType | null) => props.weaponFormStore.setType(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForUnits = (unitOption: string) => unitOption
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForTypes = (typeOption: WeaponType) => typeOption.name
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const groupByForTypes = (typeOption: WeaponType) => typeOption?.category?.name

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('basicInfo')}
      </Typography>
      <ColumnWrapper>
        <TextField
          label={t('name')}
          onChange={handleSerialNumberChange}
          sx={{ width: '100%' }}
          value={props.weaponFormStore.getSerialNumber()}
          variant={'outlined'}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForUnits}
          onChange={handleUnitChange}
          options={props.units}
          renderInput={(parameters) => <TextField {...parameters} label={t('unit')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.weaponFormStore.getUnit()}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForTypes}
          groupBy={groupByForTypes}
          onChange={handleTypeChange}
          options={props.types.sort((a, b) => {
            const categoryComparison = a.category.name.localeCompare(b.category.name)
            const nameComparison = a.name.localeCompare(b.name)
            return categoryComparison === 0 ? nameComparison : categoryComparison
          })}
          renderInput={(parameters) => <TextField {...parameters} label={t('type')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.weaponFormStore.getType()}
        />
      </ColumnWrapper>
    </>
  )
})
