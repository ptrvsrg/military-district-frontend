import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { ColumnWrapper } from '../../../../styles/ts/containers.ts'
import { CompanyFormStore } from './CompanyForm.store.ts'

type BasicInfoFormProps = {
  companyFormStore: CompanyFormStore
  militaries: MilitaryBrief[]
  units: string[]
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => props.companyFormStore.setName(event.target.value)
  const handleCommanderChange = (_event: SyntheticEvent, value: MilitaryBrief | null) => props.companyFormStore.setCommander(value ?? undefined)
  const handleUnitChange = (_event: SyntheticEvent, value: null | string) => props.companyFormStore.setUnit(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForCommanders = (commanderOption: MilitaryBrief) =>
    commanderOption ? `${commanderOption.mbn}: ${commanderOption.lastName} ${commanderOption.firstName} ${commanderOption.middleName ?? ''}` : '—'
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForUnits = (unitOption: string) => unitOption

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
          value={props.companyFormStore.getName()}
          variant={'outlined'}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForCommanders}
          onChange={handleCommanderChange}
          options={props.militaries}
          renderInput={(parameters) => <TextField {...parameters} label={t('commander')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.companyFormStore.getCommander()}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForUnits}
          onChange={handleUnitChange}
          options={props.units}
          renderInput={(parameters) => <TextField {...parameters} label={t('unit')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.companyFormStore.getUnit()}
        />
      </ColumnWrapper>
    </>
  )
})
