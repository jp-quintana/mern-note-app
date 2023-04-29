import UserDao from '../daos/user/index.js';

export const fetchUser = async (userId) => {
  const user = await UserDao.fetchById(userId);
  return user;
};

export const login = () => {};

export const signup = async (userDetails) => {
  const newUser = await UserDao.create(userDetails);
  return newUser;
};
