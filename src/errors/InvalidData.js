class InvalidDataError extends Error {
  constructor(message) {
    super();
    this.code = 404;
    this.message = message || "Invalid Data";
  }
}
module.exports = InvalidDataError;
