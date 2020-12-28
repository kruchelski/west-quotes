'use strict';

// Libraries
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserQuote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserQuote.belongsTo(models.User, {
        foreignKey: {
          name: 'uuid_user',
          allowNull: false,
        },
        onDelete: 'cascade'
      });
      UserQuote.belongsTo(models.Quote, {
        foreignKey: {
          name: 'uuid_quote',
          allowNull: false,
        }
      });
    }
  };
  UserQuote.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    uuid_user: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'uuid'
      },
      unique: 'unique_tag'
    },
    uuid_quote: {
      type: DataTypes.UUID,
      references: {
        model: 'Quote',
        key: 'uuid'
      },
      unique: 'unique_tag'
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }
  }, {
    sequelize,
    modelName: 'UserQuote',
    tableName: 'users_quotes',
    timestamps: false,
    
  });
  return UserQuote;
};