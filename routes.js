const express = require("express");
const router = express.Router();
const { Article, Author, Comment } = require("./models/index");
const controller = require("./controllers/articlecontroller")

router.get("/", controller.allArticles)
  
  router.get("/api/data", controller.allArticlesJson) 
  
  router.get("/admin", controller.allArticlesAdmin)
  
  router.get("/admin/form_create", controller.allAuthorsArticles)
  
  router.post("/admin/form_create", controller.createAuthorsArticle)
  
  router.post("/articleId/:id", controller.createComment);
  
  router.get("/admin/form_edit/:id", controller.editAuthorsArticles);
  
  router.post("/admin/form_edit/:id", controller.editAuthorArticle);
  
   
  
  router.post("/admin/delete-article/:id", controller.deleteArticle)
  
  router.get("/articleId/:id", controller.articlebyPk);

  module.exports = router