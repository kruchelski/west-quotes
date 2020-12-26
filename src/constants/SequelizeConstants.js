const ERROR = {
    NAME: {
        SequelizeUniqueConstraintError: {
            status: 409,
            message: 'Error - The element already exists'
        }
    }
}

module.exports = { ERROR }