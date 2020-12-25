const ERROR = {
    NAME: {
        SequelizeUniqueConstraintError: {
            status: 409,
            msg: 'Error - The element already exists'
        }
    }
}

module.exports = { ERROR }