import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Corps } from '../../../models/graphql/schema.ts'
import { CorpsFormStore } from '../../../modules/formation/corps/CorpsForm/CorpsForm.store.ts'
import { CorpsForm } from '../../../modules/formation/corps/CorpsForm/CorpsForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function CorpsUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [corps, setCorps] = useState<Corps | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { corpsService } = useServices()

  const fetchCorps = useCallback(async () => {
    setLoading(true)
    const corpsData = await corpsService.getOneCorps({ name })
    setCorps(corpsData)
    setLoading(false)
  }, [name])
  useEffect(() => {
    setLoading(true)
    fetchCorps().finally(() => setLoading(false))
  }, [fetchCorps])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (corps === null || corps === undefined) {
    return <Error404Page />
  }

  const corpsFormStore = new CorpsFormStore(corps ?? undefined)
  return (
    <Layout>
      <CorpsForm corps={corps ?? undefined} corpsFormStore={corpsFormStore} edit loadingStore={loadingStore} />
    </Layout>
  )
}
