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
    const articles = await Article.findAll({
      include: Author, // Include the Author model
    });

    res.render("home", { articles });
  } catch (error) {
    console.error("Error:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("An error occurred.");
  }
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.render("articles", { articles });
  } catch (error) {
    console.error("Error:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("An error occurred.");
  }
});

app.get("/admin", async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: Author,
    });
    res.render("admin", { articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los artículos" });
  }
});

app.get("/admin/form_create", (req, res) => {
  res.render("form_create");
});

app.post("/admin/form_create", async (req, res) => {
  const { title, content, image, authorId } = req.body;
  try {
    const newArticle = await Article.create({
      title,
      content,
      image,
      authorId,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear un nuevo artículo" });
  }
});

app.get("/admin/form_edit/:id", async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }
    res.render("form_edit", { article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar el artículo para editar" });
  }
});

app.post("/admin/form_edit/:id", async (req, res) => {
  const articleId = req.params.id;
  const { title, content, image, authorId } = req.body;
  try {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }
    article.title = title;
    article.content = content;
    article.image = image;
    article.authorId = authorId;

    await article.save();
    console.log("Editando artículo...");

    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el artículo" });
  }
});

app.get("/articleId/:id", async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findByPk(articleId, {
      include: Author,
    });

    if (!article) {
      // Handle the case where the article doesn't exist
      res.status(404).send("Article not found");
      return;
    }

    res.render("articleId", { article });
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
