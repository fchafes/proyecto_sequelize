const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bloger", "root", process.env.DB_PASSWORD, {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  // define: {
  //   underscored: true,
  // },
});

// Requerir los modelos
const Article = require("./Article");
const Author = require("./Author");
const Comment = require("./Comment");

// Inicializar todos los modelos

Article.initModel(sequelize);
Author.initModel(sequelize);
Comment.initModel(sequelize);

// Asociaciones

Article.belongsTo(Author);
Article.hasMany(Comment, { as: "comments" });
Comment.belongsTo(Article, { foreignKey: "articleId" });

// Crear tablas a partir de los modelos

sequelize.sync().then(() => {
  console.log("Se han creado las tablas");
});

module.exports = { sequelize, Article, Author, Comment };
