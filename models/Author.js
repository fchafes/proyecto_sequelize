const { Model, DataTypes } = require("sequelize");

class Author extends Model {
  static initModel(sequelize) {
    Author.init(
      {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100) },
        lastname: { type: DataTypes.STRING(100) },
        email: { type: DataTypes.STRING(100) },
      },
      { sequelize, modelName: "author", timestamps: true }
    );

    return Author;
  }
}

module.exports = Author;
