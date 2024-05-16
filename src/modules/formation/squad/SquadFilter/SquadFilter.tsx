import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { SquadCollectionStore } from '../SquadCollection/SquadCollection.store.ts'
import { SquadFilterStore } from './SquadFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type SquadFilterProps = {
  loadingStore: LoadingStore
  squadCollectionStore: SquadCollectionStore
  squadFilterStore: SquadFilterStore
}

export const SquadFilter = observer((props: SquadFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('commanderMbn'), value: 'commander.mbn' },
    { label: t('platoon'), value: 'platoon.name' },
  ]

  // Fetch data
  const { squadService } = useServices()

  const fetchSquads = useCallback(async () => {
    const squadsData = await squadService.getSquads({
      filter: props.squadFilterStore.getFilter(),
      pagination: props.squadCollectionStore.getPagination(),
      sorts: props.squadFilterStore.getSorts(),
    })
    props.squadCollectionStore.setSquads(squadsData)
  }, [props.squadCollectionStore.getPage(), props.squadCollectionStore.getPageSize()])

  const fetchSquadCount = useCallback(async () => {
    const squadCountData = await squadService.getSquadCount({
      filter: props.squadFilterStore.getFilter(),
    })
    props.squadCollectionStore.setSquadCount(squadCountData)
  }, [props.squadCollectionStore.getPage(), props.squadCollectionStore.getPageSize()])

  useEffect(() => {
    const fetchData = async () => {
      await fetchSquads()
      await fetchSquadCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchSquadCount, fetchSquads])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.squadFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCommanderChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.squadFilterStore.setCommander(event.target.value === '' ? null : event.target.value)
  const handlePlatoonChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.squadFilterStore.setPlatoon(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.squadFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) => props.squadFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchSquads()
      await fetchSquadCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/formations/squads/new')

  return (
    <InlineWrapper>
      <TextField label={t('name')} onChange={handleNameChange} variant={'outlined'} />
      <TextField label={t('commander')} onChange={handleCommanderChange} variant={'outlined'} />
      <TextField label={t('platoon')} onChange={handlePlatoonChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForSorts}
        onChange={handleSortFieldChange}
        options={sortFields}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('sorting')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <ToggleButtonGroup
        disabled={props.squadFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.squadFilterStore.getSortField() ? props.squadFilterStore.getSortAsc() : null}
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
