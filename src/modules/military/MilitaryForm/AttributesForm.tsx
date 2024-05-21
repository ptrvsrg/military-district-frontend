import { DeleteForeverOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, ReactNode, SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Column, Table } from '../../../components/table/Table.tsx'
import { Rank } from '../../../models/graphql/schema.ts'
import { InlineWrapper, RowWrapper } from '../../../styles/ts/containers.ts'
import { MilitaryFormStore } from './MilitaryForm.store.ts'

type AttributesFormProps = {
  militaryFormStore: MilitaryFormStore
  ranks: Rank[]
}

export const AttributesForm = observer((props: AttributesFormProps) => {
  const { t } = useTranslation()
  const [attributeRank, setAttributeRank] = useState<Rank | undefined>()
  const [attributeName, setAttributeName] = useState('')
  const [attributeValue, setAttributeValue] = useState('')

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('rank').toUpperCase()}</b> },
    { label: <b>{t('name').toUpperCase()}</b> },
    { label: <b>{t('value').toUpperCase()}</b> },
    { label: <></> },
  ]
  const tableData: ReactNode[][] =
    props.militaryFormStore.getAttributes().map((attribute) => {
      return [
        <p>{attribute?.rank || '—'}</p>,
        <p>{attribute?.name || '—'}</p>,
        <p>{attribute?.value || '—'}</p>,
        <IconButton onClick={() => props.militaryFormStore.deleteAttribute(attribute?.rank ?? '', attribute?.name ?? '')}>
          <DeleteForeverOutlined sx={{ color: 'white' }} />
        </IconButton>,
      ]
    }) ?? []

  // Handlers
  const handleAttributeRankChange = (_event: SyntheticEvent, value: Rank | null) => setAttributeRank(value ?? undefined)
  const handleAttributeNameChange = (event: ChangeEvent<HTMLInputElement>) => setAttributeName(event.target.value)
  const handleAttributeValueChange = (event: ChangeEvent<HTMLInputElement>) => setAttributeValue(event.target.value)
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getOptionLabelForRanks = (rankOption: Rank) => rankOption?.name || '—'
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const groupByForRanks = (rankOption: Rank) => rankOption?.category?.name || '—'
  const addAttribute = () => props.militaryFormStore.addAttribute(attributeRank, attributeName, attributeValue)

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('attributes')}
      </Typography>
      <InlineWrapper>
        <Autocomplete
          getOptionLabel={getOptionLabelForRanks}
          groupBy={groupByForRanks}
          onChange={handleAttributeRankChange}
          options={props.ranks.sort((a, b) => {
            const categoryComparison = a.category.name.localeCompare(b.category.name)
            const nameComparison = a.name.localeCompare(b.name)
            return categoryComparison === 0 ? nameComparison : categoryComparison
          })}
          renderInput={(parameters) => <TextField {...parameters} label={t('rank')} variant={'outlined'} />}
          sx={{ width: 230 }}
          value={attributeRank}
        />
        <TextField label={t('name')} onChange={handleAttributeNameChange} value={attributeName} variant={'outlined'} />
        <TextField label={t('value')} onChange={handleAttributeValueChange} value={attributeValue} variant={'outlined'} />
        <Button onClick={addAttribute} style={{ height: 56 }} variant="contained">
          {t('add')}
        </Button>
      </InlineWrapper>
      <RowWrapper>{props.militaryFormStore.getAttributes().length > 0 && <Table columns={tableColumns} data={tableData} />}</RowWrapper>
    </>
  )
})
