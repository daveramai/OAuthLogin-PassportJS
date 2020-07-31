const router = require("./auth-routes");

const profileRouter = require("express").Router();

//custom middleware - check if user logged in
const authCheck = (req, res, next) => {
  //trucy value check
  if (!req.user) {
    //if user is not logged in
    res.redirect("/auth/login");
  } else {
    //user logged in
    next();
  }
};

profileRouter.get("/", authCheck, (req, res) => {
  res.render("profile", { myuser: req.user }); //second argument is data to be rendered
});

module.exports = profileRouter;
