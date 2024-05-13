import militaryCollectionStore from '../../modules/military/MilitaryCollection/MilitaryCollection.store.ts'
import { MilitaryCollection } from '../../modules/military/MilitaryCollection/MilitaryCollection.tsx'
import militaryFilterStore from '../../modules/military/MilitaryFilter/MilitaryFilter.store.ts'
import { MilitaryFilter } from '../../modules/military/MilitaryFilter/MilitaryFilter.tsx'
import loadingStore from '../../stores/LoadingStore.ts'
import { ColumnContent } from '../../styles/ts/containers.ts'
import { Layout } from '../Layout.tsx'

export function MilitaryListPage() {
  return (
    <>
      <Layout>
        <ColumnContent>
          <MilitaryFilter loadingStore={loadingStore} militaryCollectionStore={militaryCollectionStore} militaryFilterStore={militaryFilterStore} />
          <MilitaryCollection loadingStore={loadingStore} militaryCollectionStore={militaryCollectionStore} />
        </ColumnContent>
      </Layout>
    </>
  )
}
