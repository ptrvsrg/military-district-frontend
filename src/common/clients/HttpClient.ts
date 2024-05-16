import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import keycloak from '../../stores/AuthStore.ts'
import { addAlert } from '../../utils/alert.tsx'
import { Dictionary } from '../types/Dictionary.ts'
import { ErrorResponse } from '../types/ErrorResponse.ts'

export class HttpClient {
  private static instance: HttpClient

  private readonly timeout: number

  private readonly headers: Dictionary<string>

  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  constructor(timeout: number = 30_000, headers: Dictionary<string> = { 'Content-Type': 'application/json' }) {
    this.timeout = timeout
    this.headers = headers
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      const timeout = 30_000
      const headers = { 'Content-Type': 'application/json' }

      HttpClient.instance = new HttpClient(timeout, headers)
    }

    return HttpClient.instance
  }

  public async patch<T = any>(
    url: string,
    data: Dictionary<any> | string,
    secureRequired?: boolean,
    parameters?: AxiosRequestConfig,
    timeout_?: number
  ): Promise<AxiosResponse<T>> {
    const config = {
      headers: this.getHeaders(secureRequired ?? false),
      timeout: timeout_ ?? this.timeout,
      ...parameters,
    }
    try {
      return await axios.patch(url, data, config)
    } catch (error) {
      addAlert(this.getErrorMessage(error), 'error')
      throw error
    }
  }

  public async post<T = any>(
    url: string,
    data: Dictionary<any> | string,
    secureRequired?: boolean,
    parameters?: AxiosRequestConfig,
    timeout_?: number
  ): Promise<AxiosResponse<T>> {
    const config = {
      headers: this.getHeaders(secureRequired ?? false),
      timeout: timeout_ ?? this.timeout,
      ...parameters,
    }
    try {
      return await axios.post(url, data, config)
    } catch (error) {
      addAlert(this.getErrorMessage(error), 'error')
      throw error
    }
  }

  public async put<T = any>(
    url: string,
    data: Dictionary<any>,
    secureRequired?: boolean,
    parameters?: AxiosRequestConfig,
    timeout_?: number
  ): Promise<AxiosResponse<T>> {
    const config = {
      headers: this.getHeaders(secureRequired ?? false),
      timeout: timeout_ ?? this.timeout,
      ...parameters,
    }

    try {
      return await axios.put(url, data, config)
    } catch (error) {
      addAlert(this.getErrorMessage(error), 'error')
      throw error
    }
  }

  public async delete<T = any>(url: string, secureRequired?: boolean, parameters?: AxiosRequestConfig, timeout_?: number): Promise<AxiosResponse<T>> {
    const config = {
      headers: this.getHeaders(secureRequired ?? false),
      timeout: timeout_ ?? this.timeout,
      ...parameters,
    }
    try {
      return await axios.delete(url, config)
    } catch (error) {
      addAlert(this.getErrorMessage(error), 'error')
      throw error
    }
  }

  public async get<T = any>(url: string, secureRequired?: boolean, parameters?: any, timeout_?: number): Promise<AxiosResponse<T>> {
    const config = {
      headers: this.getHeaders(secureRequired ?? false),
      params: parameters,
      timeout: timeout_ ?? this.timeout,
    }
    try {
      return await axios.get(url, config)
    } catch (error) {
      console.log(error)
      addAlert(this.getErrorMessage(error), 'error')
      throw error
    }
  }

  private getHeaders(secureRequired: boolean): Dictionary<string> {
    if (!secureRequired) {
      return this.headers
    }
    return {
      ...this.headers,
      Authorization: `Bearer ${keycloak.token}`,
    }
  }

  private getErrorMessage(error: any): string {
    if (!(error instanceof AxiosError)) {
      return ''
    }

    const axiosError = error as AxiosError
    const message = (axiosError.response?.data as ErrorResponse)?.message
    if (message) {
      return message
    }

    return axiosError.message
  }
}
