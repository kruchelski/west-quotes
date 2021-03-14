require('dotenv').config();

const TIME = {
  MS_PER_DAY: 86400000,
  MAX_DAYS: process.env.REFRESH_TOKEN_MAX_DAYS || 2,
};

module.exports = { TIME };
