// Libraries
require('dotenv').config();
const bcrypt = require('bcrypt');

// Entities
const { User, RefreshToken } = require('../models');
const { sequelize } = require('../config/SequelizeConfig');
const AuthError = require('../errors/AuthError');

// Helpers
const ErrorHelper = require('../helpers/ErrorHelper');
const TokenHelper = require('../helpers/TokenHelper');

/**
 * Insert a new user in the database
 * @param {*} req Request object
 * @param {*} res Response object
 */
const insertUser = async (req, res) => {
    // Retrieve transaction object
    const transaction = await sequelize.transaction();

    try {
        // Retrieve information from the body's request
        const { username, email, password } = req.body;

        // If one of the arguments is missing throws an error
        let missingArguments = []
        const registerKeys = ['username', 'email', 'password'];
        for (const key of registerKeys) {
            if (!req.body[key]) {
                missingArguments.push(key)
            }
        }

        if (missingArguments.length) {
            throw new AuthError('Missing data to insert user', 400, missingArguments)
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creates user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        }, { transaction })

        // Commit
        await transaction.commit();

        // Return generated user UUID
        res.json({ uuid: user.uuid });
    } catch (err) {
        // Rollback changes
        await transaction.rollback();

        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.message)
    }
}

/**
 * Verify the user's credentials
 * @param {*} req Request object
 * @param {*} res Response object
 */
const authenticateUser = async (req, res) => {

    const transaction = await sequelize.transaction();
    try {
        // Retrieve information from the body's request
        const { email, password } = req.body;

        // If one of the arguments is missing throws an error
        let missingArguments = []
        const registerKeys = ['email', 'password'];
        for (const key of registerKeys) {
            if (!req.body[key]) {
                missingArguments.push(key)
            }
        }

        if (missingArguments.length) {
            throw new AuthError('Missing data to authenticate user', 400, missingArguments)
        }

        // Find user by email
        let user = await User.findOne({
            where: {
                email
            }
        })

        //  Verifies if the user is null then throws an error
        if (!user) {
            throw new AuthError('Email or password wrong', 404);
        }

        // Convert user to JSON
        user = user.toJSON();

        // Compares the password
        const passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) {
            throw new AuthError('Email or password wrong', 404);
        }

        // Extract data that will be used in the jwt
        const userToken = {
            uuid: user.uuid,
            username: user.username,
            email: user.email,
        }

        // Generate Access Token
        const accessToken = TokenHelper.generateToken(userToken, 'access');

        // Generate and stores Refresh Token
        const refreshToken = TokenHelper.generateToken(userToken, 'refresh');

        await RefreshToken.create({
            uuid_user: user.uuid,
            token: refreshToken
        }, { transaction });

        await transaction.commit();

        // Return the tokens
        res.json({ accessToken, refreshToken, user: userToken });
    } catch (err) {
        await transaction.rollback();

        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.message);
    }
}

/**
 * Logout an user of the system
 * @param {*} req Request object
 * @param {*} res Response object
 */
const logoutUser = async (req, res) => {
    // Retrieve transaction object
    const transaction = await sequelize.transaction();

    try {
        // Retrieve uuid from the req params
        const userUuid = req.params.uuid

        // If no uuid is informed throw AuthError
        if (!userUuid) {
            throw new AuthError('Error trying to logout', 400, "User's uuid")
        }

        // Delete records from refresh_tokens table
        await RefreshToken.destroy({
            where: {
                uuid_user: userUuid,
            }
        }, { transaction })

        // Commit changes
        await transaction.commit();

        // Return 204
        res.status(204).send();

    } catch (err) {
        // Rollback changes
        await transaction.rollback();

        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.message)
    }
}

/**
 * Delete an user's account
 * @param {*} req 
 * @param {*} res 
 */
const removeUser = async (req, res) => {
    // Retrieve transaction object
    const transaction = await sequelize.transaction();

    try {
        // Retrieve user's uuid form request
        const userUuid = req.user.uuid;

        // Delete
        await User.destroy({
            where: {
                uuid: userUuid
            }
        }, { transaction });

        // Commit changes
        await transaction.commit();

        // Return 204
        res.status(204).send();
    } catch {
        // Rollback changes
        await transaction.rollback();

        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.message)
    }
}

module.exports = { insertUser, authenticateUser, logoutUser, removeUser };