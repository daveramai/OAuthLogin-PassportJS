let router = require("express").Router();
let passport = require("passport");

//auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  res.send("logging out");
});

//auth with google
router.get(
  "/google", //#3rd stage - use the strategy - passport-setup
  passport.authenticate("google", {
    //declare the scope property here
    scope: ["profile"],
  })
);

//callback route for google to redirect #4th stage
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("You reached the callback URI");
});

module.exports = router;
