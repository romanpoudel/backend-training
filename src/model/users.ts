const users = [
  {
    id: 1,
    name: "User 1",
  },
  {
    id: 2,
    name: "User 2",
  },
  {
    id: 3,
    name: "User 3",
  },
];

export const getUsers = () => {
  return users;
};

export const getUserById = (id: number) => {
  const user = users.find(({ id: userId }) => userId === id);

  return user;
};
