const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/login-tut");

connect
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database cannot be connected.");
  });

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const collection = new mongoose.model("users", loginSchema);

module.exports = collection;
