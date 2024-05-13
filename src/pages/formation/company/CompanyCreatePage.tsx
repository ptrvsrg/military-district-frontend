import { CompanyFormStore } from '../../../modules/formation/company/CompanyForm/CompanyForm.store.ts'
import { CompanyForm } from '../../../modules/formation/company/CompanyForm/CompanyForm.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { Layout } from '../../Layout.tsx'

export function CompanyCreatePage() {
  const companyFormStore = new CompanyFormStore()
  return (
    <Layout>
      <CompanyForm companyFormStore={companyFormStore} loadingStore={loadingStore} />
    </Layout>
  )
}
