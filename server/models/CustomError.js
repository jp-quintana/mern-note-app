class CustomError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

export default CustomError;
