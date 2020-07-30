//invoke our express application
let express = require("express");
let app = express();
let passportSetup = require("./config/passport-setup"); //#2nd stage - kick start/execute the strategy - passport-setup
let mongoose = require("mongoose");
let keys = require("./config/keys");

//import router
let authRoutes = require("./routes/auth-routes");

//set up view engine
app.set("view engine", "ejs");

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("Connected to mongodb");
});

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
