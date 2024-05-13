import { HttpClient } from '../../common/clients/HttpClient.ts'
import { GetReportParameters, GetReportsParameters, ReportBuildInput, ReportData, ReportInfo } from '../../models/report/report.types.ts'
import { projectConfig } from '../../stores/ProjectStore.ts'

export class ReportService {
  private httpClient: HttpClient

  private readonly baseUrl: string

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
    this.baseUrl = projectConfig.microserviceConfig.msReportUrl
  }

  public async get(parameters: GetReportsParameters): Promise<ReportInfo[]> {
    const result = await this.httpClient.get<ReportInfo[]>(`${this.baseUrl}/all`, true, parameters)
    return result.data as ReportInfo[]
  }

  public async getCount(): Promise<number> {
    const result = await this.httpClient.get<{ count: number }>(`${this.baseUrl}/count`, true)
    return result.data.count as number
  }

  public async getByName(parameters: GetReportParameters): Promise<ReportInfo> {
    const result = await this.httpClient.get<ReportInfo>(`${this.baseUrl}/one`, true, parameters)
    return result.data as ReportInfo
  }

  public async build(data: ReportBuildInput): Promise<ReportData> {
    const result = await this.httpClient.post<ReportData>(`${this.baseUrl}/build`, data, true)
    return result.data as ReportData
  }

  public async export(data: ReportBuildInput): Promise<void> {
    const result = await this.httpClient.post<string>(`${this.baseUrl}/export`, data, true)

    const element = document.createElement('a')
    const file = new Blob([result.data], { type: 'text/csv;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `${data.name}.csv`
    document.body.append(element)
    element.click()
  }
}
