const express = require('express');
const app = express();
const { Sequelize, Model, DataTypes } = require('sequelize');

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const sequelize = new Sequelize("bloger", "root", "rootroot", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
});

class Author extends Model {}
Author.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100) },
    lastname: { type: DataTypes.STRING(100) },
    email: { type: DataTypes.STRING(100) },
  },
  { sequelize, modelName: "author", timestamps: true }
);

class Article extends Model {}
Article.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(100) },
    content: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "article", timestamps: true }
);

Article.belongsTo(Author);

sequelize.sync().then(() => {
  console.log("Se han creado las tablas");
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});