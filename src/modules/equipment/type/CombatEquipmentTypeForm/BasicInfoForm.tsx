import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { CombatEquipmentCategory } from 'models/graphql/schema.ts'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { ColumnWrapper } from '../../../../styles/ts/containers.ts'
import { CombatEquipmentTypeFormStore } from './CombatEquipmentTypeForm.store.ts'

type BasicInfoFormProps = {
  categories: CombatEquipmentCategory[]
  combatEquipmentTypeFormStore: CombatEquipmentTypeFormStore
  units: string[]
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => props.combatEquipmentTypeFormStore.setName(event.target.value)
  const handleCategoryChange = (_event: SyntheticEvent, value: CombatEquipmentCategory | null) =>
    props.combatEquipmentTypeFormStore.setCategory(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForCategories = (typeOption: CombatEquipmentCategory) => typeOption.name

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
          value={props.combatEquipmentTypeFormStore.getName()}
          variant={'outlined'}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForCategories}
          onChange={handleCategoryChange}
          options={props.categories}
          renderInput={(parameters) => <TextField {...parameters} label={t('category')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.combatEquipmentTypeFormStore.getCategory()}
        />
      </ColumnWrapper>
    </>
  )
})
