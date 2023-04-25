const express = require("express");
const router = express.Router();
const { Choice } = require("../models");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
const { isAuthenticated } = require('../middlewares/auth')

router.get("/", isAuthenticated,  async (req, res) => {
  const choices = await Choice.findAll();
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(choices);
  } else {
    res.render("choice/index", { choices });
  }
});

router.get("/new", isAuthenticated,  (req, res) => {
  res.render("choice/create");
});

router.post("/", isAuthenticated, async (req, res) => {
  const { name } = req.body;
  const choice = await Choice.create({ name });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(choice);
  } else {
    res.redirect("/choices/" + choice.id);
  }
});

router.get("/:id", isAuthenticated,  async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(choice);
  } else {
    res.render("choice/show", { choice });
  }
});

router.get("/:id/edit", isAuthenticated,  async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  res.render("choice/edit", { choice });
});

router.post("/:id", isAuthenticated, async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const choice = await Choice.update(
    { name },
    {
      where: { id },
    }
  );
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(choice);
  } else {
    res.redirect("/choices/" + id);
  }
});

router.get("/:id/delete", isAuthenticated,  async (req, res) => {
  const { id } = req.params;
  const deleted = await Choice.destroy({
    where: { id },
  });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json({'success': true});
  } else {
    res.redirect("/choices");
  }
});

module.exports = router;