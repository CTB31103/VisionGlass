import { Request, Response, NextFunction } from "express";

const MiddlewareFunc = (
  callback: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<any> | any,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await callback(req, res, next);
  };
};

export default MiddlewareFunc;
