// Entities
const SequelizeConstants = require('../constants/SequelizeConstants');

const errorDelegator = (err) => {
    // Set the genericErrorHandler as default
    let errorHandler = genericErrorHandler;

    // Check if it's a Sequelize exception not mapped
    if (err.name && err.name.includes('Sequelize')) {
        errorHandler = sequelizeGenericErrorHandler;
    }

    // Delegates the error handler according to the error name
    for (const key in errorRegister) {
        if (err.name === key) {
            errorHandler = errorRegister[key];
            break;
        }
    }

    // Executes the errorHandler
    return errorHandler(err);
}

/**
 * API requests error handler
 * @param {*} err Error object
 */
const apiErrorHandler = (err) => {
    const defaultStatus = 500;
    const defaultMsg = 'A really terrible error ocurred during an API request :(';

    const { status, message, api } = err;
    let msg = `[${api || 'API'}] Error: ${message}`;

    return { status: status || defaultStatus, message: message || defaultMsg };
}

/**
 * Authentication's errors handler
 * @param {*} err Error object
 */
const authErrorHandler = (err) => {
    const defaultStatus = 500;
    const defaultMsg = 'A really terrible error ocurred during the authentication process :(';

    const { status, message, entities } = err;
    let msg = message;
    if (entities && entities.lenght) {
        msg += ' [';
        entities.forEach((entity, i) => {
            msg += entity;
            if (i < (entities.lenght - 1)) {
                msg += ', ';
            }
        })
        msg += ']'
    }
    return { status: status || defaultStatus, message: message || defaultMsg };
}

/**
 * Sequelize unique constraint violation error handler
 * @param {*} err Error Object
 */
const sequelizeUniqueErrorHandler = (err) => {
    const defaultStatus = 500;
    const defaultMsg = 'A really terrible error ocurred a database validation of unique keys :(';

    let element = 'element';
    if (err.errors && err.errors.length) {
        element = err.errors[0].path;
    }
    let { status, message } = SequelizeConstants.ERROR.NAME[err.name];
    message = message.replace('element', element);

    return { status: status || defaultStatus, message: message || defaultMsg };
}

/**
 * Token's errors handler
 * @param {*} err Error object
 */
const tokenErrorHandler = (err) => {
    const defaultStatus = 500;
    const defaultMsg = 'A really terrible error ocurred during a Token operation :(';

    const { status, message } = err;

    return { status: status || defaultStatus, message: message || defaultMsg };
}

/**
* Generic Sequelize interactions error handler
* @param {*} err Error object
*/
const sequelizeGenericErrorHandler = (err) => {
    const defaultStatus = 500;
    const defaultMsg = 'A really terrible error ocurred during a database access :(';
    let message;
    if (err.errors && err.errors.length) {
        message = err.errors[0].message;
    }

    return { status: defaultStatus, message: message || defaultMsg }
}

/**
 * Generic error handler
 * @param {*} err Error Object
 */
const genericErrorHandler = (err) => {
    const defaultStatus = 500;
    const defaultMsg = 'A really terrible error ocurred in the server :(';
    let message;
    if (
        typeof err === 'string'
    ) {
        message = err;
    } else if (
        err &&
        err.message
    ) {
        message = err.message;
    } else if (err &&
        err.error &&
        typeof err.error === 'string'
    ) {
        message = err.error;
    } else if (
        err &&
        err.msg
    ) {
        message = err.msg;
    }
    return { status: defaultStatus, message: message || defaultMsg };
}

// Global variable to associate an error handler to an error name
var errorRegister = {
    ApiError: apiErrorHandler,
    AuthError: authErrorHandler,
    SequelizeUniqueConstraintError: sequelizeUniqueErrorHandler,
    TokenError: tokenErrorHandler
}

module.exports = { errorDelegator }