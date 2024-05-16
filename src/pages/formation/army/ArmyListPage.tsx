import armyCollectionStore from '../../../modules/formation/army/ArmyCollection/ArmyCollection.store.ts'
import { ArmyCollection } from '../../../modules/formation/army/ArmyCollection/ArmyCollection.tsx'
import armyFilterStore from '../../../modules/formation/army/ArmyFilter/ArmyFilter.store.ts'
import { ArmyFilter } from '../../../modules/formation/army/ArmyFilter/ArmyFilter.tsx'
import loadingStore from '../../../stores/LoadingStore.ts'
import { ColumnContent } from '../../../styles/ts/containers.ts'

export function ArmyListPage() {
  return (
    <>
      <ColumnContent>
        <ArmyFilter armyCollectionStore={armyCollectionStore} armyFilterStore={armyFilterStore} loadingStore={loadingStore} />
        <ArmyCollection armyCollectionStore={armyCollectionStore} loadingStore={loadingStore} />
      </ColumnContent>
    </>
  )
}
