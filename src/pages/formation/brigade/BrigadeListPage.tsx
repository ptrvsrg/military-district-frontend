import brigadeCollectionStore from '../../../modules/formation/brigade/BrigadeCollection/BrigadeCollection.store.ts'
import { BrigadeCollection } from '../../../modules/formation/brigade/BrigadeCollection/BrigadeCollection.tsx'
import brigadeFilterStore from '../../../modules/formation/brigade/BrigadeFilter/BrigadeFilter.store.ts'
import { BrigadeFilter } from '../../../modules/formation/brigade/BrigadeFilter/BrigadeFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function BrigadeListPage() {
  return (
    <>
      <ColumnContent>
        <BrigadeFilter brigadeCollectionStore={brigadeCollectionStore} brigadeFilterStore={brigadeFilterStore} loadingStore={loadingStore} />
        <BrigadeCollection brigadeCollectionStore={brigadeCollectionStore} loadingStore={loadingStore} />
      </ColumnContent>
    </>
  )
}
