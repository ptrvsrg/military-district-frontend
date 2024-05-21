import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Maybe,
  MutationCreateWeaponTypeArguments,
  MutationDeleteWeaponTypeArguments,
  MutationUpdateWeaponTypeArguments,
  QueryGetWeaponTypeArguments,
  QueryGetWeaponTypeCountArguments,
  QueryGetWeaponTypesArguments,
  WeaponType,
} from '../../models/graphql/schema.ts'
import { CREATE_WEAPON_TYPE, DELETE_WEAPON_TYPE, GET_WEAPON_TYPE, GET_WEAPON_TYPE_COUNT, GET_WEAPON_TYPES, UPDATE_WEAPON_TYPE } from './queries.ts'

export class WeaponTypeService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getWeaponTypes(parameters: QueryGetWeaponTypesArguments): Promise<WeaponType[]> {
    const data = await this.graphQlClient.query(GET_WEAPON_TYPES, parameters, true)
    return data.getWeaponTypes ?? []
  }

  public async getWeaponTypeCount(parameters: QueryGetWeaponTypeCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_WEAPON_TYPE_COUNT, parameters, true)
    return data.getWeaponTypeCount ?? 0
  }

  public async getWeaponType(parameters: QueryGetWeaponTypeArguments): Promise<Maybe<WeaponType> | undefined> {
    const data = await this.graphQlClient.query(GET_WEAPON_TYPE, parameters, true)
    return data.getWeaponType
  }

  public async createWeaponType(parameters: MutationCreateWeaponTypeArguments): Promise<Maybe<WeaponType> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_WEAPON_TYPE, parameters, true)
    return data.createWeaponType
  }

  public async updateWeaponType(parameters: MutationUpdateWeaponTypeArguments): Promise<Maybe<WeaponType> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_WEAPON_TYPE, parameters, true)
    return data.updateWeaponType
  }

  public async deleteWeaponType(parameters: MutationDeleteWeaponTypeArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_WEAPON_TYPE, parameters, true)
    return data.deleteWeaponType ?? 0
  }
}
