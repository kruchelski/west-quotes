/**
 * Custom error class form token errors
 */
class TokenError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

module.exports = TokenError;
