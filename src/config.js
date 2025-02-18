const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-tut");

//Check db connection
connect
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database cannot be connected.");
  });

//Create a schema
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

// Colection Part : create a model
const collection = new mongoose.node("users", loginSchema); //(collectionName, schema)

module.exports = collection;
