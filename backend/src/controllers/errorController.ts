import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import AppError from "../utils/appError";

const handleCastErrorDB = (err: Error.CastError): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: Error.ValidationError): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: AppError;

  if (err instanceof Error.CastError) {
    error = handleCastErrorDB(err);
  } else if (err instanceof Error.ValidationError) {
    error = handleValidationErrorDB(err);
  } else {
    error = new AppError(err.message || "Internal Server Error", 500);
  }

  error.message = error.message || err.message;
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack,
  });
};
