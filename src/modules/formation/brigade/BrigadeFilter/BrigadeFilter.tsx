import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { BrigadeCollectionStore } from '../BrigadeCollection/BrigadeCollection.store.ts'
import { BrigadeFilterStore } from './BrigadeFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type BrigadeFilterProps = {
  brigadeCollectionStore: BrigadeCollectionStore
  brigadeFilterStore: BrigadeFilterStore
  loadingStore: LoadingStore
}

export const BrigadeFilter = observer((props: BrigadeFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('commanderMbn'), value: 'commander.mbn' },
  ]

  // Fetch data
  const { brigadeService } = useServices()

  const fetchBrigades = useCallback(async () => {
    const brigadesData = await brigadeService.getBrigades({
      filter: props.brigadeFilterStore.getFilter(),
      pagination: props.brigadeCollectionStore.getPagination(),
      sorts: props.brigadeFilterStore.getSorts(),
    })
    props.brigadeCollectionStore.setBrigades(brigadesData)
  }, [props.brigadeCollectionStore.getPage(), props.brigadeCollectionStore.getPageSize()])

  const fetchBrigadeCount = useCallback(async () => {
    const brigadeCountData = await brigadeService.getBrigadeCount({
      filter: props.brigadeFilterStore.getFilter(),
    })
    props.brigadeCollectionStore.setBrigadeCount(brigadeCountData)
  }, [props.brigadeCollectionStore.getPage(), props.brigadeCollectionStore.getPageSize()])

  useEffect(() => {
    const fetchData = async () => {
      await fetchBrigades()
      await fetchBrigadeCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchBrigadeCount, fetchBrigades])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.brigadeFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCommanderChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.brigadeFilterStore.setCommander(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.brigadeFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.brigadeFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchBrigades()
      await fetchBrigadeCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/formations/brigades/new')

  return (
    <InlineWrapper>
      <TextField label={t('name')} onChange={handleNameChange} variant={'outlined'} />
      <TextField label={t('commander')} onChange={handleCommanderChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForSorts}
        onChange={handleSortFieldChange}
        options={sortFields}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('sorting')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <ToggleButtonGroup
        disabled={props.brigadeFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.brigadeFilterStore.getSortField() ? props.brigadeFilterStore.getSortAsc() : null}
      >
        <ToggleButton value={true}>
          <ArrowUpwardOutlined />
        </ToggleButton>
        <ToggleButton value={false}>
          <ArrowDownwardOutlined />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button disabled={props.loadingStore.getLoading()} onClick={handleApplyClick} style={{ height: 56 }} variant="contained">
        {t('apply')}
      </Button>
      <Button onClick={handleCreateClick} style={{ height: 56 }} variant="contained">
        {t('create')}
      </Button>
    </InlineWrapper>
  )
})
