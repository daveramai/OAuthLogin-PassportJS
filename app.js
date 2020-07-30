//invoke our express application
let express = require("express");
let app = express();

//import router
let authRoutes = require("./routes/auth-routes");

//set up view engine
app.set("view engine", "ejs");

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
