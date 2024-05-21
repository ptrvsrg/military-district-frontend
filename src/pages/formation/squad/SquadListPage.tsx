import squadCollectionStore from '../../../modules/formation/squad/SquadCollection/SquadCollection.store.ts'
import { SquadCollection } from '../../../modules/formation/squad/SquadCollection/SquadCollection.tsx'
import squadFilterStore from '../../../modules/formation/squad/SquadFilter/SquadFilter.store.ts'
import { SquadFilter } from '../../../modules/formation/squad/SquadFilter/SquadFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function SquadListPage() {
  return (
    <>
      <ColumnContent>
        <SquadFilter loadingStore={loadingStore} squadCollectionStore={squadCollectionStore} squadFilterStore={squadFilterStore} />
        <SquadCollection loadingStore={loadingStore} squadCollectionStore={squadCollectionStore} />
      </ColumnContent>
    </>
  )
}
