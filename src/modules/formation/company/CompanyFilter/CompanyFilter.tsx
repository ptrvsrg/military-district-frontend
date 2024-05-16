import { ArrowDownwardOutlined, ArrowUpwardOutlined } from '@mui/icons-material'
import { Autocomplete, Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useServices } from '../../../../services/useServices.ts'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { InlineWrapper } from '../../../../styles/ts/containers.ts'
import { CompanyCollectionStore } from '../CompanyCollection/CompanyCollection.store.ts'
import { CompanyFilterStore } from './CompanyFilter.store.ts'

type SortOption = {
  label: string
  value: string
}

type CompanyFilterProps = {
  companyCollectionStore: CompanyCollectionStore
  companyFilterStore: CompanyFilterStore
  loadingStore: LoadingStore
}

export const CompanyFilter = observer((props: CompanyFilterProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Sorts
  const sortFields: SortOption[] = [
    { label: t('name'), value: 'name' },
    { label: t('commanderMbn'), value: 'commander.mbn' },
    { label: t('unit'), value: 'unit.name' },
  ]

  // Fetch data
  const { companyService } = useServices()

  const fetchCompanies = useCallback(async () => {
    const companiesData = await companyService.getCompanies({
      filter: props.companyFilterStore.getFilter(),
      pagination: props.companyCollectionStore.getPagination(),
      sorts: props.companyFilterStore.getSorts(),
    })
    props.companyCollectionStore.setCompanies(companiesData)
  }, [props.companyCollectionStore.getPage(), props.companyCollectionStore.getPageSize()])

  const fetchCompanyCount = useCallback(async () => {
    const companyCountData = await companyService.getCompanyCount({
      filter: props.companyFilterStore.getFilter(),
    })
    props.companyCollectionStore.setCompanyCount(companyCountData)
  }, [props.companyCollectionStore.getPage(), props.companyCollectionStore.getPageSize()])

  useEffect(() => {
    const fetchData = async () => {
      await fetchCompanies()
      await fetchCompanyCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }, [fetchCompanies, fetchCompanyCount])

  // Handlers
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.companyFilterStore.setName(event.target.value === '' ? null : event.target.value)
  const handleCommanderChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.companyFilterStore.setCommander(event.target.value === '' ? null : event.target.value)
  const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.companyFilterStore.setUnit(event.target.value === '' ? null : event.target.value)
  const handleSortFieldChange = (_event: SyntheticEvent, value: SortOption | null) => props.companyFilterStore.setSortField(value?.value ?? null)
  // @ts-ignore
  const handleSortAscChange = (_event: MouseEvent<HTMLElement, MouseEvent>, value: boolean | null) =>
    props.companyFilterStore.setSortAsc(value ?? null)
  const getOptionLabelForSorts = (sortOption: SortOption) => sortOption?.label || '—'
  const handleApplyClick = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fetchData = async () => {
      await fetchCompanies()
      await fetchCompanyCount()
    }
    props.loadingStore.setLoading(true)
    fetchData().finally(() => props.loadingStore.setLoading(false))
  }
  const handleCreateClick = () => navigate('/formations/companies/new')

  return (
    <InlineWrapper>
      <TextField label={t('name')} onChange={handleNameChange} variant={'outlined'} />
      <TextField label={t('commander')} onChange={handleCommanderChange} variant={'outlined'} />
      <TextField label={t('unit')} onChange={handleUnitChange} variant={'outlined'} />
      <Autocomplete
        getOptionLabel={getOptionLabelForSorts}
        onChange={handleSortFieldChange}
        options={sortFields}
        renderInput={(parameters_) => <TextField {...parameters_} label={t('sorting')} variant={'outlined'} />}
        sx={{ width: 230 }}
      />
      <ToggleButtonGroup
        disabled={props.companyFilterStore.getSortField() === null}
        exclusive
        onChange={handleSortAscChange}
        value={props.companyFilterStore.getSortField() ? props.companyFilterStore.getSortAsc() : null}
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
