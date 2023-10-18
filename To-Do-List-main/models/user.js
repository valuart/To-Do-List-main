"use strict";
const { Model } = require("sequelize");
// const Item = require("../models/item");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Item, { as: "items", foreignKey: "userId" });
      User.hasMany(models.List, { as: "listas", foreignKey: "userId" });
    }
  }
  User.init(
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      email: DataTypes.STRING,
      pass: DataTypes.STRING,
      rol: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
