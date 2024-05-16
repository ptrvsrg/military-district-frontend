import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Brigade } from '../../../models/graphql/schema.ts'
import { BrigadeFormStore } from '../../../modules/formation/brigade/BrigadeForm/BrigadeForm.store.ts'
import { BrigadeForm } from '../../../modules/formation/brigade/BrigadeForm/BrigadeForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function BrigadeUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [brigade, setBrigade] = useState<Brigade | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { brigadeService } = useServices()

  const fetchBrigade = useCallback(async () => {
    const brigadeData = await brigadeService.getBrigade({ name })
    setBrigade(brigadeData)
  }, [name])
  useEffect(() => {
    setLoading(true)
    fetchBrigade().finally(() => setLoading(false))
  }, [fetchBrigade])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (brigade === null || brigade === undefined) {
    return <Error404Page />
  }

  const brigadeFormStore = new BrigadeFormStore(brigade ?? undefined)
  return (
    <Layout>
      <BrigadeForm brigade={brigade ?? undefined} brigadeFormStore={brigadeFormStore} edit loadingStore={loadingStore} />
    </Layout>
  )
}
