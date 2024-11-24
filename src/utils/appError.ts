class AppError extends Error {
  public readonly statusCode: number
  
  constructor(message: string, statusCode: number, status: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export default AppError