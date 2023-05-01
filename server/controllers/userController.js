import CustomError from '../models/CustomError.js';

import { signup } from '../services/userService.js';

import { validationResult } from 'express-validator';

export const getUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      throw new CustomError('Signup failed. ', 422, errors.array());
    }
    const newUser = await signup(req.body);
    res.json(newUser);
  } catch (err) {
    console.log('aca', err.message);
    next(err);
  }
};
