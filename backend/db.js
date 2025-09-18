const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://geralt:mongopass@cluster0.fhaawld.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
})

const accountSchema = new mongoose.Schema({
  UserId:{
    type:mongoose.Schema.Types.ObjectId,  //Reference to User model
    ref:"User",
    required:true
  },
  balance:{
    type:Number,
    required: true
  }
})

const User = mongoose.model("User", userSchema)
const Account = mongoose.model("Account", accountSchema)

module.exports = {User, Account}