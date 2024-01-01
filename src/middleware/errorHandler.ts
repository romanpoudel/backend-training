import HttpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import UnauthenticatedError from "../error/unauthenticatedError";

import loggerWithNameSpace from "../util/logger";

const logger = loggerWithNameSpace("ErrorHandler");

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 */
export function notFoundError(_req: Request, res: Response) {
  return res.status(HttpStatus.NOT_FOUND).json({
    message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
  });
}

export function genericErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line
) {
  if (err.stack) {
    logger.error(err.stack);
  }

  let error: { code: number; message: string };

  if (err instanceof UnauthenticatedError) {
    error = {
      code: HttpStatus.UNAUTHORIZED,
      message: err.message,
    };
  } else {
    error = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
    };
  }

  return res.status(error.code).json({ message: error.message });
}
