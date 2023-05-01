import jwt from 'jsonwebtoken';

import CustomError from '../models/CustomError.js';

export const checkAuth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return next(new CustomError('Token is not valid', 401));
  }
};
