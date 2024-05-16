import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Specialty } from '../../../models/graphql/schema.ts'
import { MilitaryFormStore } from './MilitaryForm.store.ts'

type SpecialtiesFormProps = {
  militaryFormStore: MilitaryFormStore
  specialties: Specialty[]
}

export const SpecialtiesForm = observer((props: SpecialtiesFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleSpecialtiesChange = (_event: SyntheticEvent, newValue: Specialty[]) => props.militaryFormStore.setSpecialties(newValue)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForSpecialty = (specialtyOption: Specialty) => `${specialtyOption.code} ${specialtyOption.name}`

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('specialties')}
      </Typography>
      <Autocomplete
        getOptionLabel={getOptionLabelForSpecialty}
        multiple
        onChange={handleSpecialtiesChange}
        options={props.specialties}
        renderInput={(parameters) => <TextField {...parameters} label={t('specialties')} variant={'outlined'} />}
        sx={{ width: '100%' }}
        value={props.militaryFormStore.getSpecialties()}
      />
    </>
  )
})
