import { Autocomplete, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { MilitaryBrief } from '../../../../models/graphql/fragments.ts'
import { ColumnWrapper } from '../../../../styles/ts/containers.ts'
import { SquadFormStore } from './SquadForm.store.ts'

type BasicInfoFormProps = {
  militaries: MilitaryBrief[]
  platoons: string[]
  squadFormStore: SquadFormStore
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => props.squadFormStore.setName(event.target.value)
  const handleCommanderChange = (_event: SyntheticEvent, value: MilitaryBrief | null) => props.squadFormStore.setCommander(value ?? undefined)
  const handlePlatoonChange = (_event: SyntheticEvent, value: null | string) => props.squadFormStore.setPlatoon(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForCommanders = (commanderOption: MilitaryBrief) =>
    commanderOption ? `${commanderOption.mbn}: ${commanderOption.lastName} ${commanderOption.firstName} ${commanderOption.middleName ?? ''}` : '—'
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForPlatoons = (platoonOption: string) => platoonOption

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('basicInfo')}
      </Typography>
      <ColumnWrapper>
        <TextField label={t('name')} onChange={handleNameChange} sx={{ width: '100%' }} value={props.squadFormStore.getName()} variant={'outlined'} />
        <Autocomplete
          getOptionLabel={getOptionLabelForCommanders}
          onChange={handleCommanderChange}
          options={props.militaries}
          renderInput={(parameters) => <TextField {...parameters} label={t('commander')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.squadFormStore.getCommander()}
        />
        <Autocomplete
          getOptionLabel={getOptionLabelForPlatoons}
          onChange={handlePlatoonChange}
          options={props.platoons}
          renderInput={(parameters) => <TextField {...parameters} label={t('platoon')} variant={'outlined'} />}
          sx={{ width: '100%' }}
          value={props.squadFormStore.getPlatoon()}
        />
      </ColumnWrapper>
    </>
  )
})
