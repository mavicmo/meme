const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const recipesController = require("./controller/recipes-controller");
const app = express();
const port = process.env.PORT || 3005;
// app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
app.use("/recipes", recipesController);

app.listen(port, () => {
  console.log(`Express MVC app is running on port ${port}`);
});
