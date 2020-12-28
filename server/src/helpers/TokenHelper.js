// Libraries
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Constants
const TokenConstants = require('../constants/TokenConstants');

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

/**
 * Check if the refresh token in the database is still valid
 * @param {*} refreshToken Refresh token stored in database
 */
const checkRefreshTokenExpiration = (refreshToken) => {
    // Retrieve the duration of the refresh token in days
    let maxDays;
    try {
        maxDays = parseInt(TokenConstants.TIME.MAX_DAYS)
    } catch (err) {
        // Set to default;
        maxDays = 2;
    }

    // If maxDays is less than or equal a zero, then the token will no be expired
    if (maxDays <= 0) {
        return true;
    }

    // Get actual date
    let actualDate = new Date().toISOString();
    actualDate = new Date(actualDate);

    // Retrieve refreshToken last refresh date
    let refreshTokenDate = refreshToken.refresh_date;
    refreshTokenDate = new Date(refreshTokenDate);

    return (Math.floor((actualDate - refreshTokenDate) / TokenConstants.TIME.MS_PER_DAY) < maxDays);
}

module.exports = { generateToken, checkRefreshTokenExpiration };