import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { WeaponType } from '../../../../models/graphql/schema.ts'
import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { WeaponCollectionStore } from '../WeaponCollection/WeaponCollection.store.ts'
import { WeaponFilterStore } from './WeaponFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type WeaponFilterProps = {
  loadingStore: LoadingStore
  weaponCollectionStore: WeaponCollectionStore
  weaponFilterStore: WeaponFilterStore
}

export const WeaponFilter = observer((props: WeaponFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [types, setTypes] = useState<WeaponType[]>([])

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('serialNumber'), value: 'serialNumber' },
    { label: t('type'), value: 'type.name' },
    { label: t('category'), value: 'type.category.name' },
    { label: t('unit'), value: 'unit.name' },
  ]

  // Fetch data
  const { weaponService, weaponTypeService } = useServices()

  const fetchWeapons = useCallback(async () => {
    const weaponsData = await weaponService.getWeapons({
      filter: props.weaponFilterStore.getFilter(),
      pagination: props.weaponCollectionStore.getPagination(),
      sorts: props.weaponFilterStore.getSorts(),
    })
    props.weaponCollectionStore.setWeapons(weaponsData)
  }, [props.weaponCollectionStore.getPage(), props.weaponCollectionStore.getPageSize()])

  const fetchWeaponCount = useCallback(async () => {
    const weaponCountData = await weaponService.getWeaponCount({
      filter: props.weaponFilterStore.getFilter(),
    })
    props.weaponCollectionStore.setWeaponCount(weaponCountData)
  }, [props.weaponCollectionStore.getPage(), props.weaponCollectionStore.getPageSize()])
  const fetchTypes = useCallback(async () => {
    const typesData = await weaponTypeService.getWeaponTypes({})
    setTypes(typesData)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeapons()
      await fetchWeaponCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchWeaponCount, fetchWeapons])
  useEffect(() => {
    fetchTypes()
  }, [fetchTypes])

  // Handlers
  const handleTypeChange = (_event: SyntheticEvent, value: WeaponType | null) => props.weaponFilterStore.setType(value?.name ?? null)
  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.weaponFilterStore.setUnit(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.weaponFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.weaponFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForTypes = (typeOption: WeaponType) => typeOption?.name || '—'
  const groupByForTypes = (typeOption: WeaponType) => typeOption?.category?.name.trim() || '—'
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchWeapons()
      await fetchWeaponCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/weapons/instances/new')

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
        disabled={props.weaponFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.weaponFilterStore.getSortField() ? props.weaponFilterStore.getSortAsc() : null}
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
