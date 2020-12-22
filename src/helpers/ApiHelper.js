/**
 * API requests error handler
 * @param {*} error Error object
 */
const errorHandler = (error) => {
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
        msg: 'An really terrible and unexpected error happend :('
    }
}

module.exports = { errorHandler }