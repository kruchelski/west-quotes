'use strict';

/**
 * This seed will insert a record in the table refresh_tokens. Be careful to replace the
 * UUID in the uuid_user with the one generated from other seeds
 */

// Entities
const { RefreshToken } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await RefreshToken.create({
      uuid_user: 'ce1e1d65-42bd-4d07-88d6-f3cdf2e854fc', // Replace this UUID
      token: 'Some token'
    })
  },

  down: async (queryInterface, Sequelize) => {

  }
};
