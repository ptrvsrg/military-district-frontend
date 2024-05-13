import { DeleteForeverOutlined } from '@mui/icons-material'
import { Button, TextField, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Column, Table } from '../../../components/table/Table.tsx'
import { InlineWrapper, RowWrapper } from '../../../styles/ts/containers.ts'
import { BuildingFormStore } from './BuildingForm.store.ts'

type AttributesFormProps = {
  buildingFormStore: BuildingFormStore
}

export const AttributesForm = observer((props: AttributesFormProps) => {
  const { t } = useTranslation()
  const [attributeName, setAttributeName] = useState('')
  const [attributeValue, setAttributeValue] = useState('')

  // Table
  const tableColumns: Column[] = [{ label: <b>{t('name').toUpperCase()}</b> }, { label: <b>{t('value').toUpperCase()}</b> }, { label: <></> }]
  const tableData: ReactNode[][] =
    props.buildingFormStore.getAttributes().map((attribute) => {
      return [
        <p>{attribute?.name || '—'}</p>,
        <p>{attribute?.value || '—'}</p>,
        <IconButton onClick={() => props.buildingFormStore.deleteAttribute(attribute?.name ?? '')}>
          <DeleteForeverOutlined sx={{ color: 'white' }} />
        </IconButton>,
      ]
    }) ?? []

  // Handlers
  const handleAttributeNameChange = (event: ChangeEvent<HTMLInputElement>) => setAttributeName(event.target.value)
  const handleAttributeValueChange = (event: ChangeEvent<HTMLInputElement>) => setAttributeValue(event.target.value)
  const addAttribute = () => props.buildingFormStore.addAttribute(attributeName, attributeValue)

  return (
    <>
      <Typography align={'center'} color={'white'} sx={{ textDecoration: 'underline' }} variant={'h5'}>
        {t('attributes')}
      </Typography>
      <InlineWrapper>
        <TextField label={t('name')} onChange={handleAttributeNameChange} value={attributeName} variant={'outlined'} />
        <TextField label={t('value')} onChange={handleAttributeValueChange} value={attributeValue} variant={'outlined'} />
        <Button onClick={addAttribute} style={{ height: 56 }} variant="contained">
          {t('add')}
        </Button>
      </InlineWrapper>
      <RowWrapper>{props.buildingFormStore.getAttributes().length > 0 && <Table columns={tableColumns} data={tableData} />}</RowWrapper>
    </>
  )
})
