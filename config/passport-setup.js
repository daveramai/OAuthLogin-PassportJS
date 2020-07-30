//#1st stage - create/setup the strategy - with passport
let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20");
let keys = require("./keys");

//tell passport to use google strategy
passport.use(
  new GoogleStrategy(
    {
      //takes an object for  - options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    //second param - #5th stage
    (accessToken, refreshToken, profile, done) => {
      //passsport callback function after data is called from #4th stage
      console.log(profile);
    }
  )
);
