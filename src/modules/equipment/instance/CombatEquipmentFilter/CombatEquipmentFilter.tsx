import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CombatEquipmentType } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { CombatEquipmentCollectionStore } from '../CombatEquipmentCollection/CombatEquipmentCollection.store.ts'
import { CombatEquipmentFilterStore } from './CombatEquipmentFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type CombatEquipmentFilterProps = {
  combatEquipmentCollectionStore: CombatEquipmentCollectionStore
  combatEquipmentFilterStore: CombatEquipmentFilterStore
  loadingStore: LoadingStore
}

export const CombatEquipmentFilter = observer((props: CombatEquipmentFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [types, setTypes] = useState<CombatEquipmentType[]>([])

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('serialNumber'), value: 'serialNumber' },
    { label: t('type'), value: 'type.name' },
    { label: t('category'), value: 'type.category.name' },
    { label: t('unit'), value: 'unit.name' },
  ]

  // Fetch data
  const { combatEquipmentService, combatEquipmentTypeService } = useServices()

  const fetchCombatEquipments = useCallback(async () => {
    const combatEquipmentsData = await combatEquipmentService.getCombatEquipments({
      filter: props.combatEquipmentFilterStore.getFilter(),
      pagination: props.combatEquipmentCollectionStore.getPagination(),
      sorts: props.combatEquipmentFilterStore.getSorts(),
    })
    props.combatEquipmentCollectionStore.setCombatEquipments(combatEquipmentsData)
  }, [props.combatEquipmentCollectionStore.getPage(), props.combatEquipmentCollectionStore.getPageSize()])

  const fetchCombatEquipmentCount = useCallback(async () => {
    const combatEquipmentCountData = await combatEquipmentService.getCombatEquipmentCount({
      filter: props.combatEquipmentFilterStore.getFilter(),
    })
    props.combatEquipmentCollectionStore.setCombatEquipmentCount(combatEquipmentCountData)
  }, [props.combatEquipmentCollectionStore.getPage(), props.combatEquipmentCollectionStore.getPageSize()])
  const fetchTypes = useCallback(async () => {
    const typesData = await combatEquipmentTypeService.getCombatEquipmentTypes({})
    setTypes(typesData)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetchCombatEquipments()
      await fetchCombatEquipmentCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchCombatEquipmentCount, fetchCombatEquipments])
  useEffect(() => {
    fetchTypes()
  }, [fetchTypes])

  // Handlers
  const handleTypeChange = (_event: SyntheticEvent, value: CombatEquipmentType | null) =>
    props.combatEquipmentFilterStore.setType(value?.name ?? null)
  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.combatEquipmentFilterStore.setUnit(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) =>
    props.combatEquipmentFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.combatEquipmentFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForTypes = (typeOption: CombatEquipmentType) => typeOption?.name || '—'
  const groupByForTypes = (typeOption: CombatEquipmentType) => typeOption?.category?.name.trim() || '—'
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchCombatEquipments()
      await fetchCombatEquipmentCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/equipments/instances/new')

  return (
    <InlineWrapper>
      <Autocomplete
        getOptionLabel={getOptionLabelForTypes}
        groupBy={groupByForTypes}
        onChange={handleTypeChange}
        options={types.sort((a, b) => {
          const categoryComparison = a.category.name.localeCompare(b.category.name)
          const nameComparison = a.name.localeCompare(b.name)
          return categoryComparison === 0 ? nameComparison : categoryComparison
        })}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('type')} variant={'outlined'} />}
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
        disabled={props.combatEquipmentFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.combatEquipmentFilterStore.getSortField() ? props.combatEquipmentFilterStore.getSortAsc() : null}
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
