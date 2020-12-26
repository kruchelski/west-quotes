'use strict';

/**
 * This seed will insert a new user in the database and generates the UUID
 */

// Entities
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await User.create({
      username: 'testUsername',
      email: 'testUsername@test.com',
      password: '123456'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};