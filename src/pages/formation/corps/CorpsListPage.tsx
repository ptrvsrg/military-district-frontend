import corpsCollectionStore from '../../../modules/formation/corps/CorpsCollection/CorpsCollection.store.ts'
import { CorpsCollection } from '../../../modules/formation/corps/CorpsCollection/CorpsCollection.tsx'
import corpsFilterStore from '../../../modules/formation/corps/CorpsFilter/CorpsFilter.store.ts'
import { CorpsFilter } from '../../../modules/formation/corps/CorpsFilter/CorpsFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function CorpsListPage() {
  return (
    <>
      <ColumnContent>
        <CorpsFilter corpsCollectionStore={corpsCollectionStore} corpsFilterStore={corpsFilterStore} loadingStore={loadingStore} />
        <CorpsCollection corpsCollectionStore={corpsCollectionStore} loadingStore={loadingStore} />
      </ColumnContent>
    </>
  )
}
