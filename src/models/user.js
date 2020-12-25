'use strict';

// Libraries
const { Model, Sequelize } = require('sequelize');

// Entities
const { UserQuote } = require('../models');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Quote, { 
        through: 'UserQuote',
        foreignKey: 'uuid_user'
      })
      User.hasOne(models.RefreshToken, {
        foreignKey: {
          name: 'uuid_user'
        }
      });
    }
  };

  User.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    twitter: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });



  return User;
};