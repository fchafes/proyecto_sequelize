const {Article, Author, Comment} = require("../models/index")

async function allArticles (req, res){
    try {
      const articles = await Article.findAll({
        include: Author,
      });
      res.render("home", { articles });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
    }
  };
  
 async function allArticlesJson (req, res){
    try {
      const articles = await Article.findAll({
        include: Author, 
      });
      res.json({ articles });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
    }
  };
  
  async function allAriclesAdmin (req, res) {
    try {
      const articles = await Article.findAll({
        include: Author,
      });
      res.render("admin", { articles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los artículos" });
    }
  };
  
  async function allAuthorsArticles(req, res)  {
    try {
      const authors = await Author.findAll({});
      res.render("form_create", { authors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los artículos" });
    }
  };
  
  async function createAuthorsArticle (req, res) {
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
  };
  
  async function createComment (req, res) {
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
  };
  
   async function editAuthorsArticles (req, res)  {
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
  };
  
   async function editAuthorArticle (req, res)  {
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
  };
  
   async function deleteArticle (req, res)  {
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
  };
  
  async function articlebyPk(req, res)  {
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
  };

  module.exports = {allArticles,allArticlesJson,allAriclesAdmin,allAuthorsArticles,createAuthorsArticle,createComment,editAuthorArticle,editAuthorsArticles,deleteArticle,articlebyPk};