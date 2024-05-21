import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { UnitCollectionStore } from '../UnitCollection/UnitCollection.store.ts'
import { UnitFilterStore } from './UnitFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type UnitFilterProps = {
  loadingStore: LoadingStore
  unitCollectionStore: UnitCollectionStore
  unitFilterStore: UnitFilterStore
}

export const UnitFilter = observer((props: UnitFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('commanderMbn'), value: 'commander.mbn' },
    { label: t('address'), value: 'address' },
  ]

  // Fetch data
  const { unitService } = useServices()

  const fetchUnits = useCallback(async () => {
    const unitsData = await unitService.getUnits({
      filter: props.unitFilterStore.getFilter(),
      pagination: props.unitCollectionStore.getPagination(),
      sorts: props.unitFilterStore.getSorts(),
    })
    props.unitCollectionStore.setUnits(unitsData)
  }, [props.unitCollectionStore.getPage(), props.unitCollectionStore.getPageSize()])

  const fetchUnitCount = useCallback(async () => {
    const unitCountData = await unitService.getUnitCount({
      filter: props.unitFilterStore.getFilter(),
    })
    props.unitCollectionStore.setUnitCount(unitCountData)
  }, [props.unitCollectionStore.getPage(), props.unitCollectionStore.getPageSize()])

  useEffect(() => {
    const fetchData = async () => {
      await fetchUnits()
      await fetchUnitCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchUnitCount, fetchUnits])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.unitFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCommanderChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.unitFilterStore.setCommander(event.target.value === '' ? null : event.target.value)
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.unitFilterStore.setAddress(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.unitFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) => props.unitFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchUnits()
      await fetchUnitCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/formations/units/new')

  return (
    <InlineWrapper>
      <TextField label={t('name')} onChange={handleNameChange} variant={'outlined'} />
      <TextField label={t('commander')} onChange={handleCommanderChange} variant={'outlined'} />
      <TextField label={t('address')} onChange={handleAddressChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForSorts}
        onChange={handleSortFieldChange}
        options={sortFields}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('sorting')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <ToggleButtonGroup
        disabled={props.unitFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.unitFilterStore.getSortField() ? props.unitFilterStore.getSortAsc() : null}
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
