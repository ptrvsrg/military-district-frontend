import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../components/spinner/Spinner.tsx'
import { Military } from '../../models/graphql/schema.ts'
import { MilitaryFormStore } from '../../modules/military/MilitaryForm/MilitaryForm.store.ts'
import { MilitaryForm } from '../../modules/military/MilitaryForm/MilitaryForm.tsx'
import { useServices } from '../../services/useServices.ts'
import loadingStore from '../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../styles/ts/containers.ts'
import { Error404Page } from '../Error404Page.tsx'
import { Layout } from '../Layout.tsx'

export function MilitaryUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const mbn = searchParameters.get('mbn')
  if (mbn === null) {
    return <Error404Page />
  }

  // Fetch data
  const [military, setMilitary] = useState<Military | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { militaryService } = useServices()

  const fetchMilitary = useCallback(async () => {
    const militaryData = await militaryService.getMilitary({ mbn })
    setMilitary(militaryData)
  }, [mbn])
  useEffect(() => {
    setLoading(true)
    fetchMilitary().finally(() => setLoading(false))
  }, [fetchMilitary])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (military === null || military === undefined) {
    return <Error404Page />
  }

  const militaryFormStore = new MilitaryFormStore(military ?? undefined)
  return (
    <Layout>
      <MilitaryForm edit loadingStore={loadingStore} military={military ?? undefined} militaryFormStore={militaryFormStore} />
    </Layout>
  )
}
