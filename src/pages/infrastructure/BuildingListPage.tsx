import buildingCollectionStore from '../../modules/infrastructure/BuildingCollection/BuildingCollection.store.ts'
import { BuildingCollection } from '../../modules/infrastructure/BuildingCollection/BuildingCollection.tsx'
import buildingFilterStore from '../../modules/infrastructure/BuildingFilter/BuildingFilter.store.ts'
import { BuildingFilter } from '../../modules/infrastructure/BuildingFilter/BuildingFilter.tsx'
import loadingStore from '../../stores/LoadingStore.ts'
import { ColumnContent } from '../../styles/ts/containers.ts'
import { Layout } from '../Layout.tsx'

export function BuildingListPage() {
  return (
    <>
      <Layout>
        <ColumnContent>
          <BuildingFilter buildingCollectionStore={buildingCollectionStore} buildingFilterStore={buildingFilterStore} loadingStore={loadingStore} />
          <BuildingCollection buildingCollectionStore={buildingCollectionStore} loadingStore={loadingStore} />
        </ColumnContent>
      </Layout>
    </>
  )
}
