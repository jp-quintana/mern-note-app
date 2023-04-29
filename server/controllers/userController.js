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
      throw new CustomError(errors.array(), 422);
    }
    const newUser = await signup(req.body);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
};
