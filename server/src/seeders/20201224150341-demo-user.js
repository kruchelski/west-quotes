const bcrypt = require('bcrypt');

/**
 * This seed will insert a new user in the database and generates the UUID
 */

// Entities
const { User } = require('../models');

module.exports = {
  async up() {
    return User.create({
      username: 'testUsername',
      email: 'testUsername@test.com',
      password: await bcrypt.hash('123456', 10)
    })
  },

  down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
