const express = require("express");
const router = express.Router();
const { Article, Author, Comment } = require("./models/index");

router.get("/", async (req, res) => {
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
  
  router.get("/api/data", async (req, res) => {
    try {
      const articles = await Article.findAll({
        include: Author, 
      });
      res.json({ articles });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
    }
  });
  
  router.get("/admin", async (req, res) => {
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
  
  router.get("/admin/form_create", async (req, res) => {
    try {
      const authors = await Author.findAll({});
      res.render("form_create", { authors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los artículos" });
    }
  });
  
  router.post("/admin/form_create", async (req, res) => {
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
  
  router.post("/articleId/:id", async (req, res) => {
    const { fullName, content } = req.body;
    const articleId = req.params.id;
    try {
      const newComment = await Comment.create({
        fullName,
        content,
        articleId: articleId,
      });
      res.redirect(`/articleId/${articleId}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear un nuevo comentario" });
    }
  });
  
  router.get("/admin/form_edit/:id", async (req, res) => {
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
  
  router.post("/admin/form_edit/:id", async (req, res) => {
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
  
  router.post("/admin/delete-article/:id", async (req, res) => {
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
  
  router.get("/articleId/:id", async (req, res) => {
    try {
      const articleId = req.params.id;
      const article = await Article.findByPk(articleId, {
        include: Author,
      });
      const comments = await Comment.findAll({ where: { articleId: articleId } });
  
      if (!article) {
        res.status(404).send("Article not found");
        return;
      }
  
      res.render("articleId", { article, comments });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
    }
  });

  module.exports = router