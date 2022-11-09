import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues })
  }

  const messageErrorType = err.message as ErrorTypes;
  const mappedError = errorCatalog[messageErrorType];

  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ message })
  }
  console.log(err);
  return res.status(500).json({ message: 'Internal error' });
};

export default errorHandler;
