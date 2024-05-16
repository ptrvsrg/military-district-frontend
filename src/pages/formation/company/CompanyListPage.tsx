import companyCollectionStore from '../../../modules/formation/company/CompanyCollection/CompanyCollection.store.ts'
import { CompanyCollection } from '../../../modules/formation/company/CompanyCollection/CompanyCollection.tsx'
import companyFilterStore from '../../../modules/formation/company/CompanyFilter/CompanyFilter.store.ts'
import { CompanyFilter } from '../../../modules/formation/company/CompanyFilter/CompanyFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function CompanyListPage() {
  return (
    <>
      <ColumnContent>
        <CompanyFilter companyCollectionStore={companyCollectionStore} companyFilterStore={companyFilterStore} loadingStore={loadingStore} />
        <CompanyCollection companyCollectionStore={companyCollectionStore} loadingStore={loadingStore} />
      </ColumnContent>
    </>
  )
}
