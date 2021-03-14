/**
 * Custom error class for Api requests errors
 */
class ApiError extends Error {
  constructor(message, status, api = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.api = api;
  }
}

module.exports = ApiError;
