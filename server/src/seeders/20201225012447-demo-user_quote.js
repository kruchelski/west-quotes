'use strict';

/**
 * This seed will insert a record in the junction table users_quotes. Be careful to replace these
 * UUIDs with those generated in the other seeds
 */

//Entities
const { UserQuote } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await UserQuote.create({
      uuid_user: 'ce1e1d65-42bd-4d07-88d6-f3cdf2e854fc', // Replace this UUID
      uuid_quote: 'ae4eda72-eca8-4c13-8804-fe940e60e60b' // Replace this UUID
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
