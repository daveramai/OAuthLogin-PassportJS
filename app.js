//invoke our express application
const express = require("express");
const app = express();
const passportSetup = require("./config/passport-setup"); //#2nd stage - kick start/execute the strategy - passport-setup
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

//import router
let authRoutes = require("./routes/auth-routes");

//set up view engine
app.set("view engine", "ejs");

//setup cookie session (middleware)
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1 day in ms
    keys: [keys.session.cookieKey],
  })
);

//initialise passport (middleware x2)
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, () => {
//   console.log("Connected to mongodb");
// });

// //connect to mongodb
try {
  mongoose.connect(
    keys.mongodb.dbURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => console.log("Connected to my mongodb")
  );
} catch (error) {
  console.log("could not connect to mongodb");
}

//set up routes /auth/...
app.use("/auth", authRoutes);

//create a home route
app.get("/", (req, res) => {
  res.render("home");
});

//listen to a port
app.listen(3000, () => {
  console.log("App now listening for requests on port 3000");
});
