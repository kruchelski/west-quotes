// Entities
const SequelizeConstants = require('../constants/SequelizeConstants');

// Global variable to associate an error handler to an error name
var errorRegister = {
    ApiError: apiErrorHandler,
    AuthError: authErrorHandler,
    SequelizeUniqueConstraintError: sequelizeUniqueErrorHandler,
    TokenError: tokenErrorHandler
}

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
    const { api, status, message } = err;
    let msg = `[${api || 'API'}] Error: ${message}`;
    return { status, msg};
}

/**
 * Authentication's errors handler
 * @param {*} err Error object
 */
const authErrorHandler = (err) => {

}

/**
 * Sequelize unique constraint violation error handler
 * @param {*} err Error Object
 */
const sequelizeUniqueErrorHandler = (err) => {

}

/**
 * Token's errors handler
 * @param {*} err Error object
 */
const tokenErrorHandler = (err) => {

}

/**
* Generic Sequelize interactions error handler
* @param {*} err Error object
*/
const sequelizeGenericErrorHandler = (err) => {

    // Default error response
    let errorResponse = {
        status: 500,
        msg: 'A really terrible and unexpected error happend accessing the database :('
    }

    // Check if it's Sequelize Exception
    if (err && err.name && err.name !== 'Error') {
        switch (err.name) {
            case 'SequelizeUniqueConstraintError':
                let element = 'element';
                if (err.errors && err.errors.length) {
                    element = err.errors[0].path;
                }
                const { status, msg } = SequelizeConstants.ERROR.NAME[err.name];
                errorResponse.status = status;
                errorResponse.msg = msg.replace('element', element);
                break;
            default:
                if (err.errors && err.errors.length) {
                    errorResponse.status = 500;
                    errorResponse.msg = err.errors[0].message;
                }
        }
    } else if (err && err.message && typeof err.message === 'string') {
        if (err.message.includes('SEQUELIZE')) {
            const splitedError = err.message.split('-');
            errorResponse.status = parseInt(splitedError[1]);
            errorResponse.msg = splitedError[2];
        } else {
            errorResponse.status = 500;
            errorResponse.msg = err.message
        }
    }
    return errorResponse;
}

/**
 * Generic error handler
 * @param {*} err Error Object
 */
const genericErrorHandler = (err) => {
    if (typeof err === 'string') {
        return {
            status: 500,
            msg: err
        }
    }
    if (err &&
        err.message &&
        err.message.includes('API')
    ) {
        const error = err.message.split('-');
        return {
            status: parseInt(error[1]),
            msg: error[2]
        }
    }
    if (err &&
        err.message
    ) {
        return {
            status: 500,
            msg: err.message
        }
    }
    if (err &&
        err.msg
    ) {
        return {
            status: 500,
            msg: error.msg
        }
    }
    return {
        status: 500,
        msg: 'A really terrible and unexpected error happend accessing the quotes/images :('
    }
}

module.exports = { errorDelegator }