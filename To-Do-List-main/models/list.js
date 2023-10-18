"use strict";
const { Model } = require("sequelize");
// const Item = require("../models/item");
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.hasMany(models.Item, { as: "items", foreignKey: "listId" });
      // User.hasMany(Foto, { as: "fotos", foreignKey: "userId" });
    }
  }
  List.init(
    {
      titulo: DataTypes.STRING,
      estado: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: { type: DataTypes.DATE, allowNull: true },
      fecha_resolucion: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "List",
      timestamps: true,
    }
  );
  return List;
};
