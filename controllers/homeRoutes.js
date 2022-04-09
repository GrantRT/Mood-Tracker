const router = require("express").Router();
// const { User, Mood } = require('../../models');
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/logout", (req, res) => {
  // If the user is already logged in, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("logout");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/dashboard", async (req, res) => {
  try {
    res.render("dashboard", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/links", async (req, res) => {});

module.exports = router;
