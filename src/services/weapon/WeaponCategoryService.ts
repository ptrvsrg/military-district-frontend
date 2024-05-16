import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import { QueryGetWeaponCategoriesArguments, WeaponCategory } from '../../models/graphql/schema.ts'
import { GET_WEAPON_CATEGORIES } from './queries.ts'

export class WeaponCategoryService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getWeaponCategories(parameters: QueryGetWeaponCategoriesArguments): Promise<WeaponCategory[]> {
    const data = await this.graphQlClient.query(GET_WEAPON_CATEGORIES, parameters, true)
    return data.getWeaponCategories ?? []
  }
}
