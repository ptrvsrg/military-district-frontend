import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { CorpsCollectionStore } from '../CorpsCollection/CorpsCollection.store.ts'
import { CorpsFilterStore } from './CorpsFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type CorpsFilterProps = {
  corpsCollectionStore: CorpsCollectionStore
  corpsFilterStore: CorpsFilterStore
  loadingStore: LoadingStore
}

export const CorpsFilter = observer((props: CorpsFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('commanderMbn'), value: 'commander.mbn' },
  ]

  // Fetch data
  const { corpsService } = useServices()

  const fetchCorps = useCallback(async () => {
    const corpsData = await corpsService.getCorps({
      filter: props.corpsFilterStore.getFilter(),
      pagination: props.corpsCollectionStore.getPagination(),
      sorts: props.corpsFilterStore.getSorts(),
    })
    props.corpsCollectionStore.setCorps(corpsData)
  }, [props.corpsCollectionStore.getPage(), props.corpsCollectionStore.getPageSize()])

  const fetchCorpsCount = useCallback(async () => {
    const corpsCountData = await corpsService.getCorpsCount({
      filter: props.corpsFilterStore.getFilter(),
    })
    props.corpsCollectionStore.setCorpsCount(corpsCountData)
  }, [props.corpsCollectionStore.getPage(), props.corpsCollectionStore.getPageSize()])

  useEffect(() => {
    const fetchData = async () => {
      await fetchCorps()
      await fetchCorpsCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchCorps, fetchCorpsCount])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.corpsFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCommanderChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.corpsFilterStore.setCommander(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.corpsFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) => props.corpsFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchCorps()
      await fetchCorpsCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/formations/corps/new')

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
        disabled={props.corpsFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.corpsFilterStore.getSortField() ? props.corpsFilterStore.getSortAsc() : null}
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
