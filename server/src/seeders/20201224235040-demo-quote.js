'use strict';

/**
 * This seed will insert a quote in the database and genereates it's UUID
 */

// Entities
const { Quote } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Quote.create({
      text: 'This is a test quote',
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
