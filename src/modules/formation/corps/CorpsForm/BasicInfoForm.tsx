import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { ColumnWrapper, RowWrapper } from '../../../../styles/ts/containers.ts'
import { CorpsFormStore } from './CorpsForm.store.ts'

type BasicInfoFormProps = {
  corpsFormStore: CorpsFormStore
  militaries: MilitaryBrief[]
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => props.corpsFormStore.setName(event.target.value)
  const handleCommanderChange = (_event: SyntheticEvent, value: MilitaryBrief | null) => props.corpsFormStore.setCommander(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForCommanders = (commanderOption: MilitaryBrief) =>
    commanderOption ? `${commanderOption.mbn}: ${commanderOption.lastName} ${commanderOption.firstName} ${commanderOption.middleName ?? ''}` : '—'

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
            value={props.corpsFormStore.getName()}
            variant={'outlined'}
          />
        </ColumnWrapper>
        <ColumnWrapper>
          <Autocomplete
            getOptionLabel={getOptionLabelForCommanders}
            onChange={handleCommanderChange}
            options={props.militaries}
            renderInput={(parameters) => <TextField {...parameters} label={t('commander')} variant={'outlined'} />}
            sx={{ width: '100%' }}
            value={props.corpsFormStore.getCommander()}
          />
        </ColumnWrapper>
      </RowWrapper>
    </>
  )
})
