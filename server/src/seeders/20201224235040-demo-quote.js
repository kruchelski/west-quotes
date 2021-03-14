/**
 * This seed will insert a quote in the database and genereates it's UUID
 */

// Entities
const { Quote } = require('../models');

module.exports = {
  up() {
    return Quote.create({
      text: 'This is a test quote',
    });
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
