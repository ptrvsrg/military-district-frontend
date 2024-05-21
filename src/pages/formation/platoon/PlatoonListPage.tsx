import platoonCollectionStore from '../../../modules/formation/platoon/PlatoonCollection/PlatoonCollection.store.ts'
import { PlatoonCollection } from '../../../modules/formation/platoon/PlatoonCollection/PlatoonCollection.tsx'
import platoonFilterStore from '../../../modules/formation/platoon/PlatoonFilter/PlatoonFilter.store.ts'
import { PlatoonFilter } from '../../../modules/formation/platoon/PlatoonFilter/PlatoonFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function PlatoonListPage() {
  return (
    <>
      <ColumnContent>
        <PlatoonFilter loadingStore={loadingStore} platoonCollectionStore={platoonCollectionStore} platoonFilterStore={platoonFilterStore} />
        <PlatoonCollection loadingStore={loadingStore} platoonCollectionStore={platoonCollectionStore} />
      </ColumnContent>
    </>
  )
}
