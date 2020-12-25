// Libraries
require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Generate a token (access or refresh)
 * @param {*} user User instance
 * @param {*} type Type of token (access or refresh)
 */
const generateToken = (user, type) => {
    switch(type) {
        case 'access':
            return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        case 'refresh':
            return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    }
}

module.exports = { generateToken };