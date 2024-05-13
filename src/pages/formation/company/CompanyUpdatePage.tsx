import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Company } from '../../../models/graphql/schema.ts'
import { CompanyFormStore } from '../../../modules/formation/company/CompanyForm/CompanyForm.store.ts'
import { CompanyForm } from '../../../modules/formation/company/CompanyForm/CompanyForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function CompanyUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [company, setCompany] = useState<Company | null | undefined>()
  const { companyService } = useServices()

  useEffect(() => {
    const fetchData = async () => {
      loadingStore.setLoading(true)
      const companyData = await companyService.getCompany({ name })
      setCompany(companyData)
      loadingStore.setLoading(false)
    }

    fetchData()
  }, [])

  if (!loadingStore.getLoading() && (company === null || company === undefined)) {
    return <Error404Page />
  }

  if (loadingStore.getLoading()) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  const companyFormStore = new CompanyFormStore(company ?? undefined)
  return (
    <Layout>
      <CompanyForm company={company ?? undefined} companyFormStore={companyFormStore} edit loadingStore={loadingStore} />
    </Layout>
  )
}
