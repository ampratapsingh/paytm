const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://geralt:mongopass@cluster0.fhaawld.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
})

const User = mongoose.model("User", userSchema)

module.exports = {User}