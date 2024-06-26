import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Spinner } from '../../../components/spinner/Spinner.tsx'
import { Unit } from '../../../models/graphql/schema.ts'
import { UnitFormStore } from '../../../modules/formation/unit/UnitForm/UnitForm.store.ts'
import { UnitForm } from '../../../modules/formation/unit/UnitForm/UnitForm.tsx'
import { useServices } from '../../../services/useServices.ts'
import loadingStore from '../../../stores/LoadingStore.ts'
import { SpinnerWrapper } from '../../../styles/ts/containers.ts'
import { Error404Page } from '../../Error404Page.tsx'
import { Layout } from '../../Layout.tsx'

export function UnitUpdatePage() {
  // Query parameter
  const [searchParameters] = useSearchParams()
  const name = searchParameters.get('name')
  if (name === null) {
    return <Error404Page />
  }

  // Fetch data
  const [unit, setUnit] = useState<Unit | null | undefined>()
  const [loading, setLoading] = useState(false)
  const { unitService } = useServices()

  const fetchUnit = useCallback(async () => {
    const unitData = await unitService.getUnit({ name })
    setUnit(unitData)
  }, [name])
  useEffect(() => {
    setLoading(true)
    fetchUnit().finally(() => setLoading(false))
  }, [fetchUnit])

  // Render
  if (loading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    )
  }

  if (unit === null || unit === undefined) {
    return <Error404Page />
  }

  const unitFormStore = new UnitFormStore(unit ?? undefined)
  return (
    <Layout>
      <UnitForm edit loadingStore={loadingStore} unit={unit ?? undefined} unitFormStore={unitFormStore} />
    </Layout>
  )
}
