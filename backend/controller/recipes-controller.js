const express = require("express");
const router = express.Router();

const Recipes = require("../model/recipes-model");

function display(req, res) {
  Recipes.find({})
    .then((recipes) => res.json(recipes))
    .catch((err) => res.json(err));
}

router.get("/", (req, res) => {
  display(req, res);
});

router.post("/", (req, res) => {
  Recipes.create(req.body).then(display(req, res));
});

module.exports = router;
