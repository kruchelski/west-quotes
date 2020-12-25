'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Create table
      await queryInterface.createTable('users_quotes',
        {
          uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          uuid_user: {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'uuid'
            },
            unique: 'unique_tag'
          },
          uuid_quote: {
            type: Sequelize.UUID,
            references: {
              model: 'quotes',
              key: 'uuid'
            },
            unique: 'unique_tag'
          },
          likes: {
            type: Sequelize.INTEGER,
          }
        },
        {
          transaction,
          uniqueKeys: {
            unique_tag: {
              customIndex: true,
              fields: ['uuid_user', 'uuid_quote']
            }
          }
        }
      );

      // Add Indexes
      await queryInterface.addIndex('users_quotes', ['uuid'], { transaction });
      await queryInterface.addIndex('users_quotes', ['uuid_user'], { transaction });
      await queryInterface.addIndex('users_quotes', ['uuid_quote'], { transaction });

      // Commit
      await transaction.commit();
    } catch (err) {
      transaction.rollback();
      throw err;
    }


  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('users_quotes');
  }
};