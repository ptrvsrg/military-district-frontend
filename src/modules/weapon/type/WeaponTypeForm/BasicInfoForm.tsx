import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { WeaponCategory } from 'models/graphql/schema.ts'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { ColumnWrapper } from '../../../../styles/ts/containers.ts'
import { WeaponTypeFormStore } from './WeaponTypeForm.store.ts'

type BasicInfoFormProps = {
  categories: WeaponCategory[]
  units: string[]
  weaponTypeFormStore: WeaponTypeFormStore
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => props.weaponTypeFormStore.setName(event.target.value)
  const handleCategoryChange = (_event: SyntheticEvent, value: WeaponCategory | null) => props.weaponTypeFormStore.setCategory(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForCategories = (typeOption: WeaponCategory) => typeOption.name

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('basicInfo')}
      </Typography>
      <ColumnWrapper>
        <TextField
          label={t('name')}
          onChange={handleNameChange}
          sx={{ width: '100%' }}
          value={props.weaponTypeFormStore.getName()}
          variant={'outlined'}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForCategories}
          onChange={handleCategoryChange}
          options={props.categories}
          renderInput={(parameters) => <TextField {...parameters} label={t('category')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.weaponTypeFormStore.getCategory()}
        />
      </ColumnWrapper>
    </>
  )
})
