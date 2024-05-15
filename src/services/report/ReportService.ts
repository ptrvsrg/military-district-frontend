import { HttpClient } from '../../common/clients/HttpClient.ts'
import {
  BuildReportParameters,
  ExportReportParameters,
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
    return result.data as ReportInfoOutput[]
  }

  public async getCount(): Promise<number> {
    const result = await this.httpClient.get<{ count: number }>(`${this.baseUrl}/count`, true)
    return result.data.count as number
  }

  public async getByName(parameters: GetReportParameters): Promise<ReportInfoOutput> {
    const result = await this.httpClient.get<ReportInfoOutput>(`${this.baseUrl}/one`, true, parameters)
    return result.data as ReportInfoOutput
  }

  public async build(data: ReportBuildInput, parameters: BuildReportParameters): Promise<ReportBuildOutput> {
    const result = await this.httpClient.post<ReportBuildOutput>(`${this.baseUrl}/build`, data, true, { params: parameters })
    return result.data as ReportBuildOutput
  }

  public async export(data: ReportBuildInput, parameters: ExportReportParameters): Promise<void> {
    const result = await this.httpClient.post<string>(`${this.baseUrl}/export`, data, true, { params: parameters })

    const element = document.createElement('a')
    const file = new Blob([result.data], { type: 'text/csv;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `${parameters.name}.csv`
    document.body.append(element)
    element.click()
  }
}
