require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const sequelize = new Sequelize("bloger", "root", process.env.DB_PASSWORD, {
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

app.get("/", async (req, res) => {
  try {
    
    const articles = await Article.findAll();


    
    res.render("home", { articles });
  } catch (error) {
    console.error("Error:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("An error occurred.");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto");
});

//test
