import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { PlatoonCollectionStore } from '../PlatoonCollection/PlatoonCollection.store.ts'
import { PlatoonFilterStore } from './PlatoonFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type PlatoonFilterProps = {
  loadingStore: LoadingStore
  platoonCollectionStore: PlatoonCollectionStore
  platoonFilterStore: PlatoonFilterStore
}

export const PlatoonFilter = observer((props: PlatoonFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('commanderMbn'), value: 'commander.mbn' },
    { label: t('company'), value: 'company.name' },
  ]

  // Fetch data
  const { platoonService } = useServices()

  const fetchPlatoons = useCallback(async () => {
    const platoonsData = await platoonService.getPlatoons({
      filter: props.platoonFilterStore.getFilter(),
      pagination: props.platoonCollectionStore.getPagination(),
      sorts: props.platoonFilterStore.getSorts(),
    })
    props.platoonCollectionStore.setPlatoons(platoonsData)
  }, [props.platoonCollectionStore.getPage(), props.platoonCollectionStore.getPageSize()])

  const fetchPlatoonCount = useCallback(async () => {
    const platoonCountData = await platoonService.getPlatoonCount({
      filter: props.platoonFilterStore.getFilter(),
    })
    props.platoonCollectionStore.setPlatoonCount(platoonCountData)
  }, [props.platoonCollectionStore.getPage(), props.platoonCollectionStore.getPageSize()])

  useEffect(() => {
    const fetchData = async () => {
      await fetchPlatoons()
      await fetchPlatoonCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchPlatoonCount, fetchPlatoons])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.platoonFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCommanderChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.platoonFilterStore.setCommander(event.target.value === '' ? null : event.target.value)
  const handleCompanyChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.platoonFilterStore.setCompany(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.platoonFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.platoonFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchPlatoons()
      await fetchPlatoonCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/formations/platoons/new')

  return (
    <InlineWrapper>
      <TextField label={t('name')} onChange={handleNameChange} variant={'outlined'} />
      <TextField label={t('commander')} onChange={handleCommanderChange} variant={'outlined'} />
      <TextField label={t('company')} onChange={handleCompanyChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForSorts}
        onChange={handleSortFieldChange}
        options={sortFields}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('sorting')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <ToggleButtonGroup
        disabled={props.platoonFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.platoonFilterStore.getSortField() ? props.platoonFilterStore.getSortAsc() : null}
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
