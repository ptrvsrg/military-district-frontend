import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import { CombatEquipmentCategory, QueryGetCombatEquipmentCategoriesArguments } from '../../models/graphql/schema.ts'
import { GET_COMBAT_EQUIPMENT_CATEGORIES } from './queries.ts'

export class CombatEquipmentCategoryService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getCombatEquipmentCategories(parameters: QueryGetCombatEquipmentCategoriesArguments): Promise<CombatEquipmentCategory[]> {
    const data = await this.graphQlClient.query(GET_COMBAT_EQUIPMENT_CATEGORIES, parameters, true)
    return data.getCombatEquipmentCategories ?? []
  }
}
