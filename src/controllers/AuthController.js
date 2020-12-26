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
        res.json({uuid: user.uuid});
    } catch (err) {
        // Rollback changes
        await transaction.rollback();

        // const parsedError = ErrorHelper.sequelizeErrorHelper(err);
        const parsedError = ErrorHelper.errorDelegator(err);
        res.status(parsedError.status).send(parsedError.msg)
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
        if ( !email || !password) {
            throw new Error('SEQUELIZE-400-Request for loging in is incomplete');
        }

        // Find user by email
        let user = await User.findOne({
            where: {
                email
            }
        })

        // Convert user to JSON
        user = user.toJSON();

        //  Verifies if the user is null then throws an error
        if (!user) {
            throw new Error(`SEQUELIZE-400-The email ${email} or password are incorrect`);
        }

        // Compares the password
        const passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) {
            throw new Error(`SEQUELIZE-400-The email ${email} or password are incorrect`)
        }

        // Generate Access Token
        const accessToken = TokenHelper.generateToken(user, 'access');

        // Generate and stores Refresh Token
        const refreshToken = TokenHelper.generateToken(user, 'refresh');

        await RefreshToken.create({
            uuid_user: user.uuid,
            token: refreshToken
        }, { transaction });

        await transaction.commit();

        // Return the tokens
        res.json({ accessToken, refreshToken });
    } catch (err) {
        await transaction.rollback();
        const parsedError = ErrorHelper.sequelizeErrorHelper(err);
        res.status(parsedError.status).send(parsedError.msg);
    }
}

module.exports = { insertUser, authenticateUser };