"use strict";
const { Model } = require("sequelize");
// const Item = require("../models/item");
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categoria.hasMany(models.List, {
        as: "listas",
        foreignKey: "categoriaId",
      });
      // User.hasMany(Foto, { as: "fotos", foreignKey: "userId" });
    }
  }
  Categoria.init(
    {
      titulo: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "Categoria",
      timestamps: true,
    }
  );
  return Categoria;
};
