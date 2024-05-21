import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { DivisionCollectionStore } from '../DivisionCollection/DivisionCollection.store.ts'
import { DivisionFilterStore } from './DivisionFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type DivisionFilterProps = {
  divisionCollectionStore: DivisionCollectionStore
  divisionFilterStore: DivisionFilterStore
  loadingStore: LoadingStore
}

export const DivisionFilter = observer((props: DivisionFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('commanderMbn'), value: 'commander.mbn' },
    { label: t('address'), value: 'address' },
  ]

  // Fetch data
  const { divisionService } = useServices()

  const fetchDivisions = useCallback(async () => {
    const divisionsData = await divisionService.getDivisions({
      filter: props.divisionFilterStore.getFilter(),
      pagination: props.divisionCollectionStore.getPagination(),
      sorts: props.divisionFilterStore.getSorts(),
    })
    props.divisionCollectionStore.setDivisions(divisionsData)
  }, [props.divisionCollectionStore.getPage(), props.divisionCollectionStore.getPageSize()])

  const fetchDivisionCount = useCallback(async () => {
    const divisionCountData = await divisionService.getDivisionCount({
      filter: props.divisionFilterStore.getFilter(),
    })
    props.divisionCollectionStore.setDivisionCount(divisionCountData)
  }, [props.divisionCollectionStore.getPage(), props.divisionCollectionStore.getPageSize()])

  useEffect(() => {
    const fetchData = async () => {
      await fetchDivisions()
      await fetchDivisionCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchDivisionCount, fetchDivisions])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.divisionFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCommanderChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.divisionFilterStore.setCommander(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.divisionFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.divisionFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchDivisions()
      await fetchDivisionCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/formations/divisions/new')

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
        disabled={props.divisionFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.divisionFilterStore.getSortField() ? props.divisionFilterStore.getSortAsc() : null}
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
