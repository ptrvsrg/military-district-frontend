import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CombatEquipmentCategory } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { CombatEquipmentTypeCollectionStore } from '../CombatEquipmentTypeCollection/CombatEquipmentTypeCollection.store.ts'
import { CombatEquipmentTypeFilterStore } from './CombatEquipmentTypeFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type CombatEquipmentTypeFilterProps = {
  combatEquipmentTypeCollectionStore: CombatEquipmentTypeCollectionStore
  combatEquipmentTypeFilterStore: CombatEquipmentTypeFilterStore
  loadingStore: LoadingStore
}

export const CombatEquipmentTypeFilter = observer((props: CombatEquipmentTypeFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [categories, setCategories] = useState<CombatEquipmentCategory[]>([])

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('category'), value: 'category.name' },
  ]

  // Fetch data
  const { combatEquipmentCategoryService, combatEquipmentTypeService } = useServices()

  const fetchCombatEquipmentTypes = useCallback(async () => {
    const combatEquipmentTypesData = await combatEquipmentTypeService.getCombatEquipmentTypes({
      filter: props.combatEquipmentTypeFilterStore.getFilter(),
      pagination: props.combatEquipmentTypeCollectionStore.getPagination(),
      sorts: props.combatEquipmentTypeFilterStore.getSorts(),
    })
    props.combatEquipmentTypeCollectionStore.setCombatEquipmentTypes(combatEquipmentTypesData)
  }, [props.combatEquipmentTypeCollectionStore.getPage(), props.combatEquipmentTypeCollectionStore.getPageSize()])

  const fetchCombatEquipmentTypeCount = useCallback(async () => {
    const combatEquipmentTypeCountData = await combatEquipmentTypeService.getCombatEquipmentTypeCount({
      filter: props.combatEquipmentTypeFilterStore.getFilter(),
    })
    props.combatEquipmentTypeCollectionStore.setCombatEquipmentTypeCount(combatEquipmentTypeCountData)
  }, [props.combatEquipmentTypeCollectionStore.getPage(), props.combatEquipmentTypeCollectionStore.getPageSize()])
  const fetchCombatEquipmentCategories = useCallback(async () => {
    const typesData = await combatEquipmentCategoryService.getCombatEquipmentCategories({
      sorts: [
        {
          field: 'name',
          sortAsc: true,
        },
      ],
    })
    setCategories(typesData)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetchCombatEquipmentTypes()
      await fetchCombatEquipmentTypeCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchCombatEquipmentTypeCount, fetchCombatEquipmentTypes])
  useEffect(() => {
    fetchCombatEquipmentCategories()
  }, [fetchCombatEquipmentCategories])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.combatEquipmentTypeFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCategoryChange = (_event: SyntheticEvent, value: CombatEquipmentCategory | null) =>
    props.combatEquipmentTypeFilterStore.setCategory(value?.name ?? null)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) =>
    props.combatEquipmentTypeFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.combatEquipmentTypeFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForCategories = (categoryOption: CombatEquipmentCategory) => categoryOption?.name || '—'
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchCombatEquipmentTypes()
      await fetchCombatEquipmentTypeCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/equipments/types/new')

  return (
    <InlineWrapper>
      <Autocomplete
        getOptionLabel={getOptionLabelForCategories}
        onChange={handleCategoryChange}
        options={categories}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('category')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <TextField label={t('name')} onChange={handleNameChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForSorts}
        onChange={handleSortFieldChange}
        options={sortFields}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('sorting')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <ToggleButtonGroup
        disabled={props.combatEquipmentTypeFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.combatEquipmentTypeFilterStore.getSortField() ? props.combatEquipmentTypeFilterStore.getSortAsc() : null}
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
