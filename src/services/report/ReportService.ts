import { AxiosError } from 'axios'

import { HttpClient } from '../../common/clients/HttpClient.ts'
import {
  BuildReportParameters,
  ExportReportParameters,
  GetAllReportParameterValuesParameters,
  GetReportParameterValuesParameters,
  GetReportParameters,
  GetReportsParameters,
  ReportBuildInput,
  ReportBuildOutput,
  ReportInfoOutput,
} from '../../models/report/report.types.ts'
import { projectConfig } from '../../stores/ProjectStore.ts'

export class ReportService {
  private httpClient: HttpClient

  private readonly baseUrl: string

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
    this.baseUrl = projectConfig.microserviceConfig.msReportUrl
  }

  public async getAll(parameters: GetReportsParameters): Promise<ReportInfoOutput[]> {
    const result = await this.httpClient.get<ReportInfoOutput[]>(`${this.baseUrl}/all`, true, parameters)
    return result.data
  }

  public async getCount(): Promise<number> {
    const result = await this.httpClient.get<{ count: number }>(`${this.baseUrl}/count`, true)
    return result.data.count
  }

  public async getByName(parameters: GetReportParameters): Promise<ReportInfoOutput | null> {
    try {
      const result = await this.httpClient.get<ReportInfoOutput>(`${this.baseUrl}/one`, true, parameters)
      return result.data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null
      }
      throw error
    }
  }

  public async getAllParameterValues(parameters: GetAllReportParameterValuesParameters): Promise<Record<string, string[]> | null> {
    try {
      const result = await this.httpClient.get<Record<string, string[]> | null>(`${this.baseUrl}/parameter-values`, true, parameters)
      return result.data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null
      }
      throw error
    }
  }

  public async getParameterValuesByParameterName(parameters: GetReportParameterValuesParameters): Promise<null | string[]> {
    try {
      const result = await this.httpClient.get<null | string[]>(`${this.baseUrl}/parameter-values`, true, parameters)
      return result.data?.length === 0 ? null : result.data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null
      }
      throw error
    }
  }

  public async build(data: ReportBuildInput, parameters: BuildReportParameters): Promise<ReportBuildOutput> {
    const result = await this.httpClient.post<ReportBuildOutput>(`${this.baseUrl}/build`, data, true, { params: parameters })
    return result.data
  }

  public async export(data: ReportBuildInput, parameters: ExportReportParameters): Promise<void> {
    const result = await this.httpClient.post<string>(`${this.baseUrl}/export`, data, true, { params: parameters })

    const element = document.createElement('a')
    const file = new Blob([result.data], { type: 'text/csv;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `${parameters.report}.csv`
    document.body.append(element)
    element.click()
  }
}
