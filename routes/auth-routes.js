let router = require("express").Router();
let passport = require("passport");

//auth login
router.get("/login", (req, res) => {
  res.render("login", { myuser: req.user });
});

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  req.logOut(); //remove id from cookie stored - can see it on developer tools>network
  res.redirect("/"); //redirect to homepage
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
  //passport attaches the user to the request handler object now :D
  // res.send(req.user);

  //redirect to a profile page
  res.redirect("/profile/");
});

module.exports = router;
