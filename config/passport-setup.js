let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20");
let keys = require("./keys");

//tell passport to use google strategy
passport.use(
  new GoogleStrategy({
    //takes an object for  - options for the google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
  }),
  //second param
  () => {
    //passsport callback function
  }
);
