require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");

const { Article, Author, Comment } = require("./models/index");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.set("view engine", "ejs");


app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto");
});
