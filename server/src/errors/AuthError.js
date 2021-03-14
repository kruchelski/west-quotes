/**
 * Custom error class for authentication errors
 */
class AuthError extends Error {
  constructor(message, status, entities = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.entities = entities;
  }
}

module.exports = AuthError;
