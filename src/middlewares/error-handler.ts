import { type Request, type Response, type NextFunction } from "express";

export const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(500).send("Internal Server Error: ").send(error.message);
};
