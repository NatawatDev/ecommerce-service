import { Request, Response, NextFunction } from "express"
import AppError from "../utils/appError"

function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {  
  const statusCode = err.statusCode || 500

  console.error("ERROR", err);

  // Respond to client
  res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message || "Something went wrong!",
  })
}

export default errorHandler
