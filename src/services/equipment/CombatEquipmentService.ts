import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  CombatEquipment,
  Maybe,
  MutationCreateCombatEquipmentArguments,
  MutationDeleteCombatEquipmentArguments,
  MutationUpdateCombatEquipmentArguments,
  QueryGetCombatEquipmentArguments,
  QueryGetCombatEquipmentCountArguments,
  QueryGetCombatEquipmentsArguments,
} from '../../models/graphql/schema.ts'
import {
  CREATE_COMBAT_EQUIPMENT,
  DELETE_COMBAT_EQUIPMENT,
  GET_COMBAT_EQUIPMENT,
  GET_COMBAT_EQUIPMENT_COUNT,
  GET_COMBAT_EQUIPMENTS,
  UPDATE_COMBAT_EQUIPMENT,
} from './queries.ts'

export class CombatEquipmentService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getCombatEquipments(parameters: QueryGetCombatEquipmentsArguments): Promise<CombatEquipment[]> {
    const data = await this.graphQlClient.query(GET_COMBAT_EQUIPMENTS, parameters, true)
    return data.getCombatEquipments ?? []
  }

  public async getCombatEquipmentCount(parameters: QueryGetCombatEquipmentCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_COMBAT_EQUIPMENT_COUNT, parameters, true)
    return data.getCombatEquipmentCount ?? 0
  }

  public async getCombatEquipment(parameters: QueryGetCombatEquipmentArguments): Promise<Maybe<CombatEquipment> | undefined> {
    const data = await this.graphQlClient.query(GET_COMBAT_EQUIPMENT, parameters, true)
    return data.getCombatEquipment
  }

  public async createCombatEquipment(parameters: MutationCreateCombatEquipmentArguments): Promise<Maybe<CombatEquipment> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_COMBAT_EQUIPMENT, parameters, true)
    return data.createCombatEquipment
  }

  public async updateCombatEquipment(parameters: MutationUpdateCombatEquipmentArguments): Promise<Maybe<CombatEquipment> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_COMBAT_EQUIPMENT, parameters, true)
    return data.updateCombatEquipment
  }

  public async deleteCombatEquipment(parameters: MutationDeleteCombatEquipmentArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_COMBAT_EQUIPMENT, parameters, true)
    return data.deleteCombatEquipment ?? 0
  }
}
