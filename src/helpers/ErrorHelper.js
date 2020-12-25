// Entities
const SequelizeConstants = require('../constants/SequelizeConstants');

/**
 * API requests error handler
 * @param {*} error Error object
 */
const apiErrorHandler = (error) => {
    if (typeof error === 'string') {
        return {
            status: 500,
            msg: error
        }
    }
    if (error &&
        error.message &&
        error.message.includes('API')
    ) {
        const error = err.message.split('-');
        return {
            status: parseInt(error[1]),
            msg: error[2]
        }
    }
    if (error &&
        error.message
    ) {
        return {
            status: 500,
            msg: error.message
        }
    }
    if (error &&
        error.msg
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

/**
 * Sequelize interactions error handler
 * @param {*} error Error object
 */
const sequelizeErrorHelper = (error) => {

    // Default error response
    let errorResponse = {
        status: 500,
        msg: 'A really terrible and unexpected error happend accessing the database :('
    }

    // Check if it's Sequelize Exception
    if (error && error.name && error.name !== 'Error') {
        switch (error.name) {
            case 'SequelizeUniqueConstraintError':
                let element = 'element';
                if (error.errors && error.errors.length) {
                    element = error.errors[0].path;
                }
                const { status, msg } = SequelizeConstants.ERROR.NAME[error.name];
                errorResponse.status = status,
                    errorResponse.msg = msg.replace('element', element);
                break;
            default:
                if (error.errors && error.errors.length) {
                    errorResponse.status = 500;
                    errorResponse.msg = error.errors[0].message;
                }
        }
    } else if (error && error.message && typeof error.message === 'string') {
        if (error.message.includes('SEQUELIZE')) {
            const splitedError = error.message.split('-');
            errorResponse.status = parseInt(splitedError[1]);
            errorResponse.msg = splitedError[2];
        } else {
            errorResponse.status = 500;
            errorResponse.msg = error.message
        }
    }
    return errorResponse;
}

module.exports = { apiErrorHandler, sequelizeErrorHelper }