import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserDao from '../daos/user/index.js';
import NoteListDao from '../daos/noteList/index.js';
import CustomError from '../models/CustomError.js';

export const fetchUser = async (userId) => {
  const user = await UserDao.fetchById(userId);
  return user;
};

export const signup = async (userDetails) => {
  const existingUser = await UserDao.fetchByEmail(userDetails.email);

  if (existingUser) {
    throw new CustomError('Email address is already in use.', 409);
  }

  const { name, lastName, email, password } = userDetails;

  const salt = await bcrypt.genSalt(10);

  const encryptedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserDao.create({
    name,
    lastName,
    email,
    password: encryptedPassword,
  });

  await NoteListDao.create({
    userId: newUser.id,
  });

  const payload = { user: { id: newUser.id } };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '365d' });
};

export const login = async (userDetails) => {
  const { email, password } = userDetails;

  const existingUser = await UserDao.fetchByEmail(email);

  if (!existingUser) {
    throw new CustomError('A user with that email does not exist.', 400);
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new CustomError(
      'Sorry, your email or password is incorrect. Please try again.',
      401
    );
  }

  const payload = { user: { id: existingUser.id } };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '365d' });
};
