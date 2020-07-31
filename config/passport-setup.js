//#1st stage - create/setup the strategy - with passport
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

//serialize function - id is stuffed in a cookie
passport.serializeUser((user, done) => {
  //mongo id on our db
  done(null, user.id); //it will pass the id off somewhere else
});

//serialize function - id comes back from a cookie
//mongo id on our db
passport.deserializeUser((id, done) => {
  //retrieve the user from mongo
  User.findById(id).then((theUserFound) => {
    done(null, theUserFound); //it will pass the id off somewhere else
  });
});

//tell passport to use google strategy
passport.use(
  new GoogleStrategy(
    {
      //takes an object for  - options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    //second param - #5th stage - callback function
    (accessToken, refreshToken, profile, done) => {
      //passsport callback function after data is called from #4th stage
      // console.log(profile);

      //check if user exist on my mongodb
      User.findOne({ googleId: profile.id }).then((currUser) => {
        //truty value as well
        if (currUser) {
          console.log("User is:" + currUser);
          done(null, currUser);
        } else {
          //we don't have that user, then create user in db
          //Save profile info from Google and create a new user model then save to mongodb
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save() //save() is a promise (async call)
            .then((newUser) => console.log("new user created: " + newUser)); //then returns a value from the DB e.g. newUser
          done(null, newUser);
        }
      });
    }
  )
);
