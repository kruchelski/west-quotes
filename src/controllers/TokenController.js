// Libraries
require('dotenv').config();
const bcrypt = require('bcrypt');

// Entities
const { User, RefreshToken } = require('../models');
const { sequelize } = require('../config/SequelizeConfig');

// Helpers
const ErrorHelper = require('../helpers/ErrorHelper');
const TokenHelper = require('../helpers/TokenHelper');

const tokenRenewal = async (req, res) => {
    // Retrieve transaction object
    const transaction = await sequelize.transaction();
    try {
        // Retrieve the refresh token from the request
        const refreshToken = req.body.refreshToken;

        // If there's no refreesh token, throws an error
        if (!refreshToken) {
            return 
        }

    } catch (err) {
        // Rollback changes
        await transaction.rollback();

        const parsedError = ErrorHelper.sequelizeErrorHelper(err);
        res.status(parsedError.status).send(parsedError.msg)
    }
}