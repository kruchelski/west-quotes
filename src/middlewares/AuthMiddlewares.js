// Libraries
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Entities
const TokenError = require('../errors/TokenError');
const AuthError = require('../errors/AuthError');
const ErrorHelper = require('../helpers/ErrorHelper');
const { User } = require('../models');
const { sequelize } = require('../config/SequelizeConfig');

/**
 * Check access token and set the user in the request object
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Caller to the next middleware
 */
const authenticate = async (req, res, next) => {
    // Retrieve transaction object
    const transaction = await sequelize.transaction();

    try {
        // Retrieve authorization header (Bearer token)
        const authHeader = req.headers['authorization'];

        // Extract token from authorization header
        const token = authHeader && authHeader.split(' ')[1];

        // Verify is token is present
        if (!token) {
            throw new TokenError('Access token missing', 401);
        }

        // Verify if token is valid
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userToken) => {
            
            // If token is not valid, throw TokenError
            if (err) {
                throw new TokenError('Invalid Access Token', 401);
            }

            // Find user
            const user = await User.findByPk(userToken.uuid, { transaction });

            // If user not found, throw AuthError
            if (!user) {
                throw new AuthError('Error retrieving user.', 400, ['user'])
            }

            // Set user in the request object
            req.user = user;

            // Commit transactions
            await transaction.commit();

            // Send control to next middleware
            next();
        }).catch(err => {
            // This doesn't sound right but it works (at least for now...)
            const parsedError = ErrorHelper.errorDelegator(err);
            res.status(parsedError.status).send(parsedError.message);
        })
    } catch (err) {
        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.message);
    }
}

module.exports = { authenticate };