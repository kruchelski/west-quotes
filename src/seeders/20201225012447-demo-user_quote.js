'use strict';

//Entities
const { UserQuote } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await UserQuote.create({
      uuid_user: 'ce1e1d65-42bd-4d07-88d6-f3cdf2e854fc',
      uuid_quote: 'ae4eda72-eca8-4c13-8804-fe940e60e60b'
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
