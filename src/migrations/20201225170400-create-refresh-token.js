'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Create table
      await queryInterface.createTable('refresh_tokens',
        {
          uuid_user: {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'uuid'
            },
            allowNull: false,
            primaryKey: true,
          },
          token: {
            type: Sequelize.TEXT,
            allowNull: false,
            primaryKey: true,

          },
          refresh_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          }
        },
        {
          transaction
        }
      );

      // Add Indexes
      // Add Indexes
      await queryInterface.addIndex('refresh_tokens', ['uuid_user'], { transaction });
      await queryInterface.addIndex('refresh_tokens', ['token'], { transaction });

      // Commit
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }

  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('refresh_tokens');
  }
};