import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useServices } from '../../../services/useServices.ts'
import { LoadingStore } from '../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../styles/ts/containers.ts'
import { BuildingCollectionStore } from '../BuildingCollection/BuildingCollection.store.ts'
import { BuildingFilterStore } from './BuildingFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type BuildingFilterProps = {
  buildingCollectionStore: BuildingCollectionStore
  buildingFilterStore: BuildingFilterStore
  loadingStore: LoadingStore
}

export const BuildingFilter = observer((props: BuildingFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('address'), value: 'address' },
    { label: t('name'), value: 'name' },
    { label: t('unit'), value: 'unit.name' },
  ]

  // Fetch data
  const { buildingService } = useServices()

  const fetchBuildings = useCallback(async () => {
    const buildingsData = await buildingService.getBuildings({
      filter: props.buildingFilterStore.getFilter(),
      pagination: props.buildingCollectionStore.getPagination(),
      sorts: props.buildingFilterStore.getSorts(),
    })
    props.buildingCollectionStore.setBuildings(buildingsData)
  }, [props.buildingCollectionStore.getPage(), props.buildingCollectionStore.getPageSize()])

  const fetchBuildingCount = useCallback(async () => {
    const buildingCountData = await buildingService.getBuildingCount({
      filter: props.buildingFilterStore.getFilter(),
    })
    props.buildingCollectionStore.setBuildingCount(buildingCountData)
  }, [props.buildingCollectionStore.getPage(), props.buildingCollectionStore.getPageSize()])

  useEffect(() => {
    const fetchData = async () => {
      await fetchBuildings()
      await fetchBuildingCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchBuildingCount, fetchBuildings])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.buildingFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.buildingFilterStore.setUnit(event.target.value === '' ? null : event.target.value)
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.buildingFilterStore.setAddress(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.buildingFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.buildingFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchBuildings()
      await fetchBuildingCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/buildings/new')

  return (
    <InlineWrapper>
      <TextField label={t('name')} onChange={handleNameChange} variant={'outlined'} />
      <TextField label={t('unit')} onChange={handleUnitChange} variant={'outlined'} />
      <TextField label={t('address')} onChange={handleAddressChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForSorts}
        onChange={handleSortFieldChange}
        options={sortFields}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('sorting')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <ToggleButtonGroup
        disabled={props.buildingFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.buildingFilterStore.getSortField() ? props.buildingFilterStore.getSortAsc() : null}
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
