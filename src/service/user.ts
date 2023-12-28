import * as userModel from "../model/users";

export const getUsers = () => {
  const data = userModel.getUsers();

  return data;
};

export const getUserById = (id: number) => {
  const data = userModel.getUserById(id);

  return data;
};
