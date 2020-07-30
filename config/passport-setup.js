let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20");

//tell passport to use google strategy
passport.use(
  new GoogleStrategy({
    //takes an object for  - options for the google strategy
  }),
  //second param
  () => {
    //passsport callback function
  }
);
