//invoke our express application
let express = require("express");
let app = express();

//set up view engine
app.set("view engine", "ejs");

//create a home route
app.get("/", (req, res) => {
  res.render("home");
});

//listen to a port
app.listen(3000, () => {
  console.log("App now listening for requests on port 3000");
});
