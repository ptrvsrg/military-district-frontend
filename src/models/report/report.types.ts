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
  report: string
}

export type GetAllReportParameterValuesParameters = {
  report: string
}

export type GetReportParameterValuesParameters = {
  parameter: string
  report: string
}

export type BuildReportParameters = {
  report: string
}

export type ExportReportParameters = BuildReportParameters
