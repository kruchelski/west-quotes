// Libraries
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: {
          name: 'uuid_user',
          allowNull: false,
        },
        onDelete: 'cascade',
      });
    }
  }
  RefreshToken.init({
    uuid_user: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'uuid',
      },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    refresh_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    timestamps: false,
  });

  return RefreshToken;
};
