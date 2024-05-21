import { Autocomplete, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Rank } from '../../../models/graphql/schema.ts'
import { ColumnWrapper, RowWrapper } from '../../../styles/ts/containers.ts'
import { MilitaryFormStore } from './MilitaryForm.store.ts'

type BasicInfoFormProps = {
  militaryFormStore: MilitaryFormStore
  ranks: Rank[]
  units: string[]
}

export const BasicInfoForm = observer((props: BasicInfoFormProps) => {
  const { t } = useTranslation()

  // Handlers
  const handleMbnChange = (event: ChangeEvent<HTMLInputElement>) => props.militaryFormStore.setMbn(event.target.value)
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => props.militaryFormStore.setLastName(event.target.value)
  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => props.militaryFormStore.setFirstName(event.target.value)
  const handleMiddleNameChange = (event: ChangeEvent<HTMLInputElement>) => props.militaryFormStore.setMiddleName(event.target.value)
  const handleBirthDateChange = (date: Dayjs | null) => props.militaryFormStore.setBirthDate(date?.format('YYYY-MM-DD'))
  const handleRankChange = (_event: SyntheticEvent, value: Rank | null) => props.militaryFormStore.setRank(value ?? undefined)
  const handleUnitChange = (_event: SyntheticEvent, value: null | string) => props.militaryFormStore.setUnit(value ?? undefined)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForRanks = (rankOption: Rank) => rankOption?.name || '—'
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForUnits = (unitOption: string) => unitOption
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const groupByForRanks = (rankOption: Rank) => rankOption?.category?.name || '—'

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('basicInfo')}
      </Typography>
      <RowWrapper>
        <ColumnWrapper>
          <TextField
            label={t('mbn')}
            onChange={handleMbnChange}
            sx={{ width: '100%' }}
            value={props.militaryFormStore.getMbn()}
            variant={'outlined'}
          />
          <TextField
            label={t('lastName')}
            onChange={handleLastNameChange}
            sx={{ width: '100%' }}
            value={props.militaryFormStore.getLastName()}
            variant={'outlined'}
          />
          <TextField
            label={t('firstName')}
            onChange={handleFirstNameChange}
            sx={{ width: '100%' }}
            value={props.militaryFormStore.getFirstName()}
            variant={'outlined'}
          />
          <TextField
            label={t('middleName')}
            onChange={handleMiddleNameChange}
            sx={{ width: '100%' }}
            value={props.militaryFormStore.getMiddleName()}
            variant={'outlined'}
          />
        </ColumnWrapper>
        <ColumnWrapper>
          <DatePicker
            format={'YYYY-MM-DD'}
            label={t('birthDate')}
            onChange={handleBirthDateChange}
            sx={{ width: '100%' }}
            value={props.militaryFormStore.getBirthDate() ? dayjs(props.militaryFormStore.getBirthDate()) : null}
          />
          <Autocomplete
            getOptionLabel={getOptionLabelForRanks}
            groupBy={groupByForRanks}
            onChange={handleRankChange}
            options={props.ranks.sort((a, b) => {
              const categoryComparison = a.category.name.localeCompare(b.category.name)
              const nameComparison = a.name.localeCompare(b.name)
              return categoryComparison === 0 ? nameComparison : categoryComparison
            })}
            renderInput={(parameters) => <TextField {...parameters} label={t('rank')} variant={'outlined'} />}
            sx={{ width: '100%' }}
            value={props.militaryFormStore.getRank()}
          />
          <Autocomplete
            getOptionLabel={getOptionLabelForUnits}
            onChange={handleUnitChange}
            options={props.units}
            renderInput={(parameters) => <TextField {...parameters} label={t('unit')} variant={'outlined'} />}
            sx={{ width: '100%' }}
            value={props.militaryFormStore.getUnit()}
          />
        </ColumnWrapper>
      </RowWrapper>
    </>
  )
})
