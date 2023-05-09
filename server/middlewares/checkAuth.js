import jwt from 'jsonwebtoken';

import CustomError from '../models/CustomError.js';

export const checkAuth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token)
    return next(new CustomError('No token, authorization denied.', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return next(new CustomError('Token is not valid.', 401));
  }
};
