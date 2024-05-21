import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Maybe,
  MutationCreateWeaponArguments,
  MutationDeleteWeaponArguments,
  MutationUpdateWeaponArguments,
  QueryGetWeaponArguments,
  QueryGetWeaponCountArguments,
  QueryGetWeaponsArguments,
  Weapon,
} from '../../models/graphql/schema.ts'
import { CREATE_WEAPON, DELETE_WEAPON, GET_WEAPON, GET_WEAPON_COUNT, GET_WEAPONS, UPDATE_WEAPON } from './queries.ts'

export class WeaponService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getWeapons(parameters: QueryGetWeaponsArguments): Promise<Weapon[]> {
    const data = await this.graphQlClient.query(GET_WEAPONS, parameters, true)
    return data.getWeapons ?? []
  }

  public async getWeaponCount(parameters: QueryGetWeaponCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_WEAPON_COUNT, parameters, true)
    return data.getWeaponCount ?? 0
  }

  public async getWeapon(parameters: QueryGetWeaponArguments): Promise<Maybe<Weapon> | undefined> {
    const data = await this.graphQlClient.query(GET_WEAPON, parameters, true)
    return data.getWeapon
  }

  public async createWeapon(parameters: MutationCreateWeaponArguments): Promise<Maybe<Weapon> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_WEAPON, parameters, true)
    return data.createWeapon
  }

  public async updateWeapon(parameters: MutationUpdateWeaponArguments): Promise<Maybe<Weapon> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_WEAPON, parameters, true)
    return data.updateWeapon
  }

  public async deleteWeapon(parameters: MutationDeleteWeaponArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_WEAPON, parameters, true)
    return data.deleteWeapon ?? 0
  }
}
