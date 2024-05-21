import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { WeaponCategory } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { WeaponTypeCollectionStore } from '../WeaponTypeCollection/WeaponTypeCollection.store.ts'
import { WeaponTypeFilterStore } from './WeaponTypeFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type WeaponTypeFilterProps = {
  loadingStore: LoadingStore
  weaponTypeCollectionStore: WeaponTypeCollectionStore
  weaponTypeFilterStore: WeaponTypeFilterStore
}

export const WeaponTypeFilter = observer((props: WeaponTypeFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [categories, setCategories] = useState<WeaponCategory[]>([])

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('category'), value: 'category.name' },
  ]

  // Fetch data
  const { weaponCategoryService, weaponTypeService } = useServices()

  const fetchWeaponTypes = useCallback(async () => {
    const weaponTypesData = await weaponTypeService.getWeaponTypes({
      filter: props.weaponTypeFilterStore.getFilter(),
      pagination: props.weaponTypeCollectionStore.getPagination(),
      sorts: props.weaponTypeFilterStore.getSorts(),
    })
    props.weaponTypeCollectionStore.setWeaponTypes(weaponTypesData)
  }, [props.weaponTypeCollectionStore.getPage(), props.weaponTypeCollectionStore.getPageSize()])

  const fetchWeaponTypeCount = useCallback(async () => {
    const weaponTypeCountData = await weaponTypeService.getWeaponTypeCount({
      filter: props.weaponTypeFilterStore.getFilter(),
    })
    props.weaponTypeCollectionStore.setWeaponTypeCount(weaponTypeCountData)
  }, [props.weaponTypeCollectionStore.getPage(), props.weaponTypeCollectionStore.getPageSize()])
  const fetchWeaponCategories = useCallback(async () => {
    const typesData = await weaponCategoryService.getWeaponCategories({
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
      await fetchWeaponTypes()
      await fetchWeaponTypeCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchWeaponTypeCount, fetchWeaponTypes])
  useEffect(() => {
    fetchWeaponCategories()
  }, [fetchWeaponCategories])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.weaponTypeFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCategoryChange = (_event: SyntheticEvent, value: WeaponCategory | null) => props.weaponTypeFilterStore.setCategory(value?.name ?? null)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.weaponTypeFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.weaponTypeFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForCategories = (categoryOption: WeaponCategory) => categoryOption?.name || '—'
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchWeaponTypes()
      await fetchWeaponTypeCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/weapons/types/new')

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
        disabled={props.weaponTypeFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.weaponTypeFilterStore.getSortField() ? props.weaponTypeFilterStore.getSortAsc() : null}
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
