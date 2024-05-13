export type ReportData = {
  columns: string[]
  data: Record<string, string>[]
}

export type ReportInfo = {
  name: string
  parameters: string[]
}

export type GetReportsParameters = {
  page?: number
  pageSize?: number
}

export type GetReportParameters = {
  reportName: string
}

export type ParameterInput = {
  name: string
  value: null | string
}

export type ReportBuildInput = {
  name: string
  parameters: ParameterInput[]
}
