module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Create table
      await queryInterface.createTable('quotes',
        {
          uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          text: {
            type: Sequelize.TEXT,
            unique: true,
          },
          occurrences: {
            type: Sequelize.INTEGER,
          },
          likes: {
            type: Sequelize.INTEGER,
          },
        },
        {
          transaction,
        });

      // Add Indexes
      await queryInterface.addIndex('quotes', ['uuid'], { transaction });
      await queryInterface.addIndex('quotes', ['text'], { transaction });

      // Commit
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down() {
    // await queryInterface.dropTable('quotes');
  },
};
