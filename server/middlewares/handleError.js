import CustomError from '../models/CustomError.js';

export const handleError = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.code).json({ message: err.message });
  } else {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
