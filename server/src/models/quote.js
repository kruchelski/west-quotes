// Libraries
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quote.belongsToMany(models.User, {
        through: 'UserQuote',
        foreignKey: 'uuid_quote',
      });
      Quote.hasMany(models.UserQuote, {
        foreignKey: {
          name: 'uuid_quote',
        },
      });
    }
  }

  Quote.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    text: DataTypes.TEXT,
    occurrences: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Quote',
    tableName: 'quotes',
    timestamps: false,
  });

  return Quote;
};
