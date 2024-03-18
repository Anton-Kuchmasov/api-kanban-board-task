import { type Request, type Response, type NextFunction } from "express";

export const checkRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.body?.todos) {
    res.status(400).send("Invalid request body");
  } else {
    next();
  }
};
