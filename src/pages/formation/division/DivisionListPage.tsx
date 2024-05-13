import divisionCollectionStore from '../../../modules/formation/division/DivisionCollection/DivisionCollection.store.ts'
import { DivisionCollection } from '../../../modules/formation/division/DivisionCollection/DivisionCollection.tsx'
import divisionFilterStore from '../../../modules/formation/division/DivisionFilter/DivisionFilter.store.ts'
import { DivisionFilter } from '../../../modules/formation/division/DivisionFilter/DivisionFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function DivisionListPage() {
  return (
    <>
      <ColumnContent>
        <DivisionFilter divisionCollectionStore={divisionCollectionStore} divisionFilterStore={divisionFilterStore} loadingStore={loadingStore} />
        <DivisionCollection divisionCollectionStore={divisionCollectionStore} loadingStore={loadingStore} />
      </ColumnContent>
    </>
  )
}
