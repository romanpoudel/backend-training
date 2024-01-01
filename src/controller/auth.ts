import { NextFunction, Request, Response } from "express";

import * as authService from "../service/auth";

export const signup = async (req: Request, res: Response) => {
  const { body } = req;

  console.log(body);

  await authService.signup(body);

  return res.json({
    message: "Signed up successfully",
  });
};

// Without error handling
// export const login = async (req: Request, res: Response) => {
//   const { body } = req;

//   const data = await authService.login(body);

//   return res.json(data);
// };

// With error handling
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const data = await authService.login(body);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
