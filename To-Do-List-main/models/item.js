"use strict";
const { Model } = require("sequelize");

const List = require("../models/list");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Item.belongsTo(models.List);
    }
  }
  Item.init(
    {
      titulo: DataTypes.STRING,

      fecha_resolucion: { type: DataTypes.DATE, allowNull: true },
      descripcion: DataTypes.STRING,
      prioridad: DataTypes.STRING,
      estado: DataTypes.INTEGER,
      fecha_limite: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "Item",
      timestamps: true,
    }
  );
  return Item;
};
