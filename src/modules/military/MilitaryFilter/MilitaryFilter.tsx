import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Rank } from '../../../models/graphql/schema.ts'
import { useServices } from '../../../services/useServices.ts'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../styles/ts/containers.ts'
import { MilitaryCollectionStore } from '../MilitaryCollection/MilitaryCollection.store.ts'
import { MilitaryFilterStore } from './MilitaryFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type MilitaryFilterProps = {
  loadingStore: LoadingStore
  militaryCollectionStore: MilitaryCollectionStore
  militaryFilterStore: MilitaryFilterStore
}

export const MilitaryFilter = observer((props: MilitaryFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { militaryService, rankService } = useServices()
  const [ranks, setRanks] = useState<Rank[]>([])

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('mbn'), value: 'mbn' },
    { label: t('lastName'), value: 'lastName' },
    { label: t('firstName'), value: 'firstName' },
    { label: t('middleName'), value: 'middleName' },
    { label: t('birthDate'), value: 'birthDate' },
    { label: t('rank'), value: 'rank.level' },
    { label: t('unit'), value: 'unit.name' },
  ]

  // Fetch data
  const fetchMilitaries = useCallback(async () => {
    const militariesData = await militaryService.getMilitaries({
      filter: props.militaryFilterStore.getFilter(),
      pagination: props.militaryCollectionStore.getPagination(),
      sorts: props.militaryFilterStore.getSorts(),
    })
    props.militaryCollectionStore.setMilitaries(militariesData)
  }, [props.militaryCollectionStore.getPage(), props.militaryCollectionStore.getPageSize()])
  const fetchMilitaryCount = useCallback(async () => {
    const militaryCountData = await militaryService.getMilitaryCount({
      filter: props.militaryFilterStore.getFilter(),
    })
    props.militaryCollectionStore.setMilitaryCount(militaryCountData)
  }, [props.militaryCollectionStore.getPage(), props.militaryCollectionStore.getPageSize()])
  const fetchRanks = useCallback(async () => {
    const ranksData = await rankService.getRanks()
    setRanks(ranksData)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetchMilitaries()
      await fetchMilitaryCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchMilitaries, fetchMilitaryCount])
  useEffect(() => {
    fetchRanks()
  }, [fetchRanks])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.militaryFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleRankChange = (_event: SyntheticEvent, value: Rank | null) => props.militaryFilterStore.setRank(value?.name ?? null)
  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.militaryFilterStore.setUnit(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.militaryFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.militaryFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForRanks = (rankOption: Rank) => rankOption?.name || '—'
  const groupByForRanks = (rankOption: Rank) => rankOption?.category?.name || '—'
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchMilitaries()
      await fetchMilitaryCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/militaries/new')

  return (
    <InlineWrapper>
      <TextField label={t('personName')} onChange={handleNameChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForRanks}
        groupBy={groupByForRanks}
        onChange={handleRankChange}
        options={ranks.sort((a, b) => {
          const categoryComparison = a.category.name.localeCompare(b.category.name)
          const nameComparison = a.name.localeCompare(b.name)
          return categoryComparison === 0 ? nameComparison : categoryComparison
        })}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('rank')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <TextField label={t('unit')} onChange={handleUnitChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForSorts}
        onChange={handleSortFieldChange}
        options={sortFields}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('sorting')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <ToggleButtonGroup
        disabled={props.militaryFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.militaryFilterStore.getSortField() ? props.militaryFilterStore.getSortAsc() : null}
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
