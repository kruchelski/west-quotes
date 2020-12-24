const { v4 } = require('uuid');

/**
 * Generates an UUID for the model
 * @param {*} model Instance of the model
 * @param {*} options Aditional Options
 */
const generateUuid = (model, options) => {
    model.uuid = v4();
}

module.exports = { generateUuid };