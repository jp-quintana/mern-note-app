import CustomError from '../models/CustomError.js';

import { fetchUser, login, signup } from '../services/userService.js';

import { validationResult } from 'express-validator';

export const getUser = async (req, res, next) => {
  try {
    const user = await fetchUser(req.user.id);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new CustomError('Login failed.', 422, errors.array());
    }

    const token = await login(req.body);

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new CustomError('Signup failed.', 422, errors.array());
    }

    const { password, confirmPassword } = req.body;

    if (!confirmPassword) {
      throw new CustomError('Confirm password is needed.', 422);
    }

    if (password !== confirmPassword) {
      throw new CustomError('Passwords do no match.', 422);
    }

    const token = await signup(req.body);

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
