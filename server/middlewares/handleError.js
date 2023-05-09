import CustomError from '../models/CustomError.js';

export const handleError = (err, req, res, next) => {
  console.error(err);
  if (err instanceof CustomError) {
    if (err.array) {
      return res
        .status(err.code)
        .json({ message: err.message, array: err.array });
    } else {
      return res.status(err.code).json({ message: err.message });
    }
  } else {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
