/**
 * Custom error class for quotes errors
 */
class QuoteError extends Error {
    constructor(message, status, entities = null) {
        super(message);
        this.name = this.constructor.name
        this.status = status;
        this.entities = entities;
    }
}

module.exports = QuoteError