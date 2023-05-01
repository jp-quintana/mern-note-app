class CustomError extends Error {
  constructor(message, errorCode, errorArray) {
    super(message);
    this.code = errorCode;
    this.array = errorArray;
  }
}

export default CustomError;
