// Libraries
require('dotenv').config();
const bcrypt = require('bcrypt');

// Entities
const { User, RefreshToken } = require('../models');
const { sequelize } = require('../config/SequelizeConfig');
const TokenError = require('../errors/TokenError');
const jwt = require('jsonwebtoken');

// Helpers
const ErrorHelper = require('../helpers/ErrorHelper');
const TokenHelper = require('../helpers/TokenHelper');

/**
 * Fucntion to refresh the access token
 * @param {*} req Request object
 * @param {*} res Response object
 */
const tokenRenewal = async (req, res) => {
    let newToken;

    // Retrieve transaction object
    const transaction = await sequelize.transaction();
    try {
        // Retrieve the refresh token from the request
        const token = req.body.token;

        // If there's no refreesh token, throws an error
        if (!token) {
            throw new TokenError('Refresh token missing from request', 400);
        }

        // Find refreshToken
        let refreshToken = await RefreshToken.findOne({
            where: {
                token,
            }
        }, { transaction })

        // If there's no matching refreshToken in the database
        if (!refreshToken) {
            throw new TokenError('Refresh token revoked', 403)
        }

        // Check if token refresh date is ok
        const refreshDateOk = TokenHelper.checkRefreshTokenExpiration(refreshToken);

        if (!refreshDateOk) {
            throw new TokenError('Refresh token expired', 403);
        }

        // Verify refresh token
        const userToken = await jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET);

        // Get information from token
        const { uuid, username, email, password, twitter } = userToken

        // Build an User instance
        const user = await User.build({
            uuid,
            username,
            email,
            password,
            email,
            twitter
        })

        // Generates new access token
        newToken = TokenHelper.generateToken(user.toJSON(), 'access');

        // Updates refresh token with the actual date
        refreshToken.refresh_date = new Date();
        await refreshToken.save({ transaction })


        // Commit changes
        await transaction.commit();

        // Return new access token
        res.json({ accessToken: newToken });
    } catch (err) {
        // Rollback changes
        await transaction.rollback();

        const parsedError = ErrorHelper.sequelizeErrorHelper(err);
        res.status(parsedError.status).send(parsedError.message)
    }
}

module.exports = { tokenRenewal };