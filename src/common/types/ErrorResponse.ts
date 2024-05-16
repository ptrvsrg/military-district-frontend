export class ErrorResponse {
  public createdAt: string

  public errors: any

  public message: string

  constructor(createdAt: string, message: string, errors: any) {
    this.createdAt = createdAt
    this.message = message
    this.errors = errors
  }
}
