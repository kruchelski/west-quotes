require('dotenv').config();

const TIME = {
    MS_PER_DAY: 1000 * 60 * 60 * 24,
    MAX_DAYS: process.env.REFRESH_TOKEN_MAX_DAYS || 2
}

module.exports = { TIME };