require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");
const { format } = require("date-fns");
const esLocale = require("date-fns/locale/es");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const sequelize = new Sequelize("bloger", "root", process.env.DB_PASSWORD, {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  // define: {
  //   underscored: true,
  // },
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
    customDate: {
      type: DataTypes.VIRTUAL,
      get() {
        const dayNumber = format(this.createdAt, "dd", { locale: esLocale });
        const monthName = format(this.createdAt, "MMMM", { locale: esLocale });
        const yearNumber = format(this.createdAt, "yyy", { locale: esLocale });
        const formattedDate = `${dayNumber} de ${monthName}, ${yearNumber}`;
        return formattedDate;
      },
    },
  },
  { sequelize, modelName: "article", timestamps: true }
);

Article.belongsTo(Author);

class Comment extends Model {}
Comment.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING(100) },
    content: { type: DataTypes.STRING },
    customDate: {
      type: DataTypes.VIRTUAL,
      get() {
        const dayNumber = format(this.createdAt, "dd", { locale: esLocale });
        const monthName = format(this.createdAt, "MMMM", { locale: esLocale });
        const yearNumber = format(this.createdAt, "yyy", { locale: esLocale });
        const formattedDate = `${dayNumber} de ${monthName}, ${yearNumber}`;
        return formattedDate;
      },
    },
  },
  { sequelize, modelName: "comment", timestamps: true }
);
Article.hasMany(Comment);
Comment.belongsTo(Article);

sequelize.sync().then(() => {
  console.log("Se han creado las tablas");
});

app.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: Author,
    });
    res.render("home", { articles });
  } catch (error) {
    console.error("Error:", error);
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

app.get("/admin/form_create", async (req, res) => {
  try {
    const authors = await Author.findAll({});
    res.render("form_create", { authors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los artículos" });
  }
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

app.post("/articleId/:id", async (req, res) => {
  const { fullName, content } = req.body;
  const articleId = req.params.id;
  try {
    const newComment = await Comment.create({
      fullName,
      content,
      articleId: articleId,
    });
    res.redirect(`/article/${articleId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear un nuevo comentario" });
  }
});

app.get("/admin/form_edit/:id", async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findByPk(articleId, {
      include: Author,
    });
    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }

    const authors = await Author.findAll(); // Fetch authors here

    res.render("form_edit", { article, authors }); // Pass authors to the view
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

app.post("/admin/delete-article/:id", async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }
    const authorId = article.authorId;

    await article.destroy();

    await Author.update({ lastArticleId: null }, { where: { id: authorId } });

    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el artículo" });
  }
});

app.get("/articleId/:id", async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findByPk(articleId, {
      include: Author,
    });
    const comments = await Comment.findAll();

    if (!article) {
      res.status(404).send("Article not found");
      return;
    }
    console.log(comments);
    res.render("articleId", { article, comments });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto");
});
