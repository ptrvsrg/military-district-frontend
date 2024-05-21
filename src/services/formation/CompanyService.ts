import { GraphQlClient } from '../../common/clients/GraphQlClient.ts'
import {
  Company,
  Maybe,
  MutationCreateCompanyArguments,
  MutationDeleteCompanyArguments,
  MutationUpdateCompanyArguments,
  QueryGetCompaniesArguments,
  QueryGetCompanyArguments,
  QueryGetCompanyCountArguments,
} from '../../models/graphql/schema.ts'
import { CREATE_COMPANY, DELETE_COMPANY, GET_ALL_COMPANY_NAMES, GET_COMPANIES, GET_COMPANY, GET_COMPANY_COUNT, UPDATE_COMPANY } from './queries.ts'

export class CompanyService {
  private graphQlClient: GraphQlClient

  constructor(graphQlClient: GraphQlClient) {
    this.graphQlClient = graphQlClient
  }

  public async getCompanyNames(): Promise<string[]> {
    const data = await this.graphQlClient.query(GET_ALL_COMPANY_NAMES, {}, true)
    return data.getCompanies?.map((company) => company.name) ?? []
  }

  public async getCompanies(parameters: QueryGetCompaniesArguments): Promise<Company[]> {
    const data = await this.graphQlClient.query(GET_COMPANIES, parameters, true)
    return data.getCompanies ?? []
  }

  public async getCompanyCount(parameters: QueryGetCompanyCountArguments): Promise<number> {
    const data = await this.graphQlClient.query(GET_COMPANY_COUNT, parameters, true)
    return data.getCompanyCount ?? 0
  }

  public async getCompany(parameters: QueryGetCompanyArguments): Promise<Maybe<Company> | undefined> {
    const data = await this.graphQlClient.query(GET_COMPANY, parameters, true)
    return data.getCompany
  }

  public async createCompany(parameters: MutationCreateCompanyArguments): Promise<Maybe<Company> | undefined> {
    const data = await this.graphQlClient.mutation(CREATE_COMPANY, parameters, true)
    return data.createCompany
  }

  public async updateCompany(parameters: MutationUpdateCompanyArguments): Promise<Maybe<Company> | undefined> {
    const data = await this.graphQlClient.mutation(UPDATE_COMPANY, parameters, true)
    return data.updateCompany
  }

  public async deleteCompany(parameters: MutationDeleteCompanyArguments): Promise<number> {
    const data = await this.graphQlClient.mutation(DELETE_COMPANY, parameters, true)
    return data.deleteCompany ?? 0
  }
}
