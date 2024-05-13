import { Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../../../components/spinner/Spinner.tsx'
import { Column, Table } from '../../../../components/table/Table.tsx'
import { LoadingStore } from '../../../../stores/LoadingStore.ts'
import { RowWrapper, SpinnerWrapper } from '../../../../styles/ts/containers.ts'
import { CompanyCollectionStore } from './CompanyCollection.store.ts'

type CompanyCollectionProps = {
  companyCollectionStore: CompanyCollectionStore
  loadingStore: LoadingStore
}

export const CompanyCollection = observer((props: CompanyCollectionProps) => {
  const { t } = useTranslation()

  // Table
  const tableColumns: Column[] = [
    { label: <b>{t('name').toUpperCase()}</b> },
    { label: <b>{t('commander').toUpperCase()}</b> },
    { label: <b>{t('unit').toUpperCase()}</b> },
    { label: <b>{t('platoons').toUpperCase()}</b> },
  ]
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const formationNamesToCell = (formationNames: string[], prefixLink: string) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'max-content',
        width: 'max-content',
      }}
    >
      {formationNames.length > 0 ? formationNames.sort().map((name) => <Link href={`${prefixLink}?name=${name}`}>{name}</Link>) : '—'}
    </div>
  )
  const tableData: ReactNode[][] = props.companyCollectionStore.getCompanies().map((company) => {
    return [
      <Link href={`/formations/companies/update?name=${company?.name || ''}`}>{company?.name || '—'}</Link>,
      <Link href={`/militaries/update?mbn=${company?.commander?.mbn || ''}`}>{company?.commander?.mbn || '—'}</Link>,
      formationNamesToCell((company?.unit ? [company?.unit] : []).map((unit) => unit.name) ?? [], '/formation/units/update'),
      formationNamesToCell(company?.platoons.map((platoon) => platoon.name) ?? [], '/formation/platoons/update'),
    ]
  })

  if (props.loadingStore.loading) {
    return (
      <SpinnerWrapper style={{ height: 400 }}>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  return (
    <RowWrapper>
      <Table
        columns={tableColumns}
        count={props.companyCollectionStore.getCompanyCount()}
        data={tableData}
        onPage={(number) => props.companyCollectionStore.setPage(number)}
        onPageSize={(number) => props.companyCollectionStore.setPageSize(number)}
        page={props.companyCollectionStore.getPage()}
        pageSize={props.companyCollectionStore.getPageSize()}
        pageable
      />
    </RowWrapper>
  )
})
