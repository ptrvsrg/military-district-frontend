import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Platoon } from '../../../models/graphql/schema.ts'
import { PlatoonFormStore } from '../../../modules/formation/platoon/PlatoonForm/PlatoonForm.store.ts'
import { PlatoonForm } from '../../../modules/formation/platoon/PlatoonForm/PlatoonForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function PlatoonUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [platoon, setPlatoon] = useState<Platoon | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { platoonService } = useServices()

  const fetchPlatoon = useCallback(async () => {
    const platoonData = await platoonService.getPlatoon({ name })
    setPlatoon(platoonData)
  }, [name])
  useEffect(() => {
    setLoading(true)
    fetchPlatoon().finally(() => setLoading(false))
  }, [fetchPlatoon])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (platoon === null || platoon === undefined) {
    return <Error404Page />
  }

  const platoonFormStore = new PlatoonFormStore(platoon ?? undefined)
  return (
    <Layout>
      <PlatoonForm edit loadingStore={loadingStore} platoon={platoon ?? undefined} platoonFormStore={platoonFormStore} />
    </Layout>
  )
}
