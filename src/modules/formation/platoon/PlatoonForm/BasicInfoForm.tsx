import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { ColumnWrapper } from '../../../../styles/ts/containers.ts'
import { PlatoonFormStore } from './PlatoonForm.store.ts'

type BasicInfoFormProps = {
  companies: string[]
  militaries: MilitaryBrief[]
  platoonFormStore: PlatoonFormStore
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => props.platoonFormStore.setName(event.target.value)
  const handleCommanderChange = (_event: SyntheticEvent, value: MilitaryBrief | null) => props.platoonFormStore.setCommander(value ?? undefined)
  const handleCompanyChange = (_event: SyntheticEvent, value: null | string) => props.platoonFormStore.setCompany(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForCommanders = (commanderOption: MilitaryBrief) =>
    commanderOption ? `${commanderOption.mbn}: ${commanderOption.lastName} ${commanderOption.firstName} ${commanderOption.middleName ?? ''}` : '—'
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForCompanies = (companyOption: string) => companyOption

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
          value={props.platoonFormStore.getName()}
          variant={'outlined'}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForCommanders}
          onChange={handleCommanderChange}
          options={props.militaries}
          renderInput={(parameters) => <TextField {...parameters} label={t('commander')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.platoonFormStore.getCommander()}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForCompanies}
          onChange={handleCompanyChange}
          options={props.companies}
          renderInput={(parameters) => <TextField {...parameters} label={t('company')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.platoonFormStore.getCompany()}
        />
      </ColumnWrapper>
    </>
  )
})
