import unitCollectionStore from '../../../modules/formation/unit/UnitCollection/UnitCollection.store.ts'
import { UnitCollection } from '../../../modules/formation/unit/UnitCollection/UnitCollection.tsx'
import unitFilterStore from '../../../modules/formation/unit/UnitFilter/UnitFilter.store.ts'
import { UnitFilter } from '../../../modules/formation/unit/UnitFilter/UnitFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function UnitListPage() {
  return (
    <>
      <ColumnContent>
        <UnitFilter loadingStore={loadingStore} unitCollectionStore={unitCollectionStore} unitFilterStore={unitFilterStore} />
        <UnitCollection loadingStore={loadingStore} unitCollectionStore={unitCollectionStore} />
      </ColumnContent>
    </>
  )
}
