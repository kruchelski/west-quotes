'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Create table
      await queryInterface.createTable('users',
        {
          uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
          },
          username: {
            type: Sequelize.STRING,
            unique: true
          },
          email: {
            type: Sequelize.STRING,
            unique: true

          },
          password: {
            type: Sequelize.STRING
          },
          twitter: {
            type: Sequelize.STRING
          }
        },
        {
          transaction
        }
      );

      // Add Indexes
      await queryInterface.addIndex('users', ['uuid'], { transaction });
      await queryInterface.addIndex('users', ['uuid', 'email'], { transaction });

      // Commit
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }

  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('Users');
  }
};