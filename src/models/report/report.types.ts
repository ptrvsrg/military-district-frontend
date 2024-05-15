export type ReportBuildOutput = {
  data: Record<string, string>[]
}

export type ReportInfoOutput = {
  description?: string
  name: string
  parameters: string[]
}

export type ReportBuildInput = {
  parameters: Record<string, null | string>
}

export type GetReportsParameters = {
  page?: number
  pageSize?: number
}

export type GetReportParameters = {
  name: string
}

export type BuildReportParameters = {
  name: string
}

export type ExportReportParameters = BuildReportParameters
