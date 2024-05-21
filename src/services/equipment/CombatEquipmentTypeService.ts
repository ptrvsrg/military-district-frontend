import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  CombatEquipmentType,
  Maybe,
  MutationCreateCombatEquipmentTypeArguments,
  MutationDeleteCombatEquipmentTypeArguments,
  MutationUpdateCombatEquipmentTypeArguments,
  QueryGetCombatEquipmentTypeArguments,
  QueryGetCombatEquipmentTypeCountArguments,
  QueryGetCombatEquipmentTypesArguments,
} from '../../models/graphql/schema.ts'
import {
  CREATE_COMBAT_EQUIPMENT_TYPE,
  DELETE_COMBAT_EQUIPMENT_TYPE,
  GET_COMBAT_EQUIPMENT_TYPE,
  GET_COMBAT_EQUIPMENT_TYPE_COUNT,
  GET_COMBAT_EQUIPMENT_TYPES,
  UPDATE_COMBAT_EQUIPMENT_TYPE,
} from './queries.ts'

export class CombatEquipmentTypeService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getCombatEquipmentTypes(parameters: QueryGetCombatEquipmentTypesArguments): Promise<CombatEquipmentType[]> {
    const data = await this.graphQlClient.query(GET_COMBAT_EQUIPMENT_TYPES, parameters, true)
    return data.getCombatEquipmentTypes ?? []
  }

  public async getCombatEquipmentTypeCount(parameters: QueryGetCombatEquipmentTypeCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_COMBAT_EQUIPMENT_TYPE_COUNT, parameters, true)
    return data.getCombatEquipmentTypeCount ?? 0
  }

  public async getCombatEquipmentType(parameters: QueryGetCombatEquipmentTypeArguments): Promise<Maybe<CombatEquipmentType> | undefined> {
    const data = await this.graphQlClient.query(GET_COMBAT_EQUIPMENT_TYPE, parameters, true)
    return data.getCombatEquipmentType
  }

  public async createCombatEquipmentType(parameters: MutationCreateCombatEquipmentTypeArguments): Promise<Maybe<CombatEquipmentType> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_COMBAT_EQUIPMENT_TYPE, parameters, true)
    return data.createCombatEquipmentType
  }

  public async updateCombatEquipmentType(parameters: MutationUpdateCombatEquipmentTypeArguments): Promise<Maybe<CombatEquipmentType> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_COMBAT_EQUIPMENT_TYPE, parameters, true)
    return data.updateCombatEquipmentType
  }

  public async deleteCombatEquipmentType(parameters: MutationDeleteCombatEquipmentTypeArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_COMBAT_EQUIPMENT_TYPE, parameters, true)
    return data.deleteCombatEquipmentType ?? 0
  }
}
