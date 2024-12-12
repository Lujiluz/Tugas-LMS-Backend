import { MongoError } from "mongodb";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import responseConfig from "../config/responseConfig";

class AppError extends Error {
  statusCode: number;
  caseCode: string;

  constructor(message: string, statusCode: number, caseCode: string = "00") {
    super(message);
    this.statusCode = statusCode;
    this.caseCode = caseCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Helper function to create the response
const createResponse = (statusCode: number, caseCode: string = "00", options: Record<string, string> = {}) => {
  const code = `${statusCode}${caseCode !== "00" ? "_" + caseCode : ""}`;
  const config = responseConfig[code] || responseConfig[statusCode];

  if (!config) {
    throw new Error(`Unknown response code: ${code}`);
  }

  let message = config.message;

  if (options.fieldName) {
    message = message.replace("{field name}", options.fieldName);
  }

  if (options.reason) {
    message = message.replace("[reason]", options.reason);
  }

  if (options.info) {
    message = message.replace("[info]", options.info);
  }

  return {
    responseCode: `${statusCode}${process.env.SERVICE_CODE || ""}${caseCode}`,
    responseMessage: message,
    description: config.description,
  };
};

const errorMiddleware = (err: Error | AppError | mongoose.Error | MongoError | ZodError, req: Request, res: Response, next: NextFunction): any => {
  let statusCode = 500;
  let caseCode = "00";
  let options: Record<string, string> = {};

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    const validationErrors = Object.values(err.errors).map((error) => `Field: ${error.path}, Message: ${error.message}`);

    statusCode = 400;
    caseCode = "01"; // Specific case code for validation errors
    options = { fieldName: validationErrors.join(", ") };
  }

  // Mongoose Duplicate Key Error
  if (err instanceof MongoError && err.code === 11000) {
    statusCode = 409;
    caseCode = "01"; // Specific case code for duplicate keys
    options = { reason: "Duplicate key error" };
  }

  // Zod Validation Error
  if (err instanceof ZodError) {
    // const zodErrors = err.errors.map((error) => `Field: ${error.path.join(".")}, Message: ${error.message}`).join(", ");
    const zodErrors = err.errors.map((error) => `${error.path.join(".")}`)[0];

    statusCode = 400;
    caseCode = "02"; // Specific case code for Zod validation
    options = { fieldName: zodErrors };
  }

  // Application-defined Errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    caseCode = err.caseCode || "00";
    options = { reason: err.message };
    return res.status(statusCode).json({
      code: statusCode,
      status: "error",
      message: err.message,
    });
  }

  // Fallback to generic error
  const response = createResponse(statusCode, caseCode, options);
  return res.status(statusCode).json(response);
};

export { errorMiddleware, AppError };
