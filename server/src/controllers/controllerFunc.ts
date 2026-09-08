import { NextFunction, Request, Response } from "express";

const ControllerFunc = (
  callback: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<any> | any,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return await callback(req, res, next);
  };
};

/**
 * Example usage:
 
  ControllerFunc(async (req, res) =>
    await TryCatch(
      async () => {},
      (err) => {
        res.status(500).json({ error: err });
      },
    ),
  );

*/

/**
 * Example session usage:
 
  ControllerFunc(
    async (req, res) =>
      await SessionController(
        async ({session, commit, abort}) =>
          await TryCatch(
            async () => {},
            (err) => {
              res.status(500).json({ error: err });
            },
          ),
      ),
  );

*/

export default ControllerFunc;
