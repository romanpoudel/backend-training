import { Request, Response } from "express";

import * as userService from "../service/user";

export const getUsers = (req: Request, res: Response) => {
  const data = userService.getUsers();

  return res.json({
    data,
  });
};

export const getUserById = (req: Request, res: Response) => {
  const id = +req.params.id;

  const data = userService.getUserById(id);

  return res.json({
    data,
  });
};

export const createUser = () => {};

export const updateUser = () => {};

export const deleteUser = () => {};
