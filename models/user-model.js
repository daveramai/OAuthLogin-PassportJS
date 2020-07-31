const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a schema for the model to use below
const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbNail: String,
});

//create a model of user(s) - pluralize on mongodb
const User = mongoose.model("user", userSchema);

//exported to be used in multiple places
module.exports = User;
